import Document, { Head, Main, NextScript } from 'next/document'


export default class SiteDocument extends Document {
  render() {

    return (
      <html lang="en">
        <Head>
          <meta charset="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Home Loan Calculator" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-37554448-3"></script>
          {/* <script>
            window.dataLayer = window.dataLayer || [];
            function gtag() {dataLayer.push(arguments); }
            gtag('js', new Date());

            gtag('config', 'UA-37554448-3');
          </script> */}
        </Head>
        <body>
          <div className="root">
            <Main />
          </div>
          <NextScript />
        </body>
      </html>
    )
  }
}