import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addNote } from '../../actions/noteActions';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import './formModal.css';

const FormModal = (props) => {

    const dispatch = useDispatch();
    const noteCreate = useSelector (state => state.noteCreate);
    const {loading, error} = noteCreate;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPrivate, setPrivate]= useState(true);
    const [showModal, setShowModal] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        dispatch(addNote(title, content, isPrivate));
        setShowModal(false);
        resetHandler();
    }

    const resetHandler = () => {
        setTitle('');
        setContent('');
        setPrivate(true);
    }

    return (

        <div>

            <div style={{display: 'flex',  height: '40px'}}>

                <Button
                    style={{marginLeft:'10px', borderRadius: '25px'}}
                    onClick={() => setShowModal(true)}
                    className='add-new-note-button'
                >
                    <i className="fas fa-plus"></i>
                    <span className='new-note-button ml-2' >New</span>
                </Button>

            </div>

            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showModal}
                onHide={() => setShowModal(false)}
            >

                <Form autoComplete="off" onSubmit={submitHandler}>

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Add new Note</Modal.Title>
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


export default FormModal;