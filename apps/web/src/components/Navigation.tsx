import { User } from "next-auth";
import Link from "next/link";
import React, { FC, useState, ReactNode } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Img } from "react-image";

interface NavigationProps {
  user: User;
}

const ProfileDropdownItem = ({
  href,
}: {
  href: string;
  children: ReactNode;
}) => (
  <li>
    <Link href={href}>Test</Link>
  </li>
);

const UserAvatar = (props: { name: string }) => {
  const [firstName, lastName] = props.name.split(" ");

  return (
    <div className="d-flex justify-content-center">
      <div className="bg-light p-3 border border-dark rounded-circle">
        <strong>
          {firstName.charAt(0)}
          {lastName ? lastName.charAt(0) : ""}
        </strong>
      </div>
    </div>
  );
};

type NavigationLinkType = {
  id: string;
  label: string;
  url: string;
  children?: NavigationLinkType[];
};

const navigationLinks: NavigationLinkType[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    url: "/",
  },
  {
    id: "student-list",
    label: "Students",
    url: "/students",
  },
  {
    id: "marks",
    label: "Marks",
    url: "#",
    children: [
      {
        id: "marks-entry-page",
        label: "Marks Entry",
        url: "/marks/entry",
      },
      {
        id: "marks-evaluation-page",
        label: "Marks Evaluation",
        url: "/marks/evaluation",
      },
    ],
  },
  {
    id: "settings-list",
    label: "Settings",
    url: "#",
    children: [
      {
        label: "Fiscal Years",
        url: "/settings/fiscalyears",
        id: "settings-fiscal-year",
      },
      { label: "Subjects", url: "/settings/subjects", id: "settings-subjects" },
      { label: "Events", url: "/settings/events", id: "settings-events" },
      { label: "Exams", url: "/settings/exams", id: "settings-exams" },
    ],
  },
];

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
              {image ? (
                <Img
                  alt="User Profile Image"
                  className="rounded-circle"
                  src={image as string}
                  loader={<UserAvatar name={name as string} />}
                  unloader={<UserAvatar name={name as string} />}
                />
              ) : (
                <UserAvatar name={name as string} />
              )}
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
                <DropdownMenu tag="ul">
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
              </Dropdown>
            </div>
            <div className="logo-element">IN+</div>
          </li>

          {navigationLinks.map(({ id, label, url, children }) => (
            <li className="w-100" key={id}>
              <Link href={url} key={label}>
                <i className="fa fa-th-large"></i>
                <span className="nav-label">{label}</span>
              </Link>
              {children && children.length && (
                <ul className="nav nav-second-level collapse show">
                  {children.map((childLink) => (
                    <li className="w-100" key={childLink.id}>
                      <Link href={childLink.url}>
                        <i className="fa fa-th-large"></i>
                        <span className="nav-label">{childLink.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
