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
        studentsList = (
          <p className="alert alert-warning">No students found.</p>
        );
      } else {
        studentsList = (
          <div className="project-list">
            <table className="table table-hover">
              <tbody>
                {students.map(student => (
                  <tr key={student._id}>
                    <td className="project-title">
                      <Link to={`/students/${student._id}`}>
                        {student.name}
                      </Link>
                    </td>
                    <td className="project-completion">
                      <Moment format="DD MMM YYYY">
                        {student.dateOfBirth}
                      </Moment>
                    </td>
                    <td className="project-people" />
                    <td className="project-status">
                      <span className="label label-primary">Active</span>
                    </td>
                    <td className="project-actions">
                      <Link
                        to={`/students/${student._id}`}
                        className="btn btn-white btn-sm"
                      >
                        <i className="fa fa-folder" /> View
                      </Link>
                      <Link
                        to={`/students/${student._id}/edit`}
                        className="btn btn-white btn-sm"
                      >
                        <i className="fa fa-pencil" /> Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    }

    return (
      <Main>
        <h2>Students</h2>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/dashboard">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Students
            </li>
          </ol>
        </nav>

        <div className="wrapper wrapper-content">
          <div className="ibox">
            <div className="ibox-title">
              <h5>List of all students</h5>
              <div className="ibox-tools">
                <Link to={`/students/add`} className="btn btn-primary btn-sm">
                  New Student
                </Link>

                <button
                  className="btn btn-dark btn-sm ml-2"
                  onClick={this.handleDownloadList}
                >
                  Download List
                </button>
              </div>
            </div>
            <div className="ibox-content">{studentsList}</div>
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
