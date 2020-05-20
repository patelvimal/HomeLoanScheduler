import Document, { Html, Head, Main, NextScript } from 'next/document';
import {ServerStyleSheets} from "@material-ui/styles";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        try{
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: App => props => sheet.collect(<App {...props}/>)
            });

            const initialProps = await Document.getInitialProps(ctx);
            return { ...initialProps,
                styles: (
                    <>
                        {/* {sheet.getStyleElement()} */}
                        {initialProps.styles}
                    </>
                )
            }
        } finally {
            ctx.renderPage(sheet)
        }

    }
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="utf-8" />
                    <link rel="shortcut icon" type="image/png" href="./appIcon.png"/>
                    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-37554448-3"></script>
                    <script src="./gAnalytics.js"></script>
                    <meta name="viewport"content="width=device-width, initial-scale=1.0" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="description" content="Home Loan Calculator"/>
                    <style>{`body { margin: 0 ; padding: 0} `}</style>
                </Head>
                <body className="custom_class">
                    <Main />
                    <NextScript />
                </body>
            </Html>
    )}
}

export default MyDocument;