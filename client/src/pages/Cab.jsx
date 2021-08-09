import React from 'react';
import {useSelector} from "react-redux";
import {selectRole} from "../redux/features/login";
import AgentCab from "../components/AgentComponents/AgentCab";

function Cab() {
    const role = useSelector(selectRole)

    if (role === 'Agent') {
        return (
            <>
            <AgentCab/>
            </>
        );
    }


}

export default Cab;