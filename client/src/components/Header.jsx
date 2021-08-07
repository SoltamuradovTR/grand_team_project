import React from 'react';
import HeaderBox from './DefaultComponents/Header/HeaderBox';
import { useSelector } from 'react-redux';
import { selectRole, selectToken } from '../redux/features/login';
import HeaderBoxAgent from './AgentComponents/HeaderBoxAgent';

function Header(props) {

  const token = useSelector(selectToken)

  const role = useSelector(selectRole)

  if (role === 'Agent') {
    return (
      <>
      <HeaderBoxAgent/>
      </>
    )
  } else {
    if (role === 'Agent') {

    }
  }
  return (
    <>
      <HeaderBox />
    </>
  );
}

export default Header;