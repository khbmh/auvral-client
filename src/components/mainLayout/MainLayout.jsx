import { Outlet } from 'react-router';
import Header from '../common/Header';
import Footer from '../common/Footer';
import ScrollToTop from '../scroll/ScrollToTop';

function MainLayout() {
  return (
    <div>
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
