import Head from 'next/head';

interface HeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const MetaHead = function ({
  title = `SSAFAST`,
  description = `SSAFAST, 빠른 프로젝트 개발 도우미`,
  image = `/assets/images/LightLogo.png`,
  url = ``,
}: HeadProps) {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#1A1E1B" />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`${process.env.NEXT_PUBLIC_HOSTNAME}${url}`}
      />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="SSAFAST" />
      <meta property="og:locale" content="ko_KR" />
      <link rel="apple-touch-icon" href={image} />
      <link rel="shortcut icon" href={image} />
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
};

export default MetaHead;
