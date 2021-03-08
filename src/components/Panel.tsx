const Panel = ({ children }) => {
  return (
    <div className="ibox">
      <div className="ibox-content">{children}</div>
    </div>
  );
};

export default Panel;
