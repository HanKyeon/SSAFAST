import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta charSet="utf-8" />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <meta name="theme-color" content="#1A1E1B" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SSAFAST" />
        <meta property="og:image" content="%PUBLIC_URL%/theFox.png" />
        {/* <title>A502</title>
        <meta name="description" content="SSAFAST, 빠른 프로젝트 개발 도우미" />
        <meta property="og:url" content="https://j8a601.p.ssafy.io" />
        <meta property="og:title" content="SSAFAST" />
        <meta property="og:description" content="짱빠른 프로젝트 개발 도우미" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/theFox.png" /> */}
      </Head>
      <body>
        <div id="backdrop-root"></div>
        <div id="overlay-root"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
