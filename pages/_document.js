import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
    return (
        <Html>
            <Head>
                <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                    crossOrigin="anonymous"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
                <Script
                    id="bootstrap-cdn"
                    src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
                />
            </body>
        </Html>
    );
}
