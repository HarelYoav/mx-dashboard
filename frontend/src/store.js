import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers';
import { noteListReducer, addNewNoteReducer, noteUpdateReducer, noteDeleteReducer, publicNotesReducer } from './reducers/noteReducers';



const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    noteList: noteListReducer,
    noteCreate: addNewNoteReducer,
    noteUpdate: noteUpdateReducer,
    noteDelete: noteDeleteReducer,
    publicNotes: publicNotesReducer,
    userUpdate: userUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const initialState ={
    userLogin: {userInfo: userInfoFromStorage},
};

const middleware =[thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;