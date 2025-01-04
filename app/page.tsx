import styles from "./page.module.css";
import RootLayout from "./layout";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <RootLayout />
      </main>
    </div>
      
  );
}
