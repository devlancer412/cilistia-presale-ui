import styles from "@/styles/Home.module.css";
import { Timer, PresaleInfo, Buy } from "@/components";

const Presale = () => {
  return (
    <main className={styles.main}>
      <Timer />
      <PresaleInfo />
      <Buy />
    </main>
  );
};

export default Presale;
