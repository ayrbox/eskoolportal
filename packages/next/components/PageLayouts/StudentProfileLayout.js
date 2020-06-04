import Link from "next/link";
import Layout from "../../components/Layout";

const StudentProfileLayout = ({ children }) => {
  return (
    <Layout>
      <div className="row border-bottom">
        <nav
          className="navbar navbar-static-top  "
          role="navigation"
          style={{ marginBottom: 0 }}
        >
          <div className="navbar-header">
            <a
              className="navbar-minimalize minimalize-styl-2 btn btn-primary "
              href="#"
            >
              <i className="fa fa-bars"></i> Search Icon
            </a>
            <form
              role="search"
              className="navbar-form-custom"
              action="search_results.html"
            >
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Search for something..."
                  className="form-control"
                  name="top-search"
                  id="top-search"
                />
              </div>
            </form>
          </div>
        </nav>
      </div>
      <div className="row wrapper border-bottom white-bg page-heading">
        <div className="col-sm-4">
          <h2>Student Profile</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/" as="/">
                <a>Home</a>
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/students" as="/students">
                <a>Students</a>
              </Link>
            </li>
            <li className="breadcrumb-item active">
              <strong>student name</strong>
            </li>
          </ol>
        </div>
      </div>
      <div className="wrapper wrapper-content animated fadeInUp">
        {children}
      </div>
    </Layout>
  );
};

export default StudentProfileLayout;
