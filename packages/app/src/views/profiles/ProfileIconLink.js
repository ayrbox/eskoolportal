import React from "react";

const ProfileIconLink = ({ icon, link }) => {
  return link ? (
    <a className="text-white p-2" href={link} target="_blank">
      <i className={`${icon} fa-2x`} />
    </a>
  ) : null;
};

export default ProfileIconLink;
