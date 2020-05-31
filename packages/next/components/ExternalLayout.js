import "../scss/style.scss";

const ExternalLayout = ({ children }) => {
  return (
    <div class="middle-box text-center loginscreen animated fadeInDown">
      {children}
    </div>
  );
};

export default ExternalLayout;
