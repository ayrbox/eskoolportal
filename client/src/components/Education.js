import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteEducation } from "../actions/profileActions";

class Education extends Component {
  onDelete(id) {
    this.props.deleteEducation(id);
  }
  render() {
    const education = this.props.education.map(e => (
      <tr key={e._id}>
        <td>{e.school}</td>
        <td>{e.degree}</td>
        <td>
          <Moment format="DD/MM/YYYY">{e.from}</Moment>
          -
          {e.to === null ? "Now" : <Moment format="DD/MM/YYYY">{e.to}</Moment>}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={this.onDelete.bind(this, e._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div className="educations">
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
