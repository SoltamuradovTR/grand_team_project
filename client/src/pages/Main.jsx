import React from 'react';
import ContainerBox from '../components/DefaultComponents/Container/ContainerBox';
import { useSelector } from 'react-redux';
import { selectRole, selectToken } from '../redux/features/login';
import ContainerBoxAgent from '../components/AgentComponents/ContainerBoxAgent';

function Main(props) {

  const token = useSelector(selectToken);

  const role = useSelector(selectRole);

  if (role === "Agent") {
    return (
      <>
        <ContainerBoxAgent/>
      </>
    );
  } else if (role === "Agent") {
    return (
      <>
      </>
    );
  }

  return (
    <ContainerBox />
  );
}

export default Main;