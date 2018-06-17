import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="pull-right">
          Copyright &copy; {new Date().getFullYear()}
          <strong>eskoolPortal</strong>
        </div>
      </div>
    );
  }
}

export default Footer;
