import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

export default function LoginScreen({ location, history }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);
	const submitHandler = (e) => {
		e.preventDefault();
		// DISPATCH LOGIN
		dispatch(login(email, password));
	};

	return (
		<FormContainer>
			<h1>Đăng nhập</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				{/* EMAIL */}
				<Form.Group controlId='email'>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}></Form.Control>
				</Form.Group>
				{/* PASSWORD */}
				<Form.Group controlId='password'>
					<Form.Label>Mật khẩu</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}></Form.Control>
				</Form.Group>

				<Button type='submit' variant='primary'>
					Đăng nhập
				</Button>

				<Row className='py-3'>
					<Col>
						Chưa có tài khoản?{' '}
						<Link
							to={redirect ? `/register?redirect=${redirect}` : '/register'}>
							Đăng ký
						</Link>
					</Col>
				</Row>
			</Form>
		</FormContainer>
	);
}
