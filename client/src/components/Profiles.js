import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "./Spinner";

import ProfileItem from "./ProfileItem";

import { getProfiles } from "../actions/profileActions";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profile;

    let profileItems;
    if (profiles == null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles found.</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="display-4 text-center">Teacher Profiles</h1>
              <p className="lead text-center">
                Browser and connect with teachers
              </p>
              {profileItems}
            </div>
          </div>
          <div
            className="wrapper wrapper-content animated fadeInRight"
            style={{ backgroundColor: "#ffd" }}
          >
            <div className="row">
              <div className="col-12">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Date of Birth</th>
                      <th>Gender</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/0a8e44f6-14ba-4b77-8375-ada64c156d66"
                          className="client-link"
                        >
                          Ruban Bajracharya
                        </a>
                      </td>
                      <td>04/12/2010</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/0eeb6ad5-65a7-49cd-95db-347777711ee9"
                          className="client-link"
                        >
                          Ganga Shahi
                        </a>
                      </td>
                      <td>26/04/2007</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/0fdd3ff4-10bb-40e6-85da-33b55b3a0aa7"
                          className="client-link"
                        >
                          Shristi Shrestha
                        </a>
                      </td>
                      <td>28/02/2011</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/10c0c280-1ec4-4f78-8aa0-edbc87fbb7ea"
                          className="client-link"
                        >
                          Brijesh Pradhananga
                        </a>
                      </td>
                      <td>01/08/2009</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/147f0e35-0981-4596-b722-6a907eddaaa2"
                          className="client-link"
                        >
                          Pujana Shrestha
                        </a>
                      </td>
                      <td>07/12/2005</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/163cbe9a-869c-4e9c-9962-88eba80ce6dc"
                          className="client-link"
                        >
                          Shreesti Shrestha
                        </a>
                      </td>
                      <td>03/07/2008</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/1745d912-278f-4c0d-ab34-96f456ada4f8"
                          className="client-link"
                        >
                          Surendra Maharjan
                        </a>
                      </td>
                      <td>18/02/2005</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/19250315-f03b-4d0f-a1a4-76c8d4f70643"
                          className="client-link"
                        >
                          Purushottam Tuladhar
                        </a>
                      </td>
                      <td>14/11/2005</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/19ba8ed3-217d-4b22-afe5-702d1492cf39"
                          className="client-link"
                        >
                          Suraj Maharjan
                        </a>
                      </td>
                      <td>25/09/2009</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/1db5dee6-a6ee-4035-b54f-2554553da902"
                          className="client-link"
                        >
                          Sushir Dangol
                        </a>
                      </td>
                      <td>14/04/2011</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/1ed01628-b46a-4498-9f76-3a3ceae279a5"
                          className="client-link"
                        >
                          Nikesh Shrestha
                        </a>
                      </td>
                      <td>16/08/2008</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/22733b92-d9e5-4dc9-a365-b15f25c2a6c0"
                          className="client-link"
                        >
                          Nihit Rajbhandari
                        </a>
                      </td>
                      <td>15/04/2011</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/23eead88-24be-43c3-b65b-c44ec2c577d5"
                          className="client-link"
                        >
                          Alina Shrestha
                        </a>
                      </td>
                      <td>30/09/2006</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/24b1b0e2-7701-4f82-8d6c-0a3f48d46025"
                          className="client-link"
                        >
                          Anil Shahi
                        </a>
                      </td>
                      <td>09/02/2010</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/25320c5e-f58a-4b1f-b63a-8ee07a840bdf"
                          className="client-link"
                        >
                          Sabin Raj DANGOL
                        </a>
                      </td>
                      <td>05/08/2007</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/2a799bd5-7cc1-4c19-a58b-61e8b7d9d2c0"
                          className="client-link"
                        >
                          SANDHYA NAKARMAI
                        </a>
                      </td>
                      <td>12/12/2006</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/2a8b5839-b97e-49c9-986c-17b9f2e566d9"
                          className="client-link"
                        >
                          Manisha Maharjan
                        </a>
                      </td>
                      <td>01/04/2010</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/2beb528a-68ca-47ef-8643-a3e4f3849ccb"
                          className="client-link"
                        >
                          Dipson Buddhacharya
                        </a>
                      </td>
                      <td>13/08/2009</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/2dd3c8f3-bc09-44f1-8cfb-b37aa9eaeb59"
                          className="client-link"
                        >
                          SUBIN DANGOL
                        </a>
                      </td>
                      <td>23/10/2006</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/312c9f02-e75c-47bd-a061-20c92ebfc848"
                          className="client-link"
                        >
                          Surya Narayan Tandukar
                        </a>
                      </td>
                      <td>29/05/2009</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/31b26480-a3b6-4341-add7-aa397d681603"
                          className="client-link"
                        >
                          Suhit Sthapit
                        </a>
                      </td>
                      <td>22/07/2008</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/3457171d-5512-4e6c-98c6-091a97467ed0"
                          className="client-link"
                        >
                          Gaurav Manandhar
                        </a>
                      </td>
                      <td>10/07/2009</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/365a4842-f063-4a37-9383-a7c58e19c665"
                          className="client-link"
                        >
                          Rashu Shahi
                        </a>
                      </td>
                      <td>01/09/2010</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/399d9fbe-097c-4005-a8af-825d41839874"
                          className="client-link"
                        >
                          Rakshya Bhandary
                        </a>
                      </td>
                      <td>24/04/2005</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/3a30b7ff-249f-41d6-8192-c7088385a633"
                          className="client-link"
                        >
                          Sailesh Newa
                        </a>
                      </td>
                      <td>24/07/2008</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/3a31a25d-dc6f-429e-b46c-20100fc684c7"
                          className="client-link"
                        >
                          Ruksha Bajracharya
                        </a>
                      </td>
                      <td>06/12/2010</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/3e012f80-ea0e-48fa-a059-28d80d2c67a1"
                          className="client-link"
                        >
                          Binu Shahi
                        </a>
                      </td>
                      <td>18/07/2008</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/3eea624e-2100-4d87-baf6-baa743889fb2"
                          className="client-link"
                        >
                          Shreesti Shrestha
                        </a>
                      </td>
                      <td>09/09/2006</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/4064d11b-8247-4d1e-90af-f80fc3748cf7"
                          className="client-link"
                        >
                          Susmita Khanal
                        </a>
                      </td>
                      <td>26/07/2006</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/41c15844-5a7d-4423-826e-d4e5af437c9c"
                          className="client-link"
                        >
                          Sushan Tuladhar
                        </a>
                      </td>
                      <td>25/12/2008</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/42cca648-2071-46d9-9991-57965a19f269"
                          className="client-link"
                        >
                          Sailija Adhikari
                        </a>
                      </td>
                      <td>20/04/2010</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/47033abd-75a4-46db-80d7-5c625658248a"
                          className="client-link"
                        >
                          Deepak Kumar Maharjan
                        </a>
                      </td>
                      <td>22/04/2011</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/4d77c30a-8715-4c2e-8b43-b31781aa6ba5"
                          className="client-link"
                        >
                          Sujan Rajak
                        </a>
                      </td>
                      <td>24/12/2011</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/4e793485-2b88-4b28-857d-70d5e4c45e94"
                          className="client-link"
                        >
                          Neetisha Malakar
                        </a>
                      </td>
                      <td>10/11/2008</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/50a9d105-0d5d-46a0-854e-eacef0a19337"
                          className="client-link"
                        >
                          Amrita Nepali
                        </a>
                      </td>
                      <td>20/05/2009</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/54caf8d3-bc46-438c-a8f6-3853976bff38"
                          className="client-link"
                        >
                          Rojan Shahi
                        </a>
                      </td>
                      <td>09/04/2009</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/5517bd58-11c4-47cb-9a12-c7fe3aea5829"
                          className="client-link"
                        >
                          Manish Agarawal
                        </a>
                      </td>
                      <td>30/08/2009</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/5a824b6f-0c6a-49d2-8338-d40a33f66daf"
                          className="client-link"
                        >
                          Ramila Pujari
                        </a>
                      </td>
                      <td>31/08/2005</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/5b9912a1-fed3-43cb-ac29-ff46d3d837c4"
                          className="client-link"
                        >
                          Sabita Shahi
                        </a>
                      </td>
                      <td>24/08/2009</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/627dcf2a-e4fe-4809-8cdd-20f6619993d7"
                          className="client-link"
                        >
                          Shri Ram Khanal
                        </a>
                      </td>
                      <td>10/08/2011</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/6379e34b-7921-4e00-83ac-a391d28d72df"
                          className="client-link"
                        >
                          Sabnam Shrestha
                        </a>
                      </td>
                      <td>11/04/2007</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/65b472f3-1050-4c4a-bb51-026a914b39f6"
                          className="client-link"
                        >
                          Alisha Sthapit
                        </a>
                      </td>
                      <td>05/07/2008</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/679d180a-056b-4779-a956-fa92e971de80"
                          className="client-link"
                        >
                          Sampurna Man Tamrakar
                        </a>
                      </td>
                      <td>21/12/2010</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/6952f351-e919-4a1f-997b-064fdae21dff"
                          className="client-link"
                        >
                          Manik Pujari
                        </a>
                      </td>
                      <td>09/04/2006</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/6af1cb46-dd17-41fa-b0a4-7eccabe00d2a"
                          className="client-link"
                        >
                          Mikesh Maharjan
                        </a>
                      </td>
                      <td>14/02/2009</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/6bd2c316-9476-493c-b2ea-0fe17a89f14b"
                          className="client-link"
                        >
                          Sachin Shrestha
                        </a>
                      </td>
                      <td>15/03/2008</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/745bc930-cf01-4068-aed5-d50e67739dd1"
                          className="client-link"
                        >
                          Nitesh Mishra
                        </a>
                      </td>
                      <td>10/03/2007</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/7c0c8725-faa4-470c-86ca-3e90d8089526"
                          className="client-link"
                        >
                          Rikima Singh
                        </a>
                      </td>
                      <td>27/10/2009</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/7d31bca3-350e-4fe7-b221-94151a5878a2"
                          className="client-link"
                        >
                          Anina Maharjan
                        </a>
                      </td>
                      <td>05/08/2011</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/804d9cc5-29af-45fe-811f-c05e234c411a"
                          className="client-link"
                        >
                          NITESH GOYAL
                        </a>
                      </td>
                      <td>03/02/2006</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/8a502fb5-f9dd-4f4d-ab04-83cd12c824f3"
                          className="client-link"
                        >
                          Sunil Manandhar
                        </a>
                      </td>
                      <td>01/04/2009</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/8a71b85f-9bac-40b3-aa63-aae1c6401c34"
                          className="client-link"
                        >
                          Srijana Manandhar
                        </a>
                      </td>
                      <td>25/12/2010</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/8c25f73c-e07e-4038-a799-ceba9fee2e7a"
                          className="client-link"
                        >
                          Smriti Shrestha
                        </a>
                      </td>
                      <td>15/04/2005</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/90f524e6-9dba-45e3-9d2a-7567ffd979aa"
                          className="client-link"
                        >
                          Sagina Munikar
                        </a>
                      </td>
                      <td>11/05/2010</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/9334aff6-4ea6-4c8f-b5e7-28572b900ffa"
                          className="client-link"
                        >
                          Sudan Maharjan
                        </a>
                      </td>
                      <td>02/11/2011</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/9995ecac-ec59-4d64-b77f-f854fc9587ef"
                          className="client-link"
                        >
                          Mamita Gurung
                        </a>
                      </td>
                      <td>12/09/2009</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/a005ee79-2f1b-481e-80a3-a3b7ff563947"
                          className="client-link"
                        >
                          Niranjan Shrestha
                        </a>
                      </td>
                      <td>12/12/2010</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/a20bb7f3-b4a4-401e-9522-1b9150fc6781"
                          className="client-link"
                        >
                          Navina Malakar
                        </a>
                      </td>
                      <td>22/09/2008</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/a40c10d9-9d78-4f7a-9d0c-ea6c30f94c60"
                          className="client-link"
                        >
                          Saujanya Sthapit
                        </a>
                      </td>
                      <td>14/07/2011</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/a841308d-041f-4abb-9e7e-71045fa58ccf"
                          className="client-link"
                        >
                          Rajeev Maharjan
                        </a>
                      </td>
                      <td>01/03/2005</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/aa834577-cb0f-4bff-a228-fd7bf3d18073"
                          className="client-link"
                        >
                          Neeta Nepali
                        </a>
                      </td>
                      <td>09/01/2006</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/ab0daa5a-6d91-47a6-a385-be2f5c24d5ed"
                          className="client-link"
                        >
                          Rojeena Sidurakar
                        </a>
                      </td>
                      <td>22/07/2007</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/acfb7fea-b045-4dc6-8258-a4b69b6bc608"
                          className="client-link"
                        >
                          Sehanaj Pujari
                        </a>
                      </td>
                      <td>06/11/2006</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/add42106-db1d-4544-9186-0dab103c511f"
                          className="client-link"
                        >
                          Sajan Shrestha
                        </a>
                      </td>
                      <td>16/02/2007</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/b07910b8-a36c-4304-b010-58a39f40db1f"
                          className="client-link"
                        >
                          Asha Goyal
                        </a>
                      </td>
                      <td>18/10/2009</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/b234637a-005b-46e8-923a-5028a1e5baf5"
                          className="client-link"
                        >
                          Manisha Pradhananga
                        </a>
                      </td>
                      <td>21/12/2010</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/b624b28e-ddf6-44d5-862e-373481e7c440"
                          className="client-link"
                        >
                          Rojita Shakya
                        </a>
                      </td>
                      <td>15/02/2007</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/ba9aed69-e859-4619-8ba8-ad0bbd515f74"
                          className="client-link"
                        >
                          Alpana Rauniyar
                        </a>
                      </td>
                      <td>27/08/2005</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/bba14b80-0562-42bf-a4aa-6e29541b8a93"
                          className="client-link"
                        >
                          Vdisha Kuthu
                        </a>
                      </td>
                      <td>02/11/2007</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/bcb1eebb-6fdd-4f80-8c1e-f942ba83c259"
                          className="client-link"
                        >
                          Bimee Maskey
                        </a>
                      </td>
                      <td>03/03/2006</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/c2fd6434-4ffc-416a-8f26-5332bc985e3b"
                          className="client-link"
                        >
                          Saroj Maharjan
                        </a>
                      </td>
                      <td>27/12/2010</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/c7998515-585c-4eab-9858-25cea15e3cba"
                          className="client-link"
                        >
                          Sharad Nepali
                        </a>
                      </td>
                      <td>10/05/2010</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/c8ef0f6d-6b05-4f31-8e9c-4fd4b2f1e2ca"
                          className="client-link"
                        >
                          Tisa Maharjan
                        </a>
                      </td>
                      <td>01/02/2011</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/ca91ad39-97cf-41b2-9b49-1274e5fea7bf"
                          className="client-link"
                        >
                          Rakesh Maharjan
                        </a>
                      </td>
                      <td>23/05/2011</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/cc3f2cd7-9304-40d6-a869-c379d5ece603"
                          className="client-link"
                        >
                          Ajay Maharjan
                        </a>
                      </td>
                      <td>17/01/2007</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/cf800740-c085-4605-88f0-7c23f405423e"
                          className="client-link"
                        >
                          Sushma Maharjan
                        </a>
                      </td>
                      <td>10/11/2010</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/cf920d05-b46e-4ec8-aaa6-ab88b4ac8a1e"
                          className="client-link"
                        >
                          Saumya Sthapit
                        </a>
                      </td>
                      <td>16/11/2007</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/d0c0c472-f136-441d-b86c-7ae033c49b11"
                          className="client-link"
                        >
                          Susita Subedi
                        </a>
                      </td>
                      <td>21/10/2011</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/d20e5826-501c-4fb9-9619-1d04019c9676"
                          className="client-link"
                        >
                          Sujan Shrestha
                        </a>
                      </td>
                      <td>11/04/2009</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/d2d9223b-e25f-4acd-8f39-3c3836d99d29"
                          className="client-link"
                        >
                          Anurag Rauniyar
                        </a>
                      </td>
                      <td>03/08/2006</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/d408e4e5-55b3-441b-956a-5dc34619040e"
                          className="client-link"
                        >
                          Sunaina Awal
                        </a>
                      </td>
                      <td>27/10/2008</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/d7fe7aec-cc70-4bee-8daa-10e0126b052a"
                          className="client-link"
                        >
                          Preeti Agarawal
                        </a>
                      </td>
                      <td>24/04/2010</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/d87d6d61-b86c-4daf-a09f-7350495a3000"
                          className="client-link"
                        >
                          Rohit Pujari
                        </a>
                      </td>
                      <td>14/12/2006</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/e1000cb8-1e29-4853-9ffe-6e11b8c03325"
                          className="client-link"
                        >
                          Sangita Maharjan
                        </a>
                      </td>
                      <td>23/11/1986</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/e1d65a57-b530-408c-8bb6-8eaed69f1db5"
                          className="client-link"
                        >
                          Ayush Manandhar
                        </a>
                      </td>
                      <td>03/09/2010</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/e4aa559e-fa5c-4f47-b61c-30a796643bbc"
                          className="client-link"
                        >
                          Rumi Shrestha
                        </a>
                      </td>
                      <td>22/04/2009</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/e5272e30-c8cb-4315-a5e2-50aea6b37d1a"
                          className="client-link"
                        >
                          Saroj Nepali
                        </a>
                      </td>
                      <td>29/11/2009</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/e58964df-387d-4d4c-968f-0b7acdfe0b2d"
                          className="client-link"
                        >
                          Rojeena Shrestha
                        </a>
                      </td>
                      <td>11/09/2006</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/e5c0bf59-75c0-417f-80cb-bc9b4aaba6c3"
                          className="client-link"
                        >
                          Ashmita Maharjan
                        </a>
                      </td>
                      <td>08/04/2009</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/e6f6c7e1-52d6-4318-97be-89a593e24249"
                          className="client-link"
                        >
                          Terisha Devi Mali
                        </a>
                      </td>
                      <td>09/07/2009</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/ecfca70a-5e41-4133-9a22-8f60185199d9"
                          className="client-link"
                        >
                          Prajwol Shakya
                        </a>
                      </td>
                      <td>18/04/2009</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/ed3ba5af-f173-4ba6-82f3-3b6b9c5e51a8"
                          className="client-link"
                        >
                          Ramesh Maharjan
                        </a>
                      </td>
                      <td>29/08/2008</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/ee51e665-f228-4f8f-94fb-296763d9cec6"
                          className="client-link"
                        >
                          Kripa Devkota
                        </a>
                      </td>
                      <td>21/05/2010</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/f1fc5fa4-3ce7-4706-8ec9-b6dad9820bfd"
                          className="client-link"
                        >
                          Kritina Shahi
                        </a>
                      </td>
                      <td>24/01/2006</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/f35aaf2a-a9e9-4076-82c3-5be183cd7671"
                          className="client-link"
                        >
                          Sarina Maharjan
                        </a>
                      </td>
                      <td>26/12/2008</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/f50dab8d-2ce2-4f07-b7fc-ed15b2204659"
                          className="client-link"
                        >
                          Pasang Sherpa
                        </a>
                      </td>
                      <td>08/08/2009</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/f5b2f2e8-e0f4-4f86-a8bf-7f08e6adc377"
                          className="client-link"
                        >
                          Romit Shrestha
                        </a>
                      </td>
                      <td>22/02/2008</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/f7ed05ce-5d14-4261-84a3-e87f37385b7b"
                          className="client-link"
                        >
                          Prateek Lama
                        </a>
                      </td>
                      <td>14/05/2010</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/f94db7e9-a38a-4d7c-b081-771aa464b571"
                          className="client-link"
                        >
                          Rina Maharjan
                        </a>
                      </td>
                      <td>24/01/2006</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/fb36c5cc-8c8b-4877-834a-8ec271e29c70"
                          className="client-link"
                        >
                          Priyanka Dangol
                        </a>
                      </td>
                      <td>21/08/2009</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/fe7b7082-e08e-4d94-b40b-8113e1798dcd"
                          className="client-link"
                        >
                          Solan Maharjan
                        </a>
                      </td>
                      <td>07/10/2007</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="/students/profile/ff47a35f-03d4-4d1e-86af-ff60ca8430e9"
                          className="client-link"
                        >
                          Kristina Shakya
                        </a>
                      </td>
                      <td>30/11/2006</td>
                      <td>Female</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
