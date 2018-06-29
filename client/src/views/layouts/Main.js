import React from "react";
import Navigation from "../../components/Navigation";
import LayoutFooter from "../../components/LayoutFooter";
// import Header from "../../components/Header";

import { Layout, Icon } from "antd";
const { Header, Content } = Layout;

class Main extends React.Component {
  render() {
    return (
      <Layout>
        <Navigation />
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Icon
              className="trigger"
              // type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              // onClick={this.toggle}
            />
          </Header>
          <Content>{this.props.children}</Content>
          <LayoutFooter />
        </Layout>
      </Layout>
    );
  }
}

export default Main;
