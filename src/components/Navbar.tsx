import React from "react";
import styled from "@emotion/styled";
import logo from "../images/logo.svg";
import { Link as RouterLink } from "react-router-dom";
import { colors } from "../styles/globals";

export default function Navbar() {
  const NavContainer = styled.div({
    display: "flex",
    justifyContent: "space-between",
    height: "10rem",
  });
  const Logo = styled.img({
    position: "relative",
    height: "100%",
  });
  const Nav = styled.nav({
    height: "100%",
    display: "flex",
    gap: "10px",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  });
  const Link = styled(RouterLink)({
    color: colors.primary.dark,
    fontWeight: 400,
    textDecoration: "none",
  });

  const links = [
    { path: "/", name: "Dashboard" },
    { name: "Logs", path: "/logs" },
  ];
  return (
    <React.Fragment>
      <NavContainer>
        <Logo src={logo} />
        <Nav>
          {links.map((link) => (
            <React.Fragment>
              <Link to={link.path}>{link.name}</Link>
            </React.Fragment>
          ))}
        </Nav>
      </NavContainer>
    </React.Fragment>
  );
}
