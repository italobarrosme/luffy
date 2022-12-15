import type { NextPage } from 'next'
import Link from 'next/link'
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const NotFound: NextPage = () => {

  const router = useRouter();


  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 8000);
  }, []);


  return (
    <>
      <section className="flex items-center h-full w-full p-16">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl text-brand-primary">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldnt find this page.</p>
            <p className="mt-4 mb-8 text-brand-primary">But dont worry, you can find plenty of other things on our homepage.</p>
            <Link legacyBehavior href="/">
              <a><Icon icon={'bi:arrow-left-circle'} />Back to Home </a>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
export default NotFound;