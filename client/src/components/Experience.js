import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteExperience } from "../actions/profileActions";

class Experience extends Component {
  onDelete(id) {
    this.props.deleteExperience(id);
  }
  render() {
    const experience = this.props.experience.map(e => (
      <tr key={e._id}>
        <td>{e.company}</td>
        <td>{e.title}</td>
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
      <div className="experiences">
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
