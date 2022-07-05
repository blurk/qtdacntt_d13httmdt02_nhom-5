import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'

import {
	deliverOrder,
	getOrderDetails,
	payOrder
} from '../actions/orderActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { CART_RESET } from '../constants/cartConstants'
import {
	ORDER_DELIVER_RESET,
	ORDER_PAY_RESET
} from '../constants/orderConstants'
import { formatDate, formatter } from '../utils'
import { useRef } from 'react'

export default function OrderScreen({ match, history }) {
	const orderId = match.params.id

	const [sdkReady, setSdkReady] = useState(false)

	const dispatch = useDispatch()
	const { t, i18n } = useTranslation()

	const { order, loading, error } = useSelector((state) => state.orderDetails)

	const { userInfo } = useSelector((state) => state.userLogin)

	const { loading: loadingPay, success: successPay } = useSelector(
		(state) => state.orderPay
	)

	const { loading: loadingDeliver, success: successDeliver } = useSelector(
		(state) => state.orderDeliver
	)

	useEffect(() => {
		if (!userInfo) {
			history.push('/login')
		}

		const addPayPalScript = async () => {
			const { data: clientId } = await axios.get('/api/config/paypal')
			const script = document.createElement('script')
			script.type = 'text/javascript'
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
			script.async = true
			script.onload = () => {
				setSdkReady(true)
			}

			document.body.appendChild(script)
		}

		if (!order || successPay || successDeliver || order._id !== orderId) {
			dispatch({ type: ORDER_PAY_RESET })
			dispatch({ type: ORDER_DELIVER_RESET })
			dispatch({ type: CART_RESET })
			dispatch(getOrderDetails(orderId))
		} else if (!order.isPaid) {
			if (!window.paypal) {
				addPayPalScript()
			} else {
				setSdkReady(true)
			}
		}
	}, [dispatch, orderId, successPay, order, successDeliver, userInfo, history])

	const successPaymentHandler = (paymentResult) => {
		dispatch(payOrder(orderId, paymentResult))
	}

	const ref = useRef(null)

	const deliverHandler = (e) => {
		e.preventDefault()

		emailjs
			.sendForm(
				'service_iektkj4',
				'template_v5yjmdz',
				ref.current,
				'user_ePY8mJF51VXT3OrkOwMlx'
			)
			.then(
				(result) => {
					dispatch(deliverOrder(order))
				},
				(error) => {}
			)
	}

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{t('error')}</Message>
	) : (
		<>
			<h1>{t('order')}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>{t('shipping')}</h2>
							<p>
								<strong>{t('input.name.label')}: </strong>
								{order.user.name}
							</p>
							<p>
								<strong>{t('input.email.label')}: </strong>
								<a href={`mailto:${order.user.email}`}> {order.user.email}</a>
							</p>
							<p>
								<strong>{t('input.address.label')}: </strong>
								{order.shippingAddress.address},{order.shippingAddress.city},
								{order.shippingAddress.postalCode},
								{order.shippingAddress.country},
							</p>
							{order.isDelivered ? (
								<Message variant='success'>
									{t('deliveredOn')}&nbsp;
									{formatDate(order.deliveredAt, i18n.language)}
								</Message>
							) : (
								<Message variant='danger'>{t('notDelivered')}</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>{t('paymentMethod')}</h2>
							<p>
								<strong>{t('method')}: </strong>
								{order.paymentMethod === 'cod' ? t('cod') : t('paypal')}
							</p>
							{order.isPaid ? (
								<Message variant='success'>
									{t('paidOn')} {formatDate(order.paidAt, i18n.language)}
								</Message>
							) : (
								<Message variant='danger'>{t('notPaid')}</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>{t('orderItems')}: </h2>
							{order.orderItems.length === 0 ? (
								<Message>{t('orderItemsEmpty')}</Message>
							) : (
								<ListGroup variant='flush'>
									{order.orderItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={4}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col md={1}>
													<Link
														to={`/products/${item.product}`}
														className='text-info'
														style={{ textDecoration: 'underline' }}>
														{item.name}
													</Link>
												</Col>
												<Col md={6}>
													{item.quantity} x {formatter.format(item.price)} =
													&nbsp;{formatter.format(item.quantity * item.price)}
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
								<h2>{t('orderSummary')}</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>{t('items')}</Col>
									<Col>{formatter.format(order?.itemsPrice)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>{t('shipping')}</Col>
									<Col>{formatter.format(order.shippingPrice)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>{t('tax')}</Col>
									<Col>{formatter.format(order.taxPrice)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>{t('total')}</Col>
									<Col>{formatter.format(order.totalPrice)}</Col>
								</Row>
							</ListGroup.Item>
							{!order.isPaid && (
								<ListGroup.Item>
									{loadingPay && <Loader />}
									{order.paymentMethod === 'cod' ? (
										<Button disabled>{t('cod')}</Button>
									) : !sdkReady ? (
										<Loader />
									) : (
										<PayPalButton
											amount={(order.totalPrice / 21000).toFixed(2)}
											onSuccess={successPaymentHandler}
										/>
									)}
								</ListGroup.Item>
							)}

							{loadingDeliver && <Loader />}
							{userInfo &&
								userInfo.isAdmin &&
								order.isPaid &&
								!order.isDelivered && (
									<>
										<hr />
										<ListGroup.Item>
											<Form ref={ref} onSubmit={deliverHandler}>
												<Form.Group className='mb-3' controlId='formBasicEmail'>
													<Form.Label>{t('emailCustomer')}</Form.Label>
													<Form.Control
														type='email'
														placeholder={t('input.email.placeholder')}
														name='to_email'
														className='mb-2 bg-primary text-light'
														required
													/>
													<Form.Label className='mt-2'>
														{t('templateLink')}
													</Form.Label>
													<Form.Control
														type='text'
														name='message'
														className='mb-2 bg-primary text-light'
														placeholder='https://example.com'
														required
													/>
													<Form.Label className='mt-2'>
														{t('input.name.label')}
													</Form.Label>
													<Form.Control
														type='text'
														name='to_name'
														className='mb-2 bg-primary text-light'
														value={order.user.name}
														readOnly
													/>
													<Button
														type='submit'
														className='btn btn-block mt-2 btn-success'>
														{t('button.markAsDelivered')}
													</Button>
												</Form.Group>
											</Form>
										</ListGroup.Item>
									</>
								)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}
