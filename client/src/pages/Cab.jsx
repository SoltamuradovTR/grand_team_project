import React from 'react';
import {useSelector} from "react-redux";
import {selectRole} from "../redux/features/login";
import AgentCab from "../components/AgentComponents/AgentCab";
import ClientCab from "../components/ClientComponents/ClientCab";

function Cab() {
    const role = useSelector(selectRole)

    if (role === 'Agent') {
        return (
            <>
            <AgentCab/>
            </>
        );
    } else if(role === 'Client') {
        return (
            <>
                <ClientCab/>
            </>
        );

    }


}

export default Cab;