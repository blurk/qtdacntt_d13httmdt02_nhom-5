import React, { useEffect } from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { listTopProduct } from '../actions/productActions'
import { formatter } from '../utils'
import Loader from './Loader'
import Message from './Message'

export default function ProductCarousel() {
	const dispatch = useDispatch()
	const { t } = useTranslation()

	const { loading, error, products } = useSelector(
		(state) => state.producTopRated
	)

	useEffect(() => {
		dispatch(listTopProduct())
	}, [dispatch])

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{t('error')}</Message>
	) : (
		<Carousel pause='hover' className='bg-primary'>
			{products.map((p) => (
				<Carousel.Item key={p._id}>
					<Link to={`/product/${p._id}`}>
						<Image src={p.image} alt={p.name} fluid />
						<Carousel.Caption className='carousel-caption'>
							<h2>
								{p.name} <br /> {formatter.format(p.price)}
							</h2>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	)
}
