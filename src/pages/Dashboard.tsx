import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { MobileSidebar, Sidebar } from '@/components/Sidebar';

const Dashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <MobileSidebar
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
      />

      <main className="flex-1 p-2 md:p-3 h-screen overflow-hidden">
        <div className="h-full w-full bg-card md:rounded-3xl shadow-sm border border-border/50 overflow-hidden flex flex-col relative transition-all duration-300">
          <Outlet context={{ onOpenMobileMenu: () => setMobileMenuOpen(true) }} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
