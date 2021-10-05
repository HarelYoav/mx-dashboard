import {Form, Button} from 'react-bootstrap';
import '../LoginPage/loginPage.css';
import Logo from "../../components/logo";
import {useState, useEffect} from 'react';
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage';
import {register} from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';


function RegisterPage() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pic, setPic] = useState();
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const userRegister = useSelector (state => state.userRegister);
    const {loading, error, userInfo} = userRegister;

    const history = useHistory();


    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords Do not Much!')
        } else {
            dispatch(register(name, email, password, pic));
        }
    };


    //upload user profile picture to cloudinary and save to his data base the picture url
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
    }


    useEffect(() => {
        if (userInfo) {

            history.push('/dashboard');
        }
    },[history, userInfo]);


    return (
        <div className='login-page centered'>

            {/* LOGO */}
            <div className="form-logo">
                <Logo/>
            </div>

            <h4>SIGNUP</h4>

            {/* Form to login - enter email and password */}
            <Form onSubmit={submitHandler}>

                <Form.Group size='lg' className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        required="required"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group size='lg' className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        required="required"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group size='lg' className="mb-3" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        required="required"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        required="required"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="pic">
                    <Form.Label>Profile Picture (Optional)</Form.Label>
                    <Form.File
                        onChange={(e) => postDetails(e.target.files[0])}
                        id="custom-file"
                        type="file"
                        accept="image/*"
                        label="Upload Profile Picture"
                        custom
                    />
                </Form.Group>
                <Button className='m-auto' variant="primary" type="submit">SIGNUP</Button>

                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {message && <ErrorMessage variant="warning">{message}</ErrorMessage>}
                {loading && <Loading/> }

            </Form>

        </div>
    )



}

export default RegisterPage;