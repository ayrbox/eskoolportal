import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return (
    <div id="wrapper">
      <Navigation />
      <div id="page-wrapper" className="gray-bg">
        {children}
      </div>
    </div>
  );
};

export default Layout;
