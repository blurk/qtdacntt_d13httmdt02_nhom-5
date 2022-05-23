import React, { useEffect } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useTranslation } from 'react-i18next';
import { createProduct, deletePrtoduct, listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import { formatter } from '../utils';

export default function ProductListScreen({ history, match }) {
  const pageNumber = match.params.pageNumber || 1;

  const { t } = useTranslation();

  const { loading, error, products, page, pages } = useSelector((state) => state.productList);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete
  } = useSelector((state) => state.productDelete);

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct
  } = useSelector((state) => state.productCreate);

  const { userInfo } = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      // DELETE PRODUCT
      dispatch(deletePrtoduct(id));
    }
  };

  const createProductHandler = () => {
    // CREATE PRODUCT
    dispatch(createProduct());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>{t('header.admin.products')}</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> {t('button.create.product')}
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{t('error')}</Message>
      ) : (
        <>
          <Table responsive striped hover bordered className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>{t('input.name.label')}</th>
                <th>{t('input.price.label')}</th>
                <th>{t('input.category.label')}</th>
                <th>{t('input.brand.label')}</th>
                <th>{t('button.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{formatter.format(product.price)}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={userInfo?.isAdmin} />
        </>
      )}
    </>
  );
}
