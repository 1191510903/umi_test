import styles from './index.css';

function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>耶，欢迎使用小张的第一个react</h1>
      {props.children}
    </div>
  );
}

export default BasicLayout;
