import Image from 'next/image';
import image1 from '@/public/about-1.jpg';
import image2 from '@/public/about-2.jpg';

export const metadata = {
  title: 'About',
};

export default function Page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-10 xl:gap-x-24 gap-y-12 lg:gap-y-20 text-base sm:text-lg items-center">
      <div className="lg:col-span-3">
        <h1 className="text-3xl sm:text-4xl mb-6 sm:mb-10 text-accent-400 font-medium">
          Welcome to StayNest
        </h1>

        <div className="space-y-8">
          <p>
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury cabins.
            It&apos;s about the experience of reconnecting with nature and enjoying
            simple pleasures with family.
          </p>
          <p>
            Our 8 luxury cabins provide a cozy base, but the real freedom and
            peace you&apos;ll find in the surrounding mountains. Wander through lush
            forests, breathe in the fresh air, and watch the stars twinkle above
            from the warmth of a campfire or your hot tub.
          </p>
          <p>
            This is where memorable moments are made, surrounded by nature&apos;s
            splendor. It&apos;s a place to slow down, relax, and feel the joy of
            being together in a beautiful setting.
          </p>
        </div>
      </div>

      <div className="lg:col-span-2">
        <Image
          src={image1}
          placeholder='blur'
          quality={80}
          alt="Family sitting around a fire pit in front of cabin"
        />
      </div>

      <div className="lg:col-span-2 lg:order-3">
        <Image
          src={image2}
          placeholder='blur'
          quality={80}
          alt="Family that manages StayNest"
        />
      </div>

      <div className="lg:col-span-3 lg:order-4">
        <h1 className="text-3xl sm:text-4xl mb-6 sm:mb-10 text-accent-400 font-medium">
          Managed by our family since 1962
        </h1>

        <div className="space-y-8">
          <p>
            Since 1962, StayNest has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of StayNest,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at StayNest
            soon, where tradition meets tranquility, and every visit is
            like coming home.
          </p>

          <div>
            <a
              href="/cabins"
              className="inline-block mt-4 bg-accent-500 px-6 py-4 sm:px-8 sm:py-5 text-primary-800 text-base sm:text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Explore our luxury cabins
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}