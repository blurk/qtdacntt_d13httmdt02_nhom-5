import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">{t('copyright')} &copy; Proshop</Col>
        </Row>
      </Container>
    </footer>
  );
}
