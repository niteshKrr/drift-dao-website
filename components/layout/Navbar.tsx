import React from "react";
import Link from "next/link";
import { Navbar, Dropdown, Button } from "@nextui-org/react";

const NavbarComponent = () => {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Navbar
        maxWidth="fluid"
        variant="static"
        height="65px"

        css={{
          bgColor: "#170034",
          $$navbarBackgroundColor: "transparent",
          $$navbarBlurBackgroundColor: "transparent"
        }}
      >
        <Navbar.Toggle showIn="xs" />
        <Navbar.Brand>
          <Link href="/">
            <div className="self-center text-2xl sm:text-4xl font-semibold text-pink-800">
              Drift-DAO
            </div>
          </Link>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs" variant="highlight">
          <Link
            href="#home"
            className="lg:text-xl text-base text-gray-200 font-semibold mx-4"
          >
            Home
          </Link>
          <Link
            href="#product"
            className="lg:text-xl text-base text-gray-200 font-semibold mx-4"
          >
            About
          </Link>
          <Link
            href="#team"
            className="lg:text-xl text-base text-gray-200 font-semibold mx-4"
          >
            Our team
          </Link>
          <Link
            href="#contact"
            className="lg:text-xl text-base text-gray-200 font-semibold mx-4"
          >
            Contact us
          </Link>
        </Navbar.Content>
        <Navbar.Content>
          <Button
            auto
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold"
          >
            <div className="px-4 font-bold">Gradient</div>
          </Button>
        </Navbar.Content>
        <Navbar.Collapse>
          <Link href="#contact">Contact us</Link>
          <Link href="#home">Home</Link>
          <Link href="#product">About</Link>
          <Link href="#team">Our team</Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
