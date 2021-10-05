import MainScreen from "../../components/mainScreen/mainScreen";
import { useEffect } from "react";
import {useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Notes from '../../components/notes/Notes';

//main screen after login, show the user notes and let him to write new, edit and publish notes
function Dashboard(){

    const userLogin = useSelector (state => state.userLogin)
    const {userInfo} = userLogin

    const history = useHistory();

    useEffect(() => {
        if (!userInfo) {

            history.push('/')
        }
    }, [history, userInfo]);

    return (
        <MainScreen title={'Welcome Back ' + userInfo.name}>
            <Notes/>
        </MainScreen>
    );
};

export default Dashboard;