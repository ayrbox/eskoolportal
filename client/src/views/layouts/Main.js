import React from "react";
import Navigation from "../../components/Navigation";
import LayoutFooter from "../../components/LayoutFooter";
import LayoutHeader from "../../components/LayoutHeader";

import { Layout } from "antd";
const { Content } = Layout;

class Main extends React.Component {
  render() {
    return (
      <Layout>
        <Navigation />
        <Layout>
          <LayoutHeader />
          <Content>{this.props.children}</Content>
          <LayoutFooter />
        </Layout>
      </Layout>
    );
  }
}

export default Main;
