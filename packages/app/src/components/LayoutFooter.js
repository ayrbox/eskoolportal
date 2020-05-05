import React, { Component } from "react";
import { Layout } from "antd";
const { Footer } = Layout;

class LayoutFooter extends Component {
  render() {
    return (
      <Footer>
        Copyright &copy; {new Date().getFullYear()}
        <strong> eskoolPortal</strong>
      </Footer>
    );
  }
}

export default LayoutFooter;
