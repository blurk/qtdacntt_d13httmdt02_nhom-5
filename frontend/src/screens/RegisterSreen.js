import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

export default function RegisterScreen({ location, history }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [name, setName] = useState('');
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	const userRegister = useSelector((state) => state.userRegister);
	const { loading, userInfo, error } = userRegister;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);
	const submitHandler = (e) => {
		e.preventDefault();
		// DISPATCH REGISTER
		if (password !== confirmPassword) {
			setMessage('Password not match');
		} else {
			dispatch(register(name, email, password));
		}
	};

	return (
		<FormContainer>
			<h1>Sign Up</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{message && <Message variant='danger'>{message}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				{/* EMAIL */}
				<Form.Group controlId='email'>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type='email'
						placeholder='Nhập Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}></Form.Control>
				</Form.Group>
				{/*NAME*/}
				<Form.Group controlId='name'>
					<Form.Label>Tên</Form.Label>
					<Form.Control
						type='name'
						placeholder='Nhập tên'
						value={name}
						onChange={(e) => setName(e.target.value)}></Form.Control>
				</Form.Group>
				{/* PASSWORD */}
				<Form.Group controlId='password'>
					<Form.Label>Mật khẩu</Form.Label>
					<Form.Control
						type='password'
						placeholder='Nhập mật khẩu'
						value={password}
						onChange={(e) => setPassword(e.target.value)}></Form.Control>
				</Form.Group>
				{/* CONFIRM PASSWORD */}
				<Form.Group controlId='confirmPassword'>
					<Form.Label>Nhập lại mật khẩu</Form.Label>
					<Form.Control
						type='password'
						placeholder='Nhập lại mật khẩu'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
				</Form.Group>

				<Button type='submit' variant='primary'>
					Đăng ký
				</Button>

				<Row className='py-3'>
					<Col>
						Đã có tài khoản?{' '}
						<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
							Đăng nhập
						</Link>
					</Col>
				</Row>
			</Form>
		</FormContainer>
	);
}
