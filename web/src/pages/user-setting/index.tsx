import { HeroWaves } from '@/components/hero-waves';
import { PageHeader } from '@/components/page-header';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useNavigatePage } from '@/hooks/logic-hooks/navigate-hooks';
import { cn } from '@/lib/utils';
import { House } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router';
import styles from './index.module.less';
import { SideBar } from './sidebar';

const UserSetting = () => {
  const { t } = useTranslation();
  const { navigateToHome } = useNavigatePage();

  return (
    <section className="patriotic-app patriotic-user-setting flex flex-col h-full min-h-screen">
      <PageHeader>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={navigateToHome}>
                <House className="size-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t('setting.profile')}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </PageHeader>
      <div
        className={cn(
          styles.settingWrapper,
          'overflow-auto flex flex-1 pt-4 pr-4 pb-4',
        )}
      >
        <SideBar></SideBar>
        <div
          className={cn(
            styles.outletWrapper,
            'patriotic-user-setting-outlet flex flex-1 rounded-lg',
          )}
        >
          <Outlet></Outlet>
        </div>
      </div>
      <HeroWaves />
    </section>
  );
};

export default UserSetting;
