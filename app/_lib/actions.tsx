"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

type UpdateGuestForm = FormData;

type BookingData = {
  cabinId: number;
  cabinPrice: number;
  startDate?: Date;
  endDate?: Date;
  numNights: number;
};

export async function updateGuest(formData: UpdateGuestForm) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const nationalID = formData.get("nationalID") as string;
  const [nationality, countryFlag] = (formData.get("nationality") as string).split("%");

  const regex = /^[a-zA-Z0-9]{6,12}$/;

  if (!regex.test(nationalID)) {
    throw new Error("National ID must be 6–12 alphanumeric characters");
  }

  const updateData = { nationality, countryFlag, nationalID };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function createBooking(bookingData: BookingData, formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: (formData.get("observations") as string).slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase
    .from("bookings")
    .insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function deleteBooking(bookingId: number) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You aren't allowed to delete this booking");
  }

  const { error } = await supabase.from("bookings").delete().eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");
  revalidatePath("/account/reservations");
}

export async function updateBooking(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  const bookingId = Number(formData.get("bookingId"));
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You aren't allowed to update this booking");
  }

  const numGuests = Number(formData.get("numGuests"));
  const observations = (formData.get("observations") as string).slice(0, 1000);
  const updateData = { numGuests, observations };
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be updated");

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  redirect("/account/reservations");
}

export async function singInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
