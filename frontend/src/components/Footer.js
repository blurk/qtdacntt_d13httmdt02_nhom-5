import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export default function Footer() {
	return (
		<footer>
			<Container>
				<Row>
					<Col className='text-center py-3'>Bản quyền thuộc &copy; bon</Col>
				</Row>
			</Container>
		</footer>
	)
}
