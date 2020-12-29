import axios from 'axios';
import Link from 'next/link';
import StudentProfileLayout from '@components/PageLayouts/StudentProfileLayout';

const Index = ({ student }) => {
  const {
    id,
    name,
    createdAt,
    updatedAt,
    dateOfBirth,
    gender,
    address,
    email,
    joinDate,
    classRollNo,
    contactNo,
    referenceCode,
    class: studentClass,
    section,
  } = student;
  return (
    <StudentProfileLayout>
      <div className="wrapper wrapper-content animated fadeInUp">
        <div className="row">
          <div className="col-lg-12">
            <div className="ibox">
              <div className="ibox-content">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="m-b-md">
                      <Link href="" href="/student/[id]" as={`/student/${id}`}>
                        <a className="btn btn-white btn-xs float-right">Back</a>
                      </Link>
                      <button
                        className="btn btn-white btn-xs float-right"
                        type="button"
                      >
                        Save
                      </button>
                      <h2>{name}</h2>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="ibox ">
                      <div className="ibox-title">
                        <h5>
                          All form elements{' '}
                          <small>
                            With custom checbox and radion elements.
                          </small>
                        </h5>
                        <div className="ibox-tools">
                          <a className="collapse-link">
                            <i className="fa fa-chevron-up"></i>
                          </a>
                          <a
                            className="dropdown-toggle"
                            data-toggle="dropdown"
                            href="#"
                          >
                            <i className="fa fa-wrench"></i>
                          </a>
                          <ul className="dropdown-menu dropdown-user">
                            <li>
                              <a href="#" className="dropdown-item">
                                Config option 1
                              </a>
                            </li>
                            <li>
                              <a href="#" className="dropdown-item">
                                Config option 2
                              </a>
                            </li>
                          </ul>
                          <a className="close-link">
                            <i className="fa fa-times"></i>
                          </a>
                        </div>
                      </div>
                      <div className="ibox-content">
                        <form method="get">
                          <div className="form-group  row">
                            <label className="col-sm-2 col-form-label">
                              Normal
                            </label>

                            <div className="col-sm-10">
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="hr-line-dashed"></div>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Help text
                            </label>
                            <div className="col-sm-10">
                              <input type="text" className="form-control" />{' '}
                              <span className="form-text m-b-none">
                                A block of help text that breaks onto a new line
                                and may extend beyond one line.
                              </span>
                            </div>
                          </div>
                          <div className="hr-line-dashed"></div>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Password
                            </label>

                            <div className="col-sm-10">
                              <input
                                type="password"
                                className="form-control"
                                name="password"
                              />
                            </div>
                          </div>
                          <div className="hr-line-dashed"></div>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Placeholder
                            </label>

                            <div className="col-sm-10">
                              <input
                                type="text"
                                placeholder="placeholder"
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="hr-line-dashed"></div>
                          <div className="form-group row">
                            <label className="col-lg-2 col-form-label">
                              Disabled
                            </label>

                            <div className="col-lg-10">
                              <input
                                type="text"
                                disabled=""
                                placeholder="Disabled input here..."
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="hr-line-dashed"></div>
                          <div className="form-group row">
                            <label className="col-lg-2 col-form-label">
                              Static control
                            </label>

                            <div className="col-lg-10">
                              <p className="form-control-static">
                                email@example.com
                              </p>
                            </div>
                          </div>
                          <div className="hr-line-dashed"></div>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Checkboxes and radios <br />
                              <small className="text-navy">
                                Normal Bootstrap elements
                              </small>
                            </label>

                            <div className="col-sm-10">
                              <div>
                                <label>
                                  {' '}
                                  <input type="checkbox" value="" /> Option one
                                  is this and that&mdash;be sure to include why
                                  it's great{' '}
                                </label>
                              </div>
                              <div>
                                <label>
                                  {' '}
                                  <input
                                    type="radio"
                                    checked=""
                                    value="option1"
                                    id="optionsRadios1"
                                    name="optionsRadios"
                                  />{' '}
                                  Option one is this and that&mdash;be sure to
                                  include why it's great{' '}
                                </label>
                              </div>
                              <div>
                                <label>
                                  {' '}
                                  <input
                                    type="radio"
                                    value="option2"
                                    id="optionsRadios2"
                                    name="optionsRadios"
                                  />{' '}
                                  Option two can be something else and selecting
                                  it will deselect option one{' '}
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="hr-line-dashed"></div>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Inline checkboxes
                            </label>

                            <div className="col-sm-10">
                              <label>
                                {' '}
                                <input
                                  type="checkbox"
                                  value="option1"
                                  id="inlineCheckbox1"
                                />{' '}
                                a{' '}
                              </label>{' '}
                              <label className="checkbox-inline">
                                <input
                                  type="checkbox"
                                  value="option2"
                                  id="inlineCheckbox2"
                                />{' '}
                                b{' '}
                              </label>{' '}
                              <label>
                                <input
                                  type="checkbox"
                                  value="option3"
                                  id="inlineCheckbox3"
                                />{' '}
                                c{' '}
                              </label>
                            </div>
                          </div>
                          <div className="hr-line-dashed"></div>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Checkboxes &amp; radios <br />
                              <small className="text-navy">
                                Custom elements
                              </small>
                            </label>

                            <div className="col-sm-10">
                              <div className="i-checks">
                                <label>
                                  {' '}
                                  <input
                                    type="checkbox"
                                    value=""
                                  /> <i></i> Option one{' '}
                                </label>
                              </div>
                              <div className="i-checks">
                                <label>
                                  {' '}
                                  <input
                                    type="checkbox"
                                    value=""
                                    checked=""
                                  />{' '}
                                  <i></i> Option two checked{' '}
                                </label>
                              </div>
                              <div className="i-checks">
                                <label>
                                  {' '}
                                  <input
                                    type="checkbox"
                                    value=""
                                    disabled=""
                                    checked=""
                                  />{' '}
                                  <i></i> Option three checked and disabled{' '}
                                </label>
                              </div>
                              <div className="i-checks">
                                <label>
                                  {' '}
                                  <input
                                    type="checkbox"
                                    value=""
                                    disabled=""
                                  />{' '}
                                  <i></i> Option four disabled{' '}
                                </label>
                              </div>
                              <div className="i-checks">
                                <label>
                                  {' '}
                                  <input
                                    type="radio"
                                    value="option1"
                                    name="a"
                                  />{' '}
                                  <i></i> Option one{' '}
                                </label>
                              </div>
                              <div className="i-checks">
                                <label>
                                  {' '}
                                  <input
                                    type="radio"
                                    checked=""
                                    value="option2"
                                    name="a"
                                  />{' '}
                                  <i></i> Option two checked{' '}
                                </label>
                              </div>
                              <div className="i-checks">
                                <label>
                                  {' '}
                                  <input
                                    type="radio"
                                    disabled=""
                                    checked=""
                                    value="option2"
                                  />{' '}
                                  <i></i> Option three checked and disabled{' '}
                                </label>
                              </div>
                              <div className="i-checks">
                                <label>
                                  {' '}
                                  <input
                                    type="radio"
                                    disabled=""
                                    name="a"
                                  />{' '}
                                  <i></i> Option four disabled{' '}
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="hr-line-dashed"></div>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Inline checkboxes
                            </label>

                            <div className="col-sm-10">
                              <label className="checkbox-inline i-checks">
                                {' '}
                                <input type="checkbox" value="option1" />a{' '}
                              </label>
                              <label className="i-checks">
                                {' '}
                                <input type="checkbox" value="option2" /> b{' '}
                              </label>
                              <label className="i-checks">
                                {' '}
                                <input type="checkbox" value="option3" /> c{' '}
                              </label>
                            </div>
                          </div>
                          <div className="hr-line-dashed"></div>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Select
                            </label>

                            <div className="col-sm-10">
                              <select
                                className="form-control m-b"
                                name="account"
                              >
                                <option>option 1</option>
                                <option>option 2</option>
                                <option>option 3</option>
                                <option>option 4</option>
                              </select>

                              <div className="col-lg-4 m-l-n">
                                <select className="form-control" multiple="">
                                  <option>option 1</option>
                                  <option>option 2</option>
                                  <option>option 3</option>
                                  <option>option 4</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="hr-line-dashed"></div>
                          <div className="form-group row has-success">
                            <label className="col-sm-2 col-form-label">
                              Input with success
                            </label>

                            <div className="col-sm-10">
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="hr-line-dashed"></div>
                          <div className="form-group row has-warning">
                            <label className="col-sm-2 col-form-label">
                              Input with warning
                            </label>

                            <div className="col-sm-10">
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="hr-line-dashed"></div>
                          <div className="form-group  row has-error">
                            <label className="col-sm-2 col-form-label">
                              Input with error
                            </label>

                            <div className="col-sm-10">
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="hr-line-dashed"></div>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Control sizing
                            </label>

                            <div className="col-sm-10">
                              <input
                                type="text"
                                placeholder=".form-control-lg"
                                className="form-control form-control-lg m-b"
                              />
                              <input
                                type="text"
                                placeholder="Default input"
                                className="form-control m-b"
                              />
                              <input
                                type="text"
                                placeholder=".form-control-sm"
                                className="form-control form-control-sm"
                              />
                            </div>
                          </div>
                          <div className="hr-line-dashed"></div>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Column sizing
                            </label>

                            <div className="col-sm-10">
                              <div className="row">
                                <div className="col-md-2">
                                  <input
                                    type="text"
                                    placeholder=".col-md-2"
                                    className="form-control"
                                  />
                                </div>
                                <div className="col-md-3">
                                  <input
                                    type="text"
                                    placeholder=".col-md-3"
                                    className="form-control"
                                  />
                                </div>
                                <div className="col-md-4">
                                  <input
                                    type="text"
                                    placeholder=".col-md-4"
                                    className="form-control"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="hr-line-dashed"></div>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Input groups
                            </label>

                            <div className="col-sm-10">
                              <div className="input-group m-b">
                                <div className="input-group-prepend">
                                  <span className="input-group-addon">@</span>
                                </div>
                                <input
                                  type="text"
                                  placeholder="Username"
                                  className="form-control"
                                />
                              </div>
                              <div className="input-group m-b">
                                <input type="text" className="form-control" />
                                <div className="input-group-append">
                                  <span className="input-group-addon">.00</span>
                                </div>
                              </div>
                              <div className="input-group m-b">
                                <div className="input-group-prepend">
                                  <span className="input-group-addon">$</span>
                                </div>
                                <input type="text" className="form-control" />
                                <div className="input-group-append">
                                  <span className="input-group-addon">.00</span>
                                </div>
                              </div>
                              <div className="input-group m-b">
                                <div className="input-group-prepend">
                                  <span className="input-group-addon">
                                    <input type="checkbox" />
                                  </span>
                                </div>
                                <input type="text" className="form-control" />
                              </div>
                              <div className="input-group m-b">
                                <div className="input-group-prepend">
                                  <span className="input-group-addon">
                                    <input type="radio" />
                                  </span>
                                </div>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                          <div className="hr-line-dashed"></div>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Button addons
                            </label>

                            <div className="col-sm-10">
                              <div className="input-group m-b">
                                <span className="input-group-prepend">
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                  >
                                    Go!
                                  </button>{' '}
                                </span>{' '}
                                <input type="text" className="form-control" />
                              </div>
                              <div className="input-group">
                                <input type="text" className="form-control" />{' '}
                                <span className="input-group-append">
                                  {' '}
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                  >
                                    Go!
                                  </button>{' '}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="hr-line-dashed"></div>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              With dropdowns
                            </label>

                            <div className="col-sm-10">
                              <div className="input-group m-b">
                                <div className="input-group-prepend">
                                  <button
                                    data-toggle="dropdown"
                                    className="btn btn-white dropdown-toggle"
                                    type="button"
                                  >
                                    Action{' '}
                                  </button>
                                  <ul className="dropdown-menu">
                                    <li>
                                      <a href="#">Action</a>
                                    </li>
                                    <li>
                                      <a href="#">Another action</a>
                                    </li>
                                    <li>
                                      <a href="#">Something else here</a>
                                    </li>
                                    <li className="dropdown-divider"></li>
                                    <li>
                                      <a href="#">Separated link</a>
                                    </li>
                                  </ul>
                                </div>
                                <input type="text" className="form-control" />
                              </div>
                              <div className="input-group">
                                <input type="text" className="form-control" />

                                <div className="input-group-append">
                                  <button
                                    data-toggle="dropdown"
                                    className="btn btn-white dropdown-toggle"
                                    type="button"
                                  >
                                    Action{' '}
                                  </button>
                                  <ul className="dropdown-menu float-right">
                                    <li>
                                      <a href="#">Action</a>
                                    </li>
                                    <li>
                                      <a href="#">Another action</a>
                                    </li>
                                    <li>
                                      <a href="#">Something else here</a>
                                    </li>
                                    <li className="dropdown-divider"></li>
                                    <li>
                                      <a href="#">Separated link</a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="hr-line-dashed"></div>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Segmented
                            </label>

                            <div className="col-sm-10">
                              <div className="input-group m-b">
                                <div className="input-group-prepend">
                                  <button
                                    tabindex="-1"
                                    className="btn btn-white"
                                    type="button"
                                  >
                                    Action
                                  </button>
                                  <button
                                    data-toggle="dropdown"
                                    className="btn btn-white dropdown-toggle"
                                    type="button"
                                  ></button>
                                  <ul className="dropdown-menu">
                                    <li>
                                      <a href="#">Action</a>
                                    </li>
                                    <li>
                                      <a href="#">Another action</a>
                                    </li>
                                    <li>
                                      <a href="#">Something else here</a>
                                    </li>
                                    <li className="dropdown-divider"></li>
                                    <li>
                                      <a href="#">Separated link</a>
                                    </li>
                                  </ul>
                                </div>
                                <input type="text" className="form-control" />
                              </div>
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <button
                                    tabindex="-1"
                                    className="btn btn-white"
                                    type="button"
                                  >
                                    Action
                                  </button>
                                  <button
                                    data-toggle="dropdown"
                                    className="btn btn-white dropdown-toggle"
                                    type="button"
                                  ></button>
                                  <ul className="dropdown-menu">
                                    <li>
                                      <a href="#">Action</a>
                                    </li>
                                    <li>
                                      <a href="#">Another action</a>
                                    </li>
                                    <li>
                                      <a href="#">Something else here</a>
                                    </li>
                                    <li className="dropdown-divider"></li>
                                    <li>
                                      <a href="#">Separated link</a>
                                    </li>
                                  </ul>
                                </div>
                                <input type="text" className="form-control" />

                                <div className="input-group-append">
                                  <button
                                    tabindex="-1"
                                    className="btn btn-white"
                                    type="button"
                                  >
                                    Action
                                  </button>
                                  <button
                                    data-toggle="dropdown"
                                    className="btn btn-white dropdown-toggle"
                                    type="button"
                                  ></button>
                                  <ul className="dropdown-menu float-right">
                                    <li>
                                      <a href="#">Action</a>
                                    </li>
                                    <li>
                                      <a href="#">Another action</a>
                                    </li>
                                    <li>
                                      <a href="#">Something else here</a>
                                    </li>
                                    <li className="dropdown-divider"></li>
                                    <li>
                                      <a href="#">Separated link</a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="hr-line-dashed"></div>
                          <div className="form-group row">
                            <div className="col-sm-4 col-sm-offset-2">
                              <button
                                className="btn btn-white btn-sm"
                                type="submit"
                              >
                                Cancel
                              </button>
                              <button
                                className="btn btn-primary btn-sm"
                                type="submit"
                              >
                                Save changes
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <dl className="row mb-0">
                      <div className="col-sm-4 text-sm-right">
                        <dt>Email:</dt>
                      </div>
                      <div className="col-sm-8 text-sm-left">
                        <dd className="mb-1">
                          <a href={`mailto:${email}`} className="text-navy">
                            {' '}
                            {email}
                          </a>
                        </dd>
                      </div>
                    </dl>
                    <dl className="row mb-0">
                      <div className="col-sm-4 text-sm-right">
                        <dt>Gender:</dt>
                      </div>
                      <div className="col-sm-8 text-sm-left">
                        <dd className="mb-1">{gender}</dd>
                      </div>
                    </dl>
                    <dl className="row mb-0">
                      <div className="col-sm-4 text-sm-right">
                        <dt>Date Of Birth:</dt>
                      </div>
                      <div className="col-sm-8 text-sm-left">
                        <dd className="mb-1">{dateOfBirth}</dd>
                      </div>
                    </dl>
                    <dl className="row mb-0">
                      <div className="col-sm-4 text-sm-right">
                        <dt>Class:</dt>
                      </div>
                      <div className="col-sm-8 text-sm-left">
                        <dd className="mb-1">{studentClass.name}</dd>
                      </div>
                    </dl>
                    <dl className="row mb-0">
                      <div className="col-sm-4 text-sm-right">
                        <dt>Section:</dt>
                      </div>
                      <div className="col-sm-8 text-sm-left">
                        <dd className="mb-1">{section.name}</dd>
                      </div>
                    </dl>

                    <dl className="row mb-0">
                      <div className="col-sm-4 text-sm-right">
                        <dt>Roll No:</dt>
                      </div>
                      <div className="col-sm-8 text-sm-left">
                        <dd className="mb-1">{classRollNo}</dd>
                      </div>
                    </dl>
                    <dl className="row mb-0">
                      <div className="col-sm-4 text-sm-right">
                        <dt>Address</dt>
                      </div>
                      <div className="col-sm-8 text-sm-left">
                        <dd className="mb-1">{address}</dd>
                      </div>
                    </dl>
                    <dl className="row mb-0">
                      <div className="col-sm-4 text-sm-right">
                        <dt>Contact No.</dt>
                      </div>
                      <div className="col-sm-8 text-sm-left">
                        <dd className="mb-1">{contactNo}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="col-lg-6" id="cluster_info">
                    <dl className="row mb-0">
                      <div className="col-sm-4 text-sm-right">
                        <dt>Joined Date:</dt>
                      </div>
                      <div className="col-sm-8 text-sm-left">
                        <dd className="mb-1">{joinDate}</dd>
                      </div>
                    </dl>
                    <dl className="row mb-0">
                      <div className="col-sm-4 text-sm-right">
                        <dt>Reference Code:</dt>
                      </div>
                      <div className="col-sm-8 text-sm-left">
                        <dd className="mb-1">{referenceCode}</dd>
                      </div>
                    </dl>
                    <dl className="row mb-0">
                      <div className="col-sm-4 text-sm-right">
                        <dt>Created:</dt>
                      </div>
                      <div className="col-sm-8 text-sm-left">
                        <dd className="mb-1">{createdAt}</dd>
                      </div>
                    </dl>
                    <dl className="row mb-0">
                      <div className="col-sm-4 text-sm-right">
                        <dt>Updated:</dt>
                      </div>
                      <div className="col-sm-8 text-sm-left">
                        <dd className="mb-1">{updatedAt}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <dl className="row mb-0">
                      <div className="col-sm-2 text-sm-right">
                        <dt>Attendance:</dt>
                      </div>
                      <div className="col-sm-10 text-sm-left">
                        <dd>
                          <div className="progress m-b-1">
                            <div
                              style={{ width: '90%' }}
                              className="progress-bar progress-bar-striped progress-bar-animated"
                            ></div>
                          </div>
                          <small>
                            Attendance of student is <strong>90%</strong>.
                          </small>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentProfileLayout>
  );
};

export async function getServerSideProps({ req, query }) {
  const { id } = query;
  const { baseUrl } = req;

  // REVISIT: fetcher should be provided by context +1
  const res = await axios({
    url: `${baseUrl}/api/student/${id}`,
    method: 'get',
    headers: req ? { cookie: req.headers.cookie } : undefined,
  });

  return {
    props: {
      student: res.data,
    },
  };
}

export default Index;
