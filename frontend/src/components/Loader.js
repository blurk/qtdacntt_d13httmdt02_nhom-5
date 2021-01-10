import React from 'react';
import { Spinner } from 'react-bootstrap';
export default function Loader() {
	const style = {
		width: '100px',
		height: '100px',
		margin: 'auto',
		display: 'block',
	};
	return (
		<Spinner animation='border ' role='status' style={style}>
			<span className='sr-only'>Loading...</span>
		</Spinner>
	);
}
