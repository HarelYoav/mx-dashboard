import { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom';
import {Card, Button, Col, Row, Form} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {userUpdateProfile} from '../../actions/userActions';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from "../../components/Loading";

function ProfilePage(){

    const dispatch = useDispatch();

    const [pic, setPic] = useState();

    const userLogin = useSelector (state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading, error } = userUpdate;

    const history = useHistory();


    const postDetails = (profilePic) => {
        const data = new FormData();
        data.append('file', profilePic)
        data.append('upload_preset','MX-DashBoard')
        data.append('cloud_name','dlqy64rey')
        fetch('https://api.cloudinary.com/v1_1/dlqy64rey/image/upload',
            {
                method: 'post',
                body: data,
        })
        .then((res) => res.json())
        .then((data) => {
            setPic(data.url.toString());
        })
        .catch((err) => {
            throw new Error('Error while upload picture \n' + err );
        });
    };


    const submitHandler = async (e) => {

        e.preventDefault();
        dispatch(userUpdateProfile(userInfo.email, pic));

    };


    useEffect(() => {
        if (!userInfo) {
            history.push('/')
        }

        setPic(userInfo.pic);

    }, [history, userInfo]);


    return (
        <div>
            <Row className="justify-content-md-center" style={{margin:'30px'}}>
                <Col lg={6}>
                <Form onSubmit={submitHandler}>
                    <Card className="text-center mx-auto" style={{ maxWidth: '590px', borderRadius: '25px'}}>
                        <Card.Header style={{borderRadius: '25px'}}>
                            <div>
                                <Card.Img variant="top" src={pic}  style={{borderRadius: '100%', width: '400px', height: '400px'}}/>
                                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                                {loading && <Loading/>}
                            </div>

                            <div className='pic-edit-button' >
                                <label htmlFor="fileUpload">
                                    <div style={{backgroundColor: '#343a40', color: 'white', borderRadius: '25px', padding: '5px', marginTop: '8px'}}>
                                        <i className="fas fa-pencil-alt"></i>
                                        <span className='pic-edit-button' style={{marginLeft: '5px'}}>Edit Photo</span>
                                    </div>
                                </label>
                                <input hidden id="fileUpload" type="file" accept="image/*" onChange={(e) => postDetails(e.target.files[0])} />
                            </div>


                        </Card.Header>
                        <Card.Body>
                            <Card.Title>Your Name: {userInfo.name}</Card.Title>
                            <Card.Text>
                                Email: {userInfo.email}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer style={{borderRadius: '25px'}} className="text-muted">Member Since - {userInfo.createdAt.substring(0,10)}</Card.Footer>
                    </Card>
                    <div style={{textAlign: 'center'}}>
                        <Button
                            variant='dark'
                            style={{borderRadius: '25px', margin: '10px'}}
                            type='submit'
                        >
                            <i class="far fa-save"></i>
                            <span style={{marginLeft: '5px'}}>Save Changes</span>
                        </Button>
                    </div>

                </Form>
            </Col>
            </Row>
        </div>

    );

};

export default ProfilePage;