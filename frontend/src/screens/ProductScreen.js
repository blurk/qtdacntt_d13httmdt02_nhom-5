import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
	createProductReview,
	listProductDetail
} from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import Rating from '../components/Rating'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import { formatDate, formatter } from '../utils'

export default function ProductScreen({ match, history }) {
	const [quantity, setQuantity] = useState(1)
	const [rating, setRating] = useState(0)
	const [comment, setComment] = useState('')

	const dispatch = useDispatch()

	const { t, i18n } = useTranslation()

	const { loading, error, product } = useSelector(
		(state) => state.productDetail
	)

	const { success: successProductReivew, error: errorProductReview } =
		useSelector((state) => state.productCreateReivew)

	const { userInfo } = useSelector((state) => state.userLogin)

	useEffect(() => {
		if (successProductReivew) {
			alert('Review Subbmitted!')
			setRating(0)
			setComment('')
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
		}
		dispatch(listProductDetail(match.params.id))
	}, [dispatch, match, successProductReivew])

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?quantity=${quantity}`)
	}

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			createProductReview(match.params.id, {
				rating,
				comment
			})
		)
	}

	return (
		<>
			<Link className='btn btn-dark my-3' to='/'>
				{t('button.goBack')}
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{t('error')}</Message>
			) : (
				<>
					<Meta title={product.name} description={product.description} />
					<Row>
						<Col md={6}>
							<Image src={product.image} alt={product.name} fluid />
						</Col>
						<Col md={3}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h3>{product.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										value={+product.rating}
										text={`${product.numReviews} ${t('review.reviews')}`}
									/>
								</ListGroup.Item>
								<ListGroup.Item>
									{t('price')}: {formatter.format(product.price)}
								</ListGroup.Item>
								<ListGroup.Item>
									{t('description')}: {product.description}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<Row>
											<Col>{t('price')}: </Col>
											<Col>
												<strong>{formatter.format(product.price)}</strong>
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>{t('status')}: </Col>
											<Col>
												{product.countInStock > 0
													? t('stock.in')
													: t('stock.out')}
											</Col>
										</Row>
									</ListGroup.Item>
									{/* QUANTITY SELECET */}
									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>{t('quantity')}</Col>
												<Col>
													<Form.Control
														as='select'
														value={quantity}
														onChange={(e) => setQuantity(e.target.value)}>
														{[...Array(product.countInStock).keys()].map(
															(k) => (
																<option key={k + 1} value={k + 1}>
																	{k + 1}
																</option>
															)
														)}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}
									<ListGroup.Item>
										<Button
											onClick={addToCartHandler}
											className='btn-block'
											type='button'
											disabled={!product.countInStock}>
											{t('button.addToCart')}
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<h2 className='text-uppercase mt-5'>{t('review.reviews')}</h2>
							{product.reviews.length === 0 && (
								<Message>{t('review.no')}</Message>
							)}
							<ListGroup variant='flush'>
								{product.reviews.map((r) => (
									<ListGroup.Item key={r._id}>
										<strong>{r.name}</strong>
										<Rating value={r.rating} />
										<p>{formatDate(r.createdAt, i18n.language)}</p>
										<p>{r.comment}</p>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h2>{t('review.write')}</h2>
									{errorProductReview && (
										<Message variant='danger'>
											{t('productAlreadyReview')}
										</Message>
									)}
									{userInfo ? (
										<Form onSubmit={submitHandler}>
											<Form.Group controlId='rating'>
												<Form.Label>{t('review.rating')}</Form.Label>
												<Form.Control
													required
													as='select'
													value={rating}
													onChange={(e) => setRating(e.target.value)}>
													<option value=''>{t('review.select.label')}</option>
													<option value='1'>1 - {t('review.select.1')}</option>
													<option value='2'>2 - {t('review.select.2')}</option>
													<option value='3'>3 - {t('review.select.3')}</option>
													<option value='4'>4 - {t('review.select.4')}</option>
													<option value='5'>5 - {t('review.select.5')}</option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId='comment'>
												<Form.Label>{t('review.comment')}</Form.Label>
												<Form.Control
													required
													as='textarea'
													row='3'
													value={comment}
													onChange={(e) =>
														setComment(e.target.value)
													}></Form.Control>
											</Form.Group>
											<Button type='submit' variant='primary'>
												{t('button.submit')}
											</Button>
										</Form>
									) : (
										<Message>
											{t('review.message.p1')}{' '}
											<Link to='/login'> {t('button.signIn')}</Link>{' '}
											{t('review.message.p2')}
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	)
}
