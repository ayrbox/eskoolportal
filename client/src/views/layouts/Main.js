import React from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

class Main extends React.Component {
  render() {
    return (
      <div id="wrapper">
        <Navigation location={this.props.location} />
        <div id="page-wrapper" className="gray-bg">
          <Header />
          {this.props.children}
          <Footer />
        </div>
      </div>
    );
  }
}

export default Main;
