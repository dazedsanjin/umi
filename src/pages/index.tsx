import { Outlet } from 'umi';

export default function HomePage() {
  return (
    <div style={{ height: '100%' }}>
      <Outlet />
    </div>
  );
}
