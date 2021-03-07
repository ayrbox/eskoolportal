import Navigation from './Navigation';
import Link from 'next/link';
import { FaSignOutAlt, FaSearch } from 'react-icons/fa';
import { Container, Row, Col } from 'reactstrap';
import { FunctionComponent, ReactElement } from 'react';
import { User } from 'next-auth';
import Head from 'next/head';

interface LayoutProps {
  children: ReactElement | ReactElement[];
  title: string;
  user: User;
}

const Layout: FunctionComponent<LayoutProps> = ({
  children,
  title,
  user,
}: LayoutProps) => (
  <>
    <Head>
      <title>{title && `${title} | `} eskoolPortal</title>
    </Head>
    <div className="d-flex">
      <Navigation user={user} />
      <Container fluid className="gray-bg d-flex flex-column min-vh-100">
        <Row>
          <Col className="border-bottom" xs={12}>
            <nav className="navbar navbar-static-top" role="navigation">
              <h2 className="ml-3">{title}</h2>
              <ul className="nav navbar-top-links navbar-right">
                <li>
                  <Link href="#">
                    <span className="mr-3">
                      <FaSearch />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/logout">
                    <span>
                      <FaSignOutAlt /> Log out
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
          </Col>
        </Row>
        <Row className="bg-white h-100">
          <Col xs={12}>{children}</Col>
        </Row>
      </Container>
    </div>
  </>
);

export default Layout;
