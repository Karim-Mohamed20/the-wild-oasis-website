import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 sm:gap-4 z-10">
      <Image
        src={logo}
        quality={100}
        height={60}
        width={60}
        className="h-10 w-10 sm:h-14 sm:w-14"
        alt="StayNest logo"
      />
      <span className="hidden sm:inline text-lg md:text-xl font-semibold text-primary-100 whitespace-nowrap">
        StayNest
      </span>
    </Link>
  );
}

export default Logo;
