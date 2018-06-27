import React, { Component } from "react";
import { connect } from "react-redux";

import { addContactPerson } from "../../actions/studentActions";

import TextFieldGroup from "../../components/TextFieldGroup";

import Main from "../layouts/Main";

class AddEditContactPerson extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      contactPerson: {
        name: "",
        relation: "",
        email: "",
        contactNo: ""
      },
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const { contactPerson } = this.state;
    const { id } = this.props.match.params;

    this.props.addContactPerson(id, contactPerson, this.props.history);
  }

  onChange(e) {
    this.setState({
      contactPerson: {
        ...this.state.contactPerson,
        [e.target.name]: e.target.value
      }
    });
  }

  render() {
    const { errors, contactPerson } = this.state;
    return (
      <Main>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-9 pb-3 pt-3">
            <h2>Student Contact Person</h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/dashboard">Home</a>
                </li>
                <li className="breadcrumb-item" aria-current="page">
                  <a href="/students">Students</a>
                </li>
                <li className="breadcrumb-item">Contact Person</li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="ibox">
          <div className="ibox-content">
            <form className="form-horizontal" onSubmit={this.onSubmit}>
              <TextFieldGroup
                name="name"
                label="Name"
                placeholder="Contact Person name"
                value={contactPerson.name}
                error={errors.name}
                onChange={this.onChange}
              />

              <TextFieldGroup
                name="relation"
                label="Relationship"
                placeholder="Contact Person relationship with Student"
                value={contactPerson.relation}
                error={errors.relation}
                onChange={this.onChange}
              />

              <TextFieldGroup
                name="contactNo"
                label="Contact No"
                placeholder="Contact No for the person"
                value={contactPerson.contactNo}
                error={errors.contactNo}
                onChange={this.onChange}
              />

              <TextFieldGroup
                name="email"
                label="Email"
                placeholder="Email for contact"
                value={contactPerson.email}
                error={errors.email}
                onChange={this.onChange}
              />
              <input
                type="submit"
                value="Save"
                className="btn btn-info btn-block mb-4"
              />
            </form>
          </div>
        </div>
      </Main>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  student: state.student
});

export default connect(
  mapStateToProps,
  { addContactPerson }
)(AddEditContactPerson);
