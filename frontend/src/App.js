import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import OrderListScreen from './screens/OrderListScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceorderScreen from './screens/PlaceOrderScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterSreen';
import ShippingScreen from './screens/ShippingScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';

function App() {
	return (
		<Router>
			<>
				<Header />
				<main className='py-3'>
					<Container>
						<Route path='/product/:id' component={ProductScreen} />
						<Route path='/cart/:id?' component={CartScreen} />
						<Route path='/order/:id' component={OrderScreen} />
						<Route path='/login' component={LoginScreen} />
						<Route path='/profile' component={ProfileScreen} />
						<Route path='/register' component={RegisterScreen} />
						<Route path='/shipping' component={ShippingScreen} />
						<Route path='/payment' component={PaymentScreen} />
						<Route path='/placeorder' component={PlaceorderScreen} />
						<Route path='/admin/productList' component={ProductListScreen} />
						<Route
							path='/admin/product/:id/edit'
							component={ProductEditScreen}
						/>
						<Route path='/admin/userList' component={UserListScreen} />
						<Route path='/admin/user/:id/edit' component={UserEditScreen} />
						<Route path='/admin/orderList' component={OrderListScreen} />
						<Route path='/' component={HomeScreen} exact />
					</Container>
				</main>
				<Footer />
			</>
		</Router>
	);
}

export default App;
