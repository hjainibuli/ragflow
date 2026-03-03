import { HeroWaves } from '@/components/hero-waves';
import { Outlet } from 'react-router';
import { Header } from './next-header';

export default function NextLayout() {
  return (
    <main className="patriotic-app h-full flex flex-col min-h-0">
      <Header />
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
        <Outlet />
      </div>
      <HeroWaves />
    </main>
  );
}
