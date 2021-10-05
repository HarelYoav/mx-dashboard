import Footer from "./components/footer";
import Header from "./components/header";
import LandingPage from "./screens/landingPage/landingPage";
import {BrowserRouter, Route} from 'react-router-dom';
import Dashboard from "./screens/dashboard/dashboard";
import LoginPage from './screens/LoginPage/loginPage';
import RegisterPage from "./screens/RegisterPage/registerPage";
import PublicNotes from "./screens/publicNotes/PublicNotes";
import ProfilePage from "./screens/profilePage/profilePage";

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <main>
        <Route path='/' component={LandingPage} exact/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/login' component={LoginPage}/>
        <Route path='/register' component={RegisterPage}/>
        <Route path='/public-notes' component={PublicNotes}/>
        <Route path='/profile' component={ProfilePage}/>
      </main>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
