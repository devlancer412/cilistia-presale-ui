import Head from "next/head";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    window.location.href = '/airdrop/og'
  }, [])
  return (
    <>
      <Head>
        <title>OG Airdrop  | Cilistia</title>
        <meta
          name="description"
          content="Take part in the Cilistia $CIL token sale."
        />
      </Head>
    </>
  );
}
