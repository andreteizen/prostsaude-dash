import '../styles/globals.css'
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head'
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ 
  Component, 
  pageProps: { session, ...pageProps }, 
}) {
  return (
      <div className="Main">
        <Head>
          <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>

          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

          <script
            src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
            crossorigin></script>

          <script
            src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
            crossorigin></script>

          <script>var Alert = ReactBootstrap.Alert;</script>
            <title>Startup médica</title>
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
