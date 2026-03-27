import Image from "next/image";
import bg from "@/public/bg.png";
export default function Page() {
  return (
    <main className="mt-10 sm:mt-16 md:mt-24 px-2 sm:px-0">
      <Image
        src={bg}
        fill 
        className="object-cover" 
        quality={80}
        placeholder="blur" 
        alt="Mountains and forests with two cabins" 
      />

      <div className="relative z-10 text-center">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl leading-tight text-primary-50 mb-8 sm:mb-10 tracking-tight font-normal">
          Welcome to StayNest.
        </h1>
        <a
          href="/cabins"
          className="inline-block bg-accent-500 px-6 py-4 sm:px-8 sm:py-6 text-primary-800 text-base sm:text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </a>
      </div>
    </main>
  );
}
