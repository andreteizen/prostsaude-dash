import '../styles/globals.css'
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head'
import Script from 'next/script';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ 
  Component, 
  pageProps: { session, ...pageProps }, 
}) {
  return (
      <div className="Main">
        <Head>
          <Script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></Script>

          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

          <Script
            src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
            crossorigin></Script>

          <Script
            src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
            crossorigin></Script>

          <Script>var Alert = ReactBootstrap.Alert;</Script>
            <title>PROST Saúde</title>
        </Head>
        <ChakraProvider>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </ SessionProvider>
        </ChakraProvider>
      </div>
    )
}

export default MyApp
