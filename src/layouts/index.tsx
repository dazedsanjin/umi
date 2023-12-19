import { Link, Outlet } from 'umi';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'antd/dist/antd.css';
import styles from './index.less';

export default function Layout() {
  return (
    <ConfigProvider locale={zhCN}>
      <div className={styles.wrapper}>
        <Outlet />
      </div>
    </ConfigProvider>
  );
}
