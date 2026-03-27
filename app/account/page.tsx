import { auth } from "../_lib/auth";

export const metadata = {
  title: 'Guests area',
};

export default async function Page() {
  const session = await auth();
  const firstName = session.user.name.split(" ").at(0);
  return (
    <h2 className="font-semibold text-xl sm:text-2xl text-accent-400 mb-6 sm:mb-7">
        Welcome, {firstName}
      </h2>
  );
}