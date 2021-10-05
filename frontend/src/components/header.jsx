import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import {Navbar, Nav, NavDropdown, Container} from 'react-bootstrap';

//header is the nav bar in the app
function Header(){

    const history = useHistory();
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;


    const logoutHandler = () => {
        dispatch(logout())
        history.push('/');
    }

    return (
            <Navbar bg="dark" expand="lg" sticky="top">
                <Container>

                    <Navbar.Brand>
                        <Nav.Link href='/' style={{color: 'white'}}>
                            <h3 style={{fontFamily: 'Ephesis cursive'}}>MX-DashBoard</h3>
                        </Nav.Link>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                    {/* if userInfo has value render the user name as a dropdon in the navbar
                        if the userInfo dosent has value, render a link to login */}
                    {userInfo ?
                    <Nav className="ml-auto">

                        <Nav.Link href="/dashboard" style={{color: 'white'}}>
                            <i className="fas fa-house-user"></i>
                            &nbsp;DashBoard
                        </Nav.Link>

                        <Nav.Link href="/public-notes" style={{color: 'white'}}>
                            <i className="far fa-sticky-note"></i>
                            &nbsp;Public Notes
                        </Nav.Link>

                        <NavDropdown
                            title=
                                {
                                    <span style={{color: 'white', fontSize: '1rem'}}>
                                        <i className="fas fa-user"></i>
                                    </span>
                                }
                            id="basic-nav-dropdown"
                        >

                            <NavDropdown.Item href='/profile' style={{paddingLeft: '10px', paddingRight: '20px'}}>
                                <div className='d-flex'>

                                    <div>
                                        <img
                                            style={{width: '30px', height: '30px', borderRadius: '100px', marginRight: '10px'}}
                                            src={userInfo.pic}
                                            alt='user'
                                        />
                                    </div>

                                    <div>
                                        <p style={{margin: 'auto'}}>see your profile</p>
                                    </div>

                                </div>
                            </NavDropdown.Item>

                            <NavDropdown.Item
                                onClick={logoutHandler}
                                style={{paddingLeft: '10px', paddingRight: '20px'}}
                            >
                                <div style={{display: 'flex'}}>
                                    <div
                                        style={{
                                            borderRadius: '100px',
                                            border: '1px solid black',
                                            width: '30px',
                                            height: '30px',
                                            marginRight: '10px'
                                        }}
                                    >
                                        <i className="fas fa-sign-out-alt" style={{margin: '7px'}} ></i>
                                    </div>
                                    <div>
                                        <p style={{margin: 'auto'}}>Logout</p>
                                    </div>
                                </div>
                            </NavDropdown.Item>

                        </NavDropdown>

                    </Nav>
                    :
                    <Nav.Link href="/login" className="ml-auto">Login</Nav.Link>
                    }

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
}

export default Header