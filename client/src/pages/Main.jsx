import React from "react";
import ContainerBox from "../components/DefaultComponents/Container/ContainerBox";
import { useSelector } from "react-redux";
import { selectRole, selectToken } from "../redux/features/login";
import ContainerBoxAgent from "../components/AgentComponents/ContainerBoxAgent";
import ContainerBoxClient from "../components/ClientComponents/ContainerBoxClient";

function Main(props) {
  const token = useSelector(selectToken);

  const role = useSelector(selectRole);

  if (role === "Agent") {
    return (
      <>
        <ContainerBoxAgent />
      </>
    );
  } else if (role === "Client") {
    return (
      <>
        <ContainerBoxClient />
      </>
    );
  }

  return <ContainerBox />;
}

export default Main;
