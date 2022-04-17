import React, { useEffect, useState } from 'react';
import {
	Button,
	Card,
	Col,
	Form,
	Image,
	ListGroup,
	Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	createProductReview,
	listProductDetail,
} from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import Rating from '../components/Rating';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import { formatter } from '../utils';

export default function ProductScreen({ match, history }) {
	const [quantity, setQuantity] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	const dispatch = useDispatch();

	const { loading, error, product } = useSelector(
		(state) => state.productDetail
	);

	const {
		success: successProductReivew,
		error: errorProductReview,
	} = useSelector((state) => state.productCreateReivew);

	const { userInfo } = useSelector((state) => state.userLogin);

	useEffect(() => {
		if (successProductReivew) {
			alert('Đánh giá thành công!');
			setRating(0);
			setComment('');
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}
		dispatch(listProductDetail(match.params.id));
	}, [dispatch, match, successProductReivew]);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?quantity=${quantity}`);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			createProductReview(match.params.id, {
				rating,
				comment,
			})
		);
	};

	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				Quay Lại
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
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
										text={`${product.numReviews} reviews`}
									/>
								</ListGroup.Item>
								<ListGroup.Item>
									Đơn giá: {formatter.format(product.price)}
								</ListGroup.Item>
								<ListGroup.Item>
									Mô tả: {product.description}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<Row>
											<Col>Đơn giá: </Col>
											<Col>
												<strong>{formatter.format(product.price)}</strong>
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Trạng thái: </Col>
											<Col>
												{product.countInStock > 0 ? ' Còn hàng ' : 'Đã hết hàng'}
											</Col>
										</Row>
									</ListGroup.Item>
									{/* QUANTITY SELECET */}
									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Số lượng </Col>
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
											Cho vào giỏ hàng
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<h2>Đánh giá</h2>
							{product.reviews.length === 0 && <Message>Chưa có đánh giá</Message>}
							<ListGroup variant='flush'>
								{product.reviews.map((r) => (
									<ListGroup.Item key={r._id}>
										<strong>{r.name}</strong>
										<Rating value={r.rating} />
										<p>{r.createdAt.substring(0, 10)}</p>
										<p>{r.comment}</p>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h2> Viết đánh giá của bạn </h2>
									{errorProductReview && (
										<Message variant='danger'>{errorProductReview}</Message>
									)}
									{userInfo ? (
										<Form onSubmit={submitHandler}>
											<Form.Group controlId='rating'>
												<Form.Label>Đánh giá</Form.Label>
												<Form.Control
													as='select'
													value={rating}
													onChange={(e) => setRating(e.target.value)}>
													<option value=''>Chọn</option>
													<option value='1'>1 - Tệ</option>
													<option value='2'>2 - Ổn</option>
													<option value='3'>3 - Tốt</option>
													<option value='4'>4 - Rất Tốt</option>
													<option value='5'>5- Tuyệt vời </option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId='comment'>
												<Form.Label>Bình luận</Form.Label>
												<Form.Control
													as='textarea'
													row='3'
													value={comment}
													onChange={(e) =>
														setComment(e.target.value)
													}></Form.Control>
											</Form.Group>
											<Button type='submit' variant='primary'>
												Gửi bình luận
											</Button>
										</Form>
									) : (
										<Message>
											Hãy <Link to='/login'>Đăng nhập</Link> để đánh giá
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	);
}
