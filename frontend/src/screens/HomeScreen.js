import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import products from '../products';
export default function HomeScreen() {
	return (
		<>
			<h1>Lastest Products</h1>
			<Row>
				{products.map((product) => (
					<Col sm={12} md={6} lg={4} xl={3} key={product._id}>
						<Product product={product} />
					</Col>
				))}
			</Row>
		</>
	);
}