import { User } from 'next-auth';
import Link from 'next/link';
import { FC, useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Img } from 'react-image';

interface NavigationProps {
  user: User;
}

const ProfileDropdownItem = ({ href, children }) => (
  <li>
    <Link href={href}>
      <a>{children}</a>
    </Link>
  </li>
);

const UserAvatar = (props) => {
  const [firstName, lastName] = props.name.split(' ');

  return (
    <div className="d-flex justify-content-center">
      <div className="bg-light p-3 border border-dark rounded-circle">
        <strong>
          {firstName.charAt(0)}
          {lastName ? lastName.charAt(0) : ''}
        </strong>
      </div>
    </div>
  );
};

const Navigation: FC<NavigationProps> = ({ user }) => {
  const { name, email, image } = user;

  const [isOpen, setOpen] = useState(false);

  const handleToggle = () => setOpen((prev) => !prev);

  return (
    <nav className="navbar-default navbar-static-side" role="navigation">
      <div className="sidebar-collapse">
        <ul className="nav">
          <li className="nav-header">
            <div className="dropdown profile-element">
              <Img
                alt="User Profile Image"
                className="rounded-circle"
                src={image}
                loader={<UserAvatar name={name} />}
                unloader={<UserAvatar name={name} />}
              />
              <Dropdown isOpen={isOpen} toggle={handleToggle}>
                <DropdownToggle caret tag="a">
                  <span className="block m-t-xs font-bold text-center">
                    {name}
                  </span>
                  <span className="text-muted text-xs block text-center">
                    {email}
                    <b className="caret"></b>
                  </span>
                </DropdownToggle>
                {process.browser && (
                  <DropdownMenu>
                    <DropdownItem
                      tag={ProfileDropdownItem}
                      href="/account/profile"
                    >
                      Profile
                    </DropdownItem>
                    <DropdownItem
                      tag={ProfileDropdownItem}
                      href="/account/settings"
                    >
                      Settings
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem tag={ProfileDropdownItem} href="/logout">
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </Dropdown>
            </div>
            <div className="logo-element">IN+</div>
          </li>

          <li className="w-100">
            <Link href="/">
              <a>
                <i className="fa fa-th-large"></i>
                <span className="nav-label">Dashboards</span>
              </a>
            </Link>
          </li>
          <li className="w-100">
            <Link href="/students">
              <a>
                <i className="fa fa-th-large"></i>
                <span className="nav-label">Students</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
