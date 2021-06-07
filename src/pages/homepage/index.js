import styles from './index.css';
import Link from 'umi/link';


export default function() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>
          <Link to="/fs">
              <h1>跳转页面</h1>
          </Link>
        </li>
      </ul>
    </div>
  );
}
