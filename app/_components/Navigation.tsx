import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="z-10 text-sm sm:text-base md:text-xl">
      <ul className="flex flex-wrap justify-end gap-x-4 gap-y-2 sm:gap-x-8 md:gap-x-12 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors whitespace-nowrap"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors whitespace-nowrap"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-2 sm:gap-3 whitespace-nowrap"
            >
              <img className="h-8 rounded-full" src={session.user.image} alt={session.user.name} referrerPolicy="no-referrer"/>
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors whitespace-nowrap"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
