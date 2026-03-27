"use client"
import { differenceInDays, isPast, isSameDay, isWithinInterval } from "date-fns";
import { useEffect, useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

type BookingSettings = {
  minBookingLength: number;
  maxBookingLength: number;
};

type Cabin = {
  regularPrice: number;
  discount: number;
};

type DateSelectorProps = {
  settings: BookingSettings;
  bookedDates: Date[];
  cabin: Cabin;
};

type ReservationRange = {
  from?: Date;
  to?: Date;
};

function isAlreadyBooked(range: ReservationRange, datesArr: Date[]) {
  if (!range.from || !range.to) return false;
  return datesArr.some((date) =>
    isWithinInterval(date, { start: range.from!, end: range.to! })
  );
}

function DateSelector({ settings, bookedDates, cabin }: DateSelectorProps) {
  const { range, setRange, resetRange } = useReservation();
  const [numberOfMonths, setNumberOfMonths] = useState(1);

  useEffect(() => {
    function syncMonths() {
      setNumberOfMonths(window.innerWidth >= 1024 ? 2 : 1);
    }

    syncMonths();
    window.addEventListener("resize", syncMonths);
    return () => window.removeEventListener("resize", syncMonths);
  }, []);

  const isBookedRange = isAlreadyBooked(range, bookedDates);
  const selectedRange: DateRange | undefined =
    range.from && !isBookedRange ? (range as DateRange) : undefined;

  const { regularPrice, discount } = cabin;

  const numNights =
    range.from && range.to ? differenceInDays(range.to, range.from) : 0;
  const cabinPrice = numNights * (regularPrice - discount);

  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-8 sm:pt-12 place-self-center"
        mode="range"
        onSelect={(range) =>
          setRange(range ?? { from: undefined, to: undefined })
        }
        selected={selectedRange}
        min={minBookingLength}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={numberOfMonths}
        disabled={(curDate)=>isPast(curDate) || bookedDates.some(date=>isSameDay(date, curDate))}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-8 py-3 sm:py-0 bg-accent-500 text-primary-800 sm:h-[72px]">
        <div className="flex flex-wrap items-baseline gap-3 sm:gap-6">
          <p className="flex gap-2 items-baseline flex-wrap">
            {discount > 0 ? (
              <>
                <span className="text-xl sm:text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-xl sm:text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-xl sm:text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-xl sm:text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold self-end sm:self-auto"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
