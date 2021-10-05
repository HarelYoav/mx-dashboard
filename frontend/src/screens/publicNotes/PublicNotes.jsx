import MainScreen from "../../components/mainScreen/mainScreen";
import { useEffect } from "react";
import {useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CardNote from "../../components/CardNote";
import { publicNotesList } from '../../actions/noteActions';
import {Row} from 'react-bootstrap';
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";


function PublicNotes(){

    const dispatch = useDispatch();
    const history = useHistory();

    const userLogin = useSelector (state => state.userLogin);
    const publicNotes = useSelector(state => state.publicNotes);

    const {userInfo} = userLogin
    const {notes, error, loading} = publicNotes;


    useEffect(() => {
        if (!userInfo) {

            history.push('/')
        }
        dispatch(publicNotesList());
    }, [history, userInfo]);


    return (

        <MainScreen title='See all public notes...'>

            <div className='m-auto' >
                {loading && <Loading/>}
                {error && <ErrorMessage variang='danger'>{error}</ErrorMessage>}
                {notes?.reverse().map(note => (
                    <Row key={note.note._id}>
                    <CardNote

                        name={note.user.name}
                        title={note.note.title}
                        content={note.note.content}
                        date={note.note.createdAt}
                        img={note.user.pic}
                    />
                   </Row>
                ))}
            </div>

        </MainScreen>
    );
}

export default PublicNotes;