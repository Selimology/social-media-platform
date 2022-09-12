import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { Navbar, Sidebar } from '../components';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [checkSSR, setcheckSSR] = useState(true);

  //executed only on client side so we can set isSSR to false
  useEffect(() => {
    setcheckSSR(false);
  }, []);

  //don't show components if isSSR is true
  if (checkSSR) return null;

  return (
    <div>
      <Navbar />
      <div className="flex gap-4 md:gap-16">
        <div className=" mt-4 flex overflow-auto h-[84vh] video flex-1 flex-col gap-8 ">
          <Component {...pageProps} />
        </div>
        <div className="overflow-hidden xl:hover:overflow-auto h-[90vh]">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default MyApp;
