import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import {
	productDetailReducer,
	productListReducer,
} from './reducers/productReducers';
import { userLoginReducer } from './reducers/userReducers';

const reducer = combineReducers({
	productList: productListReducer,
	productDetail: productDetailReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: NULL;

const initialState = {
	cart: { cartItems: cartItemsFromStorage },
	userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
