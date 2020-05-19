import '../scss/style.scss';

import Navigation from './Navigation';

const Layout = ({ children }) => {
  return (
    <div id="wrapper">
      <Navigation />
      <div id="page-wrapper" class="gray-bg">
        {children}
      </div>
    </div>
  );
};

export default Layout;
