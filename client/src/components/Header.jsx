import React from 'react';
import HeaderBox from './DefaultComponents/Header/HeaderBox';
import { useSelector } from 'react-redux';
import { selectRole, selectToken } from '../redux/features/login';

function Header(props) {

  const token = useSelector(selectToken)

  const role = useSelector(selectRole)

  if (!token) {
    return (
      <>
        <HeaderBox />
      </>
    )
  } else {
    if (role === 'Agent') {

    }
  }
  return (
<div></div>
  );
}

export default Header;