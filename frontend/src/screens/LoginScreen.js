import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

export default function LoginScreen({ location, history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const { t } = useTranslation();

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();
    // DISPATCH LOGIN
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>{t('button.signIn')}</h1>
      {error && <Message variant="danger">{t('error')}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        {/* EMAIL */}
        <Form.Group controlId="email">
          <Form.Label>{t('input.email.label')}</Form.Label>
          <Form.Control
            type="email"
            placeholder={t('input.email.placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        {/* PASSWORD */}
        <Form.Group controlId="password">
          <Form.Label>{t('input.password.label')}</Form.Label>
          <Form.Control
            type="password"
            placeholder={t('input.password.placeholder')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          {t('button.signIn')}
        </Button>

        <Row className="py-3">
          <Col>
            {t('newCustomer')}?{' '}
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              {t('button.register')}
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}
