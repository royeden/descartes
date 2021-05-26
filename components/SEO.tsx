import Head from "next/head";

export type SEO = {
  description: string;
  image?: string;
  title: string;
};

export default function SEO({ description, image, title }: SEO) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      {process.browser && (
        <meta property="og:url" content={window.location.href} key="ogurl" />
      )}
      {image && <meta property="og:image" content={image} key="ogimage" />}
      <meta
        property="og:site_name"
        content="Descartes / Basura digital"
        key="ogsitename"
      />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
    </Head>
  );
}
