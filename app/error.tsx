"use client"
export default function Error({error, reset}) {
  return (
    <main className='flex justify-center items-center flex-col gap-6 px-4 text-center'>
      <h1 className='text-2xl sm:text-3xl font-semibold'>Something went wrong!</h1>
      <p className='text-base sm:text-lg'>{error.message}</p>

      <button onClick={reset} className='inline-block bg-accent-500 text-primary-800 px-5 sm:px-6 py-3 text-base sm:text-lg'>
        Try again
      </button>
    </main>
  );
}
