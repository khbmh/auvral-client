import { Outlet } from 'react-router';
import Header from '../common/Header';
import Footer from '../common/Footer';
import ScrollToTop from '../scroll/ScrollToTop';
import { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';

function MainLayout() {
  const { isDark } = useContext(DataContext);

  return (
    <div
      className={`${
        isDark ? 'text-white bg-[#181717]' : 'text-black bg-[#faf7f7]'
      }`}
    >
      <Header />
      <div className="min-h-[90vh] mx-auto container">
        <ScrollToTop />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
