import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const { loading, product, error } = useSelector((state) => state.productDetail);

  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate
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
          'Content-Type': 'multipart/form-data'
        }
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
        countInStock
      })
    );
  };

  return (
    <>
      <Link to="/admin/productList" className="btn btn-dark my-3">
        {t('button.goBack')}
      </Link>
      <FormContainer>
        <h1>{t('button.edit.product')}</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>{t('input.name.label')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('input.name.placeholder')}
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>{t('input.price.label')}</Form.Label>
              <Form.Control
                type="number"
                placeholder={t('input.price.placeholder')}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>{t('input.image.label')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('input.image.placeholder')}
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label={t('input.image.choose')}
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>{t('input.brand.label')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('input.brand.placeholder')}
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>{t('input.cis.label')}</Form.Label>
              <Form.Control
                type="number"
                placeholder={t('input.cis.placeholder')}
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>{t('input.category.label')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('input.category.placeholder')}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>{t('input.description.label')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('input.description.placeholder')}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              {t('button.update')}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
}
