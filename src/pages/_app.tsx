import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "theme-ui";
import { tailwind } from "@theme-ui/presets";
import Head from "next/head";
import { DESCRIPTION } from ".";

const theme = {
  ...tailwind,
  colors: {
    ...tailwind.colors,
    line: "#e0e0e0",
    highlight: "rgb(255, 255, 0, 0.5)",
    mutedText: "#979797",
    primary: "#e0c3fd",
  },
};

const ORIGIN_URL = "https://" + process.env.VERCEL_URL;
const OG_IMAGE_URL = ORIGIN_URL + "/og.png";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Constitución Chile [Clarity]</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />

        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta property="og:title" content="Constitución Chile [Clarity]" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content="https://clarity.rahul.gs" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Constitución Chile [Clarity]" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rahulgs" />
        <meta name="twitter:creator" content="@rahulgs" />
        <meta name="twitter:title" content="Constitución Chile [Clarity]" />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
