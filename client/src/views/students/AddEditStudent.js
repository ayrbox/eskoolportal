import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

import {
  getStudent,
  insertStudent,
  updateStudent
} from "../../actions/studentActions";

import Main from "../layouts/Main";
import Spinner from "../../components/Spinner";
import isEmpty from "../../utils/is-empty";

import TextFieldGroup from "../../components/TextFieldGroup";
import SelectItem from "../../components/SelectItem";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import {
  Breadcrumb,
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete
} from "antd";
import { Link } from "react-router-dom";

class AddEditStudent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      addMode: true,
      id: undefined,
      errors: {},
      student: {
        name: "",
        gender: "Male",
        dateOfBirth: "",
        contactNo: "",
        email: "",
        address: "",
        class: "",
        section: "",
        joinDate: ""
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
  }
  componentDidMount() {
    const { id } = this.props.match.params;

    this.setState({
      addMode: isEmpty(id),
      id
    });

    this.props.getStudent(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if (nextProps.student.student) {
      const student = nextProps.student.student;
      student.name = !isEmpty(student.name) ? student.name : "";
      student.address = !isEmpty(student.address) ? student.address : "";
      student.gender = !isEmpty(student.gender) ? student.gender : "";
      student.dateOfBirth = !isEmpty(student.dateOfBirth)
        ? student.dateOfBirth
        : "";
      student.email = !isEmpty(student.email) ? student.email : "";
      student.contactNo = !isEmpty(student.contactNo) ? student.contactNo : "";
      student.joinDate = !isEmpty(student.joinDate) ? student.joinDate : "";
      student.class = !isEmpty(student.class) ? student.class : "";
      student.section = !isEmpty(student.section) ? student.section : "";

      this.setState({
        student
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { addMode, id, student } = this.state;
    if (addMode) {
      this.props.insertStudent(student, this.props.history);
    } else {
      this.props.updateStudent(id, student, this.props.history);
    }
  }

  onChange(e) {
    this.setState({
      student: {
        ...this.state.student,
        [e.target.name]: e.target.value
      }
    });
  }

  handleGenderChange(value) {
    this.setState({
      student: {
        ...this.state.student,
        gender: value
      }
    });
  }

  render() {
    const { addMode, errors, student } = this.state;

    const { loading } = this.props.student;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    };

    let formContent;
    if (!student || loading) {
      formContent = <Spinner />;
    } else {
      formContent = (
        <Form onSubmit={this.onSubmit} layout="horizontal">
          <TextFieldGroup
            id="referenceCode"
            name="referenceCode"
            label="Ref Code"
            value={student.referenceCode}
            placeholder="Reference Code"
            error={errors.referenceCode}
            onChange={this.onChange}
          />
          <TextFieldGroup
            id="name"
            name="name"
            label="Name"
            placeholder="Student Name"
            value={student.name}
            onChange={this.onChange}
            error={errors.name}
          />
          <SelectItem
            name="gender"
            id="gender"
            defaultValue={student.gender}
            value={student.gender}
            label="Gender"
            placeholder="Male/Female"
            options={[
              {
                text: "Male",
                value: "Male"
              },
              { text: "Female", value: "Female" }
            ]}
            onChange={this.handleGenderChange}
          />
          <TextFieldGroup
            id="dateOfBirth"
            name="dateOfBirth"
            label="Date of Birth"
            type="date"
            defaultValue={moment(student.dateOfBirth).format("YYYY-MM-DD")}
            error={errors.dateOfBirth}
            onChange={this.onChange}
          />
          <TextFieldGroup
            name="contactNo"
            label="Contact No"
            error={errors.contactNo}
            value={student.contactNo}
            onChange={this.onChange}
          />
          <TextFieldGroup
            name="email"
            label="Email"
            error={errors.email}
            value={student.email}
            onChange={this.onChange}
          />
          <TextFieldGroup
            name="address"
            label="Address"
            error={errors.address}
            value={student.address}
            onChange={this.onChange}
          />
          <TextFieldGroup
            id="joinDate"
            name="joinDate"
            label="Join Date"
            type="date"
            defaultValue={moment(student.joinDate).format("YYYY-MM-DD")}
            className="form-control"
            InputLabelProps={{
              shrink: true
            }}
            onChange={this.onChange}
          />
          <TextFieldGroup
            name="class"
            label="Class"
            error={errors.class}
            value={student.class}
            onChange={this.onChange}
          />
          <TextFieldGroup
            name="section"
            label="Section"
            error={errors.section}
            value={student.section}
            onChange={this.onChange}
          />
          <TextFieldGroup
            name="classRollNo"
            label="Class Roll No:"
            error={errors.section}
            value={student.classRollNo}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Save"
            className="btn btn-info btn-block mb-4"
          />
        </Form>
      );
    }

    return (
      <Main>
        <div className="page-header">
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to={"dashboard"}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={"students"}>Students</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{addMode ? "Add" : "Edit"}</Breadcrumb.Item>
          </Breadcrumb>
          <h2>{addMode ? "Add" : "Edit"} Student</h2>
        </div>
        <div
          style={{
            margin: "24px 16px",
            padding: "24px",
            background: "#fff",
            minHeight: 360
          }}
        >
          {formContent}
        </div>
      </Main>
    );
  }
}

AddEditStudent.propTypes = {
  student: PropTypes.object.isRequired,
  getStudent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  student: state.student,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getStudent, insertStudent, updateStudent }
)(AddEditStudent);
