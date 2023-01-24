import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { Navbar, Dropdown, Button } from "@nextui-org/react";

const NavbarComponent = () => {

  const router = useRouter();
  const onBoardDAO = () => {
    router.push('/onBoardDAO');
  };

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
            onClick={onBoardDAO}
            auto
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold"
          >
            <div className="px-3 font-bold">Onboard DAO 🚀🔥</div>
          </Button>
        </Navbar.Content>
        <Navbar.Collapse style={{color:"white"}}>
          <div className="my-4">
            <Link href="#home">Home</Link>
          </div>
          <div className="my-4">
            <Link href="#product">About</Link>
          </div>
          <div className="my-4">
            <Link href="#team">Our team</Link>
          </div>
          <div className="my-4">
            <Link href="#contact">Contact us</Link>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
