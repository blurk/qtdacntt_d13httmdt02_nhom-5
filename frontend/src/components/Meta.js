import React from 'react';
import { Helmet } from 'react-helmet';

export default function Meta({ title, description, keywords }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
}

Meta.defaultProps = {
  title: 'Welcome to Proshop',
  description: 'Chung toi ban do cong nghe gia re',
  keywords: 'Do cong nghe, ban do cong nghe, do cong nghe gia re'
};
