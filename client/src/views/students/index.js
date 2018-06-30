import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import Main from "../layouts/Main";
import Spinner from "../../components/Spinner";
import axios from "axios";

//actions
import { getStudents } from "../../actions/studentActions";
import { selectMenu } from "../../actions/uiActions";

import { Button, Table, Breadcrumb, Icon, Divider, Alert } from "antd";

const { Column } = Table;

class StudentsIndex extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleDownloadList = this.handleDownloadList.bind(this);
  }

  componentDidMount() {
    this.props.getStudents();
    this.props.selectMenu("menu-students");
  }

  handleDownloadList() {
    axios({
      url: "/api/students/list/pdf",
      method: "GET",
      responseType: "blob"
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "student_list.pdf");
      document.body.appendChild(link);
      link.click();
    });
  }

  render() {
    const { loading, students } = this.props.student;

    let studentsList;
    if (loading || !students) {
      studentsList = <Spinner />;
    } else {
      if (students.length === 0) {
        studentsList = <Alert message="No students found." type="warning" />;
      } else {
        studentsList = (
          <Table dataSource={students}>
            <Column
              title="Name"
              dataIndex="name"
              key="name"
              render={(text, record) => (
                <Link to={`/students/${record._id}`}>{text}</Link>
              )}
            />
            <Column
              title="Date Of Birth"
              dataIndex="dateOfBirth"
              key="dateOfBirth"
              render={text => <Moment format="DD MMM YYYY">{text}</Moment>}
            />
            <Column
              title="Status"
              render={() => <span className="label label-primary">Active</span>}
            />
            <Column
              title=""
              key="action"
              render={record => (
                <span>
                  <Link to={`/students/${record._id}`}>
                    <Icon type="eye" /> View
                  </Link>
                  <Divider type="vertical" />
                  <Link to={`/students/${record._id}/edit`}>
                    <Icon type="edit" /> Edit
                  </Link>
                </span>
              )}
            />
          </Table>
        );
      }
    }

    return (
      <Main>
        <div className="page-header">
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to={"dashboard"}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Students</Breadcrumb.Item>
          </Breadcrumb>
          <h2>Students</h2>
        </div>
        <div
          style={{
            margin: "24px 16px",
            padding: "24px",
            background: "#fff",
            minHeight: 360
          }}
        >
          <div className="table-list-container">
            <Button
              type="primary"
              shape="circle"
              icon="user-add"
              href={`/students/add`}
              style={{ marginRight: "8px" }}
            />

            <Button
              type="primary"
              shape="circle"
              icon="download"
              onClick={this.handleDownloadList}
            />

            {studentsList}
          </div>
        </div>
      </Main>
    );
  }
}

StudentsIndex.propTypes = {
  students: PropTypes.array,
  getStudents: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  student: state.student
});

export default connect(
  mapStateToProps,
  {
    getStudents,
    selectMenu
  }
)(StudentsIndex);
