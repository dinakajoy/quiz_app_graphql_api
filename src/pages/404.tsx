import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Error() {
  return (
    <div className={styles.homeWrapper}>
      <p className={styles.description}>Not Found &nbsp; 👋</p>
      <Link href="/quiz">
        <a className={styles.startBtn}>Go to Home Page</a>
      </Link>
    </div>
  )
}