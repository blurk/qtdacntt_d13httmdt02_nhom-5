import { useTranslation } from 'react-i18next'
import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import Paginate from '../components/Paginate'
import Product from '../components/Product'
import ProductCarousel from '../components/ProductCarousel'

export default function HomeScreen({ match }) {
	const { t } = useTranslation()
	const keyword = match.params.keyword

	const pageNumber = match.params.pageNumber || 1

	const dispatch = useDispatch()
	const { loading, error, products, page, pages } = useSelector(
		(state) => state.productList
	)

	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber))
	}, [dispatch, keyword, pageNumber])

	return (
		<>
			<Meta />
			{!keyword ? (
				<ProductCarousel />
			) : (
				<Link to='/' className='btn btn-light'>
					{t('button.goBack')}
				</Link>
			)}
			<h1>{t('latestProducts')}</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{t('error')}</Message>
			) : (
				<>
					<Row>
						{products?.map((product) => (
							<Col sm={12} md={6} lg={4} xl={3} key={product._id}>
								<Product product={product} />
							</Col>
						))}
					</Row>
					<Paginate
						pages={pages}
						page={page}
						keyword={keyword ? keyword : ''}
					/>
				</>
			)}
		</>
	)
}
