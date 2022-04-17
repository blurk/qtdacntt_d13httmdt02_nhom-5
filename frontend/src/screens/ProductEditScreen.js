import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProductDetail, updateProduct } from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function ProductEditScreen({ match, history }) {
	const productId = match.params.id;

	const [name, setName] = useState('');
	const [image, setImage] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [description, setDescription] = useState('');
	const [countInStock, setCountInStock] = useState(0);
	const [price, setPrice] = useState(0);
	const [uploading, setUploading] = useState(false);

	const dispatch = useDispatch();

	const { loading, product, error } = useSelector(
		(state) => state.productDetail
	);

	const { userInfo } = useSelector((state) => state.userLogin);

	const {
		loading: loadingUpdate,
		success: successUpdate,
		error: errorUpdate,
	} = useSelector((state) => state.productUpdate);

	useEffect(() => {
		if (!userInfo.isAdmin) {
			history.push('/login');
		}

		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			history.push('/admin/productList');
		} else {
			if (!product.name || product._id !== productId) {
				dispatch(listProductDetail(productId));
			} else {
				setName(product.name);
				setBrand(product.brand);
				setDescription(product.description);
				setImage(product.image);
				setCategory(product.category);
				setCountInStock(product.countInStock);
				setPrice(product.price);
			}
		}
	}, [product, dispatch, productId, history, successUpdate]);

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('image', file);
		setUploading(true);

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};

			const { data } = await axios.post('/api/upload', formData, config);

			setImage(data);
			setUploading(false);
		} catch (error) {
			console.error(error);
			setUploading(false);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateProduct({
				_id: productId,
				name,
				price,
				image,
				brand,
				category,
				description,
				countInStock,
			})
		);
	};

	return (
		<>
			<Link to='/admin/productList' className='btn btn-light my-3'>
				Quay lại
			</Link>
			<FormContainer>
				<h1>Chỉnh sửa sản phẩm</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='name'>
							<Form.Label>Tên</Form.Label>
							<Form.Control
								type='text'
								placeholder='Nhập tên'
								value={name}
								onChange={(e) => setName(e.target.value)}></Form.Control>
						</Form.Group>
						<Form.Group controlId='price'>
							<Form.Label>Giá</Form.Label>
							<Form.Control
								type='number'
								placeholder='Nhập giá'
								value={price}
								onChange={(e) => setPrice(e.target.value)}></Form.Control>
						</Form.Group>

						<Form.Group controlId='image'>
							<Form.Label>Ảnh</Form.Label>
							<Form.Control
								type='text'
								placeholder='Đường dẫn ảnh'
								value={image}
								onChange={(e) => setImage(e.target.value)}></Form.Control>
							<Form.File
								id='image-file'
								label='Choose file'
								custom
								onChange={uploadFileHandler}></Form.File>
							{uploading && <Loader />}
						</Form.Group>

						<Form.Group controlId='brand'>
							<Form.Label>Nhãn hiệu</Form.Label>
							<Form.Control
								type='text'
								placeholder='Nhập nhãn hiệu'
								value={brand}
								onChange={(e) => setBrand(e.target.value)}></Form.Control>
						</Form.Group>

						<Form.Group controlId='countInStock'>
							<Form.Label>Số lượng</Form.Label>
							<Form.Control
								type='number'
								placeholder='Nhập số lượng'
								value={countInStock}
								onChange={(e) =>
									setCountInStock(e.target.value)
								}></Form.Control>
						</Form.Group>

						<Form.Group controlId='category'>
							<Form.Label>Loại</Form.Label>
							<Form.Control
								type='text'
								placeholder='Nhập loại'
								value={category}
								onChange={(e) => setCategory(e.target.value)}></Form.Control>
						</Form.Group>

						<Form.Group controlId='description'>
							<Form.Label>Mô tả</Form.Label>
							<Form.Control
								type='text'
								placeholder='Nhập mô tả'
								value={description}
								onChange={(e) => setDescription(e.target.value)}></Form.Control>
						</Form.Group>
						<Button type='submit' variant='primary'>Cập nhật</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
}
