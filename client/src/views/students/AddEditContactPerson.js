import React, { Component } from "react";
import { connect } from "react-redux";

import TextFieldGroup from "../../components/TextFieldGroup";

import Main from "../layouts/Main";

class AddEditContactPerson extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      contactPerson: {},
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
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
        <div className="ibox">
          <div className="ibox-content">
            <form className="form-horizontal">
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
              <pre>{JSON.stringify(this.state.contactPerson, null, 2)}</pre>
            </form>
          </div>
        </div>
      </Main>
    );
  }
}

export default connect(null)(AddEditContactPerson);
