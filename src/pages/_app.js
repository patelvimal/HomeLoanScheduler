import App from 'next/app'
import Head from 'next/head'
import React from 'react'
import '../assets/fonts.css';
// import '../assets/site.css';
// import '../assets/App.scss';
// import '../assets/InputSlider.scss';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/core/styles';
import Header from '../components/Header';

const theme = createMuiTheme({
	typography: {
     fontFamily: "Roboto-Regular"
	}
});

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>Home Loan Calculator</title>
        </Head>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Header />
            <Component {...pageProps} />
          </ThemeProvider>
        </StylesProvider>
      </>
    )
  }
}