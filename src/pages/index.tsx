import PresalePage from "./Presale";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Presale | Cilistia</title>
        <meta
          name="description"
          content="Take part in the Cilistia $CIL token sale."
        />
      </Head>
      <PresalePage />
    </>
  );
}
