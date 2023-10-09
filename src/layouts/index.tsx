import { Link, Outlet } from 'umi';
import styles from './index.less';
import { setLocaleData } from 'monaco-editor-nls';
import zh from 'monaco-editor-nls/locale/zh-hans.json';

export default function Layout() {
  setLocaleData(zh);
  return (
    <div className={styles.wrapper}>
      <Outlet />
    </div>
  );
}
