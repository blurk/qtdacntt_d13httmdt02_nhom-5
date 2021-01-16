import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

export default function ProfileScreen({ location, history }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [name, setName] = useState('');
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, user, error } = userDetails;

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			if (!user.name) {
				dispatch(getUserDetails('profile'));
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [history, userInfo, dispatch, user]);
	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Password not match');
		} else {
			//DISPATCH UPDATE PROFILE
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{error && <Message variant='danger'>{error}</Message>}
				{message && <Message variant='danger'>{message}</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					{/* EMAIL */}
					<Form.Group controlId='email'>
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}></Form.Control>
					</Form.Group>
					{/*NAME*/}
					<Form.Group controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='name'
							placeholder='Enter name'
							value={name}
							onChange={(e) => setName(e.target.value)}></Form.Control>
					</Form.Group>
					{/* PASSWORD */}
					<Form.Group controlId='password'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Enter password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}></Form.Control>
					</Form.Group>
					{/* CONFIRM PASSWORD */}
					<Form.Group controlId='confirmPassword'>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Re-enter password'
							value={confirmPassword}
							onChange={(e) =>
								setConfirmPassword(e.target.value)
							}></Form.Control>
					</Form.Group>

					<Button type='submit' variant='primary'>
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
			</Col>
		</Row>
	);
}
