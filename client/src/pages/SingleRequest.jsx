import React from "react";
import ClientRequest from "../components/ClientComponents/ClientRequest";
import { useSelector } from "react-redux";
import { selectRole } from "../redux/features/login";
import AgentRequest from "../components/AgentComponents/AgentRequest";
import DefaultRequest from "../components/DefaultComponents/Container/DefaultRequest";

function SingleRequest() {
  const role = useSelector(selectRole);

  if (role === "Agent") {
    return (
      <>
        <AgentRequest />
      </>
    );
  }
  if (role === "Client") {
    return (
      <>
        <ClientRequest />
      </>
    );
  } else {
    return (
      <>
        <DefaultRequest />
      </>
    );
  }
}

export default SingleRequest;
