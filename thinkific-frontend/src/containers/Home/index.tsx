import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {rootState} from "../../states/types";

function HomePage(props: any) {
    const authentication = useSelector<rootState, any>(state => state.authentication);

    useEffect(() => {
        if (authentication && authentication.get('loggedIn')) {
            props.history.push('/weather');
        } else
            props.history.push('/login');
    });


    return (<></>);
}

export default HomePage;
