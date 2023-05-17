import { Row, Col } from "reactstrap";
import Link from "next/link";
import Layout from "~/components/Layout";
import { PagePropsWithUser } from "~/types/PagePropsWithUser";

interface StudentProfileLayoutProps extends PagePropsWithUser {
  children: React.ReactElement | React.ReactElement[];
  studentName: string;
}

const StudentProfileLayout = ({
  children,
  studentName,
  user,
}: StudentProfileLayoutProps) => {
  return (
    <Layout title="Student Profile" user={user}>
      <Row className="border-bottom page-heading py-3">
        <Col sm={4}>
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
              <strong>{studentName}</strong>
            </li>
          </ol>
        </Col>
      </Row>
      <div className="wrapper wrapper-content animated fadeInUp">
        {children}
      </div>
    </Layout>
  );
};

export default StudentProfileLayout;
