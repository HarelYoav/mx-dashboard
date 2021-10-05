import { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import './Notes.css'
import { useSelector, useDispatch } from 'react-redux';
import { userNoteList, deleteNote } from '../../actions/noteActions';
import FormModal from '../formModal/formModal';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import EditNoteForm from '../editNoteForm/EditNoteForm';


const Notes = () => {

    const dispatch = useDispatch();

    const noteList = useSelector (state => state.noteList);
    const createNote = useSelector (state => state.noteCreate);
    const noteUpdate = useSelector (state => state.noteUpdate);
    const noteDelete = useSelector (state => state.noteDelete);
    const [noteToEdit, setNoteToEdit] = useState()
    const [showModal, setShowModal] = useState(false);

    const {notes, loading, error} = noteList;
    const { note } = createNote;
    const updatedNote = noteUpdate.note;
    const deletedNote = noteDelete.note;


    //handle deletion of note
    function deleteHandler(id){
        if(window.confirm('Are you sure?')){

           dispatch(deleteNote(id));
        }
    };


    //open pop up modal with the note to edit information
    const editNote = (target) => {
        const id = target;
        console.log(target);
        notes.forEach(note => {
            if (id === note._id) {
                setNoteToEdit(note);
                setShowModal(true);
            }
        })
    }

    //close the modal of edit note
    const closeModal = () => {
        setShowModal(false);
        setNoteToEdit();
    }


    useEffect(() => {
        dispatch(userNoteList());
        setShowModal(false);
        if (!showModal) {
            setNoteToEdit();
        }
    }, [dispatch, note, updatedNote, deletedNote]);


    return (
            <div className="notes-component-div">

                <FormModal/>

                {noteToEdit &&  <EditNoteForm id={noteToEdit._id} title={noteToEdit.title} content={noteToEdit.content} show = {showModal}
                        onHide={() => closeModal()}/>}
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loading/>}

                { notes?.map( note => (
                    <Accordion defaultActiveKey="1" key={note._id} style={{backgroundColor: 'white'}}>
                        <Card className='card-note' >

                            {/* CARD header - press on to pen accordion */}
                            <Card.Header style={{display: 'flex'}}>

                                <span
                                    style={{
                                        color:'black',
                                        textDecoration: 'none',
                                        flex: 1,
                                        cursor: 'pointer',
                                        alignSelf: 'center',
                                        fontSize: 18,
                                    }}
                                >
                                    <Accordion.Toggle as ={Card.Text} variant='link' eventKey='0'>
                                      <strong>{note.title}</strong>
                                    </Accordion.Toggle>
                                </span>

                                {/* Delete and Edit Button on each Note */}
                                {note._id &&
                                    <div>
                                        <Button
                                            id={note._id}
                                            onClick={(e) => editNote(e.target.id)}
                                            variant='dark'
                                            style={{borderRadius: '25px'}}
                                        >
                                            <i id={note._id} className="fas fa-pencil-alt"></i>
                                            <span id={note._id} className='note-edit-button' style={{marginLeft: '5px'}}>Edit</span>
                                        </Button>

                                        <Button
                                            id={note._id}
                                            style={{borderRadius: '25px'}}
                                            variant='danger'
                                            className='ml-2'
                                            onClick={(e) => deleteHandler(e.target.value)}
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                            <span className="note-delete-button" style={{marginLeft: '5px'}}>Delete</span>
                                        </Button>
                                    </div>
                                }

                            </Card.Header>

                                    {/* CARD Body can collapse and open */}
                            <Accordion.Collapse eventKey='0'>
                                <Card.Body>
                                    <blockquote className="blockquote mb-0">
                                        <p>{note.content}</p>

                                        <div className='d-flex'>
                                            <footer className="blockquote-footer">

                                            Created on - {note.createdAt.substring(0,10)}

                                            <h4 className="ml-auto">
                                                <Badge variant='warning' style={{color:'black'}}>
                                                    {/* Check if note is private or public  */}
                                                    {note.isPrivate ?
                                                        <div><i className="fas fa-user-shield"></i> Private</div>
                                                        :
                                                        <div><i className="fas fa-globe-asia"></i> Public</div>
                                                    }
                                                </Badge>
                                            </h4>

                                            </footer>
                                        </div>

                                    </blockquote>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                ))}

            </div>
    );

};

export default Notes;





