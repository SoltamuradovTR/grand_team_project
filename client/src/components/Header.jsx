import React from "react";
import HeaderBox from "./DefaultComponents/Header/HeaderBox";
import { useSelector } from "react-redux";
import { selectRole, selectToken } from "../redux/features/login";
import HeaderBoxAgent from "./AgentComponents/HeaderBoxAgent";
import HeaderBoxClient from "./ClientComponents/HeaderBoxClient";

function Header(props) {
  const token = useSelector(selectToken);

  const role = useSelector(selectRole);

  if (role === "Agent") {
    return (
      <>
        <HeaderBoxAgent />
      </>
    );
  } else if (role === "Client") {
    return (
      <>
        <HeaderBoxClient />
      </>
    );
  }

  return (
    <>
      <HeaderBox />
    </>
  );
}

export default Header;
