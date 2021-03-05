import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';

export default function HomeScreen({ match }) {
	const keyword = match.params.keyword;

	const dispatch = useDispatch();
	const { loading, error, products } = useSelector(
		(state) => state.productList
	);

	useEffect(() => {
		dispatch(listProducts(keyword));
	}, [dispatch, keyword]);
	return (
		<>
			<h1>Lastest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					{products?.map((product) => (
						<Col sm={12} md={6} lg={4} xl={3} key={product._id}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
		</>
	);
}
