import { Form, Button} from 'react-bootstrap';
import './loginPage.css';
import './bootstrap-social.css';
import Logo from "../../components/logo";
import { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions';


function LoginPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userLogin = useSelector (state => state.userLogin)
    const {loading, error, userInfo} = userLogin


    useEffect(() => {
        if (userInfo) {

            history.push('/dashboard')
        }
    },[history, userInfo]);



    const submitHandler = async (e) => {
        e.preventDefault();

        dispatch(login(email, password));
    }

    return (
        <div className='login-page centered'>

            {/* LOGO */}
            <div className="form-logo">
                <Logo/>
            </div>

            <h4>LOGIN</h4>

            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading/> }



            {/* Form to login - enter email and password */}
            <Form onSubmit={submitHandler}>

                <Form.Group size='lg' className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        required="required"
                        value={email}
                        onChange={(email) => setEmail(email.target.value)}

                    />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group size='lg' className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        required="required"
                        value={password}
                        onChange={(password) => setPassword(password.target.value)}

                    />
                </Form.Group>

                <Button className='m-auto btn btn-outline-light' type="submit">LOGIN</Button>

            </Form>

            <div className="no-account">
                <p>Don't have an account yet?</p>
                <a className='signUp' href="/register">SIGN UP</a>
            </div>

        </div>
    );
};

export default LoginPage;