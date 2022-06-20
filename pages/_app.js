import { Head } from "next/document";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Generic CRUD Table App</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
