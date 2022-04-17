import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';

export default function PaymentScreen({ history }) {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress) {
		history.push('/shipping');
	}

	const [paymentMethod, setPaymentMethod] = useState('paypal');

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push('/placeorder');
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Hình thức thanh toán</h1>
			<Form.Group>
				<Form.Label as='legend'>Chọn</Form.Label>
				<Col>
					{/* <Form.Check
						type='radio'
						label='Paypal hoặc Thẻ tín dụng'
						id='paypal'
						name='paymentMethod'
						value='paypal'
						checked
						onChange={(e) => setPaymentMethod(e.target.value)}
					/> */}
					<Form.Check
						type='radio'
						label='Thanh toán khi nhận hàng(COD)'
						id='cod'
						name='paymentMethod'
						value='cod'
						onChange={(e) => setPaymentMethod(e.target.value)}
					/>
				</Col>
			</Form.Group>
			<Form onSubmit={submitHandler}>
				<Button type='submit' variant='primary'>
					Tiếp tục
				</Button>
			</Form>
		</FormContainer>
	);
}
