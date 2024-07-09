import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { getEmail, getImageUrl, getName } from "../utils";
import { useNavigate } from "react-router-dom";

export function DefaultNavbar() {
  const navigate = useNavigate();
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <img
          src="/logo.jpg"
          className="mr-3 h-6 sm:h-9 rounded-md"
          alt="AMS Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          AMS
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              className="border rounded-full"
              alt="User settings"
              img={localStorage.getItem("@user") ? getImageUrl() : null}
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{getName()}</span>
            <span className="block truncate text-sm font-medium">
              {getEmail()}
            </span>
          </Dropdown.Header>
          {/* <Dropdown.Divider /> */}
          <Dropdown.Item
            onClick={() => {
              navigate("/applyleave");
            }}
          >
            Apply Leave
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Sign out
          </Dropdown.Item>
        </Dropdown>
      </div>
    </Navbar>
  );
}
