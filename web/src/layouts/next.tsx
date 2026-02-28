import { HeroWaves } from '@/components/hero-waves';
import { Outlet } from 'react-router';
import { Header } from './next-header';

export default function NextLayout() {
  return (
    <main className="patriotic-app h-full flex flex-col">
      <Header />
      <Outlet />
      <HeroWaves />
    </main>
  );
}
