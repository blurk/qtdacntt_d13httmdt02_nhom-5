import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Rating from '../components/Rating'
import { formatter } from '../utils'

export default function Product({ product }) {
	const { t } = useTranslation()
	return (
		<Card className='my-3 p-3 rounded'>
			<Link to={`/product/${product._id}`}>
				<Card.Img src={product.image} variant='top' />
			</Link>

			<Card.Body>
				<Link to={`/product/${product._id}`}>
					<Card.Title as='div'>
						<strong>{product.name}</strong>
					</Card.Title>
				</Link>
				<Card.Text as='div'>
					<Rating
						value={Number(product?.rating ?? 0)}
						text={`${product.numReviews} ${t('review.reviews')}`}
					/>
				</Card.Text>

				<Card.Text as='h5'>{formatter.format(product.price)}</Card.Text>
			</Card.Body>
		</Card>
	)
}
