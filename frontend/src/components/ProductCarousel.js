import React, { useEffect } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listTopProduct } from '../actions/productActions';
import Loader from './Loader';
import Message from './Message';

export default function ProductCarousel() {
	const dispatch = useDispatch();

	const { loading, error, products } = useSelector(
		(state) => state.producTopRated
	);

	useEffect(() => {
		dispatch(listTopProduct());
	}, [dispatch]);

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<Carousel pause='hover' className='bg-dark'>
			{products.map((p) => (
				<Carousel.Item key={p._id}>
					<Link to={`/product/${p._id}`}>
						<Image src={p.image} alt={p.name} fluid />
						<Carousel.Caption className='carousel-caption'>
							<h2>
								{p.name} ({p.price}₫)
							</h2>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	);
}
