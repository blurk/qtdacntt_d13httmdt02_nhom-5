import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

export default function RegisterScreen({ location, history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState(null);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    // DISPATCH REGISTER
    if (password !== confirmPassword) {
      setMessage('Password not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>{t('button.signUp')}</h1>
      {error && <Message variant="danger">{t('error')}</Message>}
      {message && <Message variant="info">{message}</Message>}
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
        {/*NAME*/}
        <Form.Group controlId="name">
          <Form.Label>{t('input.name.label')}</Form.Label>
          <Form.Control
            type="name"
            placeholder={t('input.name.placeholder')}
            value={name}
            onChange={(e) => setName(e.target.value)}></Form.Control>
        </Form.Group>
        {/* PASSWORD */}
        <Form.Group controlId="password">
          <Form.Label>{t('input.password.placeholder')}</Form.Label>
          <Form.Control
            type="password"
            placeholder={t('input.password.placeholder')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        {/* CONFIRM PASSWORD */}
        <Form.Group controlId="confirmPassword">
          <Form.Label>{t('input.confirmPassword.label')}</Form.Label>
          <Form.Control
            type="password"
            placeholder={t('input.confirmPassword.placeholder')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          {t('button.register')}
        </Button>

        <Row className="py-3">
          <Col>
            {t('haveAnAccount')}?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              {t('button.signIn')}
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}
