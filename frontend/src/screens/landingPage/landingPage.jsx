import { Button, Container} from "react-bootstrap";
import Logo from "../../components/logo";
import './landingPage.css'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { loginFacebook, loginGoogle } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { useEffect } from 'react';
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { logout } from "../../actions/userActions";

//first page before login, user can login, register or use google or facebook to sign in
function LandingPage(){

    const dispatch = useDispatch();
    const userLogin = useSelector (state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    const history = useHistory();

    useEffect(() => {
        if (userInfo) {
            if(userInfo.message) {
                console.log(userInfo.message);
                dispatch(logout())
            } else {
                history.push('/dashboard')
            }
        }
    },[history, userInfo]);


    const googleLogin = async (googleData) => {
        dispatch(loginGoogle(googleData.tokenId));
    };

    const  responseFacebook= async (facebookData) => {
        const {name, email, id} = facebookData;
        dispatch(loginFacebook(email, name, id));
    };

    return (

        <div className="centered main">
            <Container>

                <div className='logo'>
                    <Logo/>
                </div>

                <div className='landingText'>
                    <p className="lead">Don't waste your time, Sign in to enjoy our dashBoard</p>
                </div>

                {/* Social buttons - Login with google and facebook */}
                <div className="buttonContainer">

                    <div className="buttonContainer">
                        <a href='/login'>
                            <Button className='landingbutton' variant='outline-dark' size='lg'>Login</Button>
                        </a>
                        <a href='/register'>
                            <Button className='landingbutton' variant='outline-dark' size='lg'>Signup</Button>
                        </a>
                    </div>

                </div>

                {/* Or sentence */}
                <div className="or-content">
                    OR
                </div>

                    {loading && <Loading/>}
                    {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}

                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        render={ (renderProps) => (
                        <button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            className='btnGoogle social-button'
                        >
                            <i className="fa fa-google" style={{ marginLeft:
                            '5px' }}/>
                            <span>&nbsp;&nbsp;Login with Google</span>
                        </button>
                        )}
                        onSuccess={googleLogin}
                        onFailure={err => console.log('fail', err)}
                    />

                    <FacebookLogin
                        appId={process.env.REACT_APP_FB_CLIENT_ID}
                        autoLoad={false}
                        fields="name,email,picture,id"
                        cssClass='btnFacebook social-button'
                        icon='fa-facebook'
                        textButton = "&nbsp;&nbsp;Login with Facebook"
                        callback={responseFacebook}
                    />

            </Container>
        </div>

    );
};

export default LandingPage;