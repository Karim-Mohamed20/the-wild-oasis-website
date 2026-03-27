import Link from "next/link";

function NotFound() {
  return (
    <main className='text-center space-y-6 mt-4 px-4'>
      <h1 className='text-2xl sm:text-3xl font-semibold'>
        This cabin could not be found :(
      </h1>
      <Link
        href='/cabins'
        className='inline-block bg-accent-500 text-primary-800 px-5 sm:px-6 py-3 text-base sm:text-lg'
      >
        Back to all cabins
      </Link>
    </main>
  );
}

export default NotFound;
