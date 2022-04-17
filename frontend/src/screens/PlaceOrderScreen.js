import React, { useEffect } from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createdOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import { USER_DETAILS_RESET } from '../constants/userConstants';
import { formatter } from '../utils';

export default function PlaceorderScreen({ history }) {
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	cart.itemsPrice = cart.cartItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);

	cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;
	cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2));
	cart.totalPrice = (
		+cart.itemsPrice +
		+cart.shippingPrice +
		+cart.taxPrice
	).toFixed(2);

	const orderCreate = useSelector((state) => state.orderCreate);
	const { order, success, error } = orderCreate;

	useEffect(() => {
		if (success) {
			history.push(`/order/${order._id}`);
			dispatch({ type: USER_DETAILS_RESET });
			dispatch({ type: ORDER_CREATE_RESET });
		}
		// eslint-disable-next-line
	}, [history, success]);

	const placeOderHandler = () => {
		dispatch(
			createdOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			})
		);
	};

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Địa chỉ: </strong>
								{cart.shippingAddress.address},{cart.shippingAddress.city},
								{cart.shippingAddress.postalCode},{cart.shippingAddress.country}
								,
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Hình thức thanh toán</h2>
							<strong>Hình thức: </strong>
							{cart.paymentMethod}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Sản phẩm đã đặt: </h2>
							{cart.cartItems.length === 0 ? (
								<Message>Giỏ hàng trống</Message>
							) : (
								<ListGroup variant='flush'>
									{cart.cartItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/products/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.quantity} x {formatter.format(item.price)} =
													{formatter.format(item.quantity * item.price)}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Thông tin đơn hàng</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Sản phẩm</Col>
									<Col>{formatter.format(cart.itemsPrice)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>{formatter.format(cart.shippingPrice)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Thuế</Col>
									<Col>{formatter.format(cart.taxPrice)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tổng cộng</Col>
									<Col>{formatter.format(cart.totalPrice)}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								{error && <Message variant='danger'>{error}</Message>}
							</ListGroup.Item>

							<ListGroup.Item>
								<Button
									type='button'
									className='btn-block'
									disabled={cart.cartItems.length === 0}
									onClick={placeOderHandler}>
									Đặt hàng
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
}
