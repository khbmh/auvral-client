import { Outlet } from 'react-router';
import Header from '../common/Header';
import Footer from '../common/Footer';
import ScrollToTop from '../scroll/ScrollToTop';
import { useState } from 'react';

function MainLayout() {
  const [isDark, setIsDark] = useState(false);
  return (
    <div
      className={`${
        isDark ? 'text-white bg-[#181717]' : 'text-black bg-[#faf7f7]'
      }`}
    >
      <Header isDark={isDark} setIsDark={setIsDark} />
      <div className="min-h-[90vh] mx-auto container">
        <ScrollToTop />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
