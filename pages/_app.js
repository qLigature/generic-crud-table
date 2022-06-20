import Head from 'next/head';

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
