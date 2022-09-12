import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [checkSSR, setcheckSSR] = useState(true);

  //executed only on client side so we can set isSSR to false
  useEffect(() => {
    setcheckSSR(false);
  }, []);

  //don't show components if isSSR is true
  if (checkSSR) return null;

