import { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import { updateNote } from '../../actions/noteActions';

const EditNoteForm = (props) => {

    const dispatch = useDispatch();

    const noteCreate = useSelector (state => state.noteCreate);
    const {loading, error} = noteCreate;

    //state for the current note rhat updated
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPrivate, setPrivate]= useState(true);


    //update the new note after user has edit the note
    const submitHandler = async (e) => {
        e.preventDefault();

        dispatch(updateNote(props.id, title, content, isPrivate));
        resetHandler();
    }

    //reset the form state to get ready to the next one
    const resetHandler = () => {
        setTitle('');
        setContent('');
        setPrivate(true);
    }

    //fill the in the note details
    const fillForm = () => {
        setTitle(props.title);
        setContent(props.content);
    }

    useEffect(() => {
        fillForm()
    },[]);


    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Form autoComplete="off" onSubmit={submitHandler}>

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Edit Your Note</Modal.Title>
                        <Form.Control as="select" style={{width: '100px', margin: '0 auto'}} onChange={(e) => setPrivate(e.target.value)}>
                            <option value={true}>Private</option>
                            <option value={false}>Public</option>
                        </Form.Control>
                    </Modal.Header>

                    <Modal.Body>

                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                required="required"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter Note Content Here"
                                required='required'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>

                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        {loading && <Loading/>}

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>

                    </Modal.Body>
                </Form>
            </Modal>
        </div>
    );
};


export default EditNoteForm;