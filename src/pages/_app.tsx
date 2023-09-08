import '@/styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
config.autoAddCss = false

export default function App({ Component, pageProps }: AppProps) {
  
  return(
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
