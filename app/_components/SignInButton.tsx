import Image from 'next/image';
import { singInAction } from '../_lib/actions';
function SignInButton() {
  return (
    <form action={singInAction}>
      <button className='flex items-center justify-center gap-3 sm:gap-6 text-base sm:text-lg border border-primary-300 px-4 sm:px-10 py-3 sm:py-4 font-medium w-full sm:w-auto'>
        <Image
          src='https://authjs.dev/img/providers/google.svg'
          alt='Google logo'
          height='24'
          width='24'
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
