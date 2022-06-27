import React from 'react'
import { Helmet } from 'react-helmet'

export default function Meta({ title, description, keywords }) {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={description} />
			<meta name='keywords' content={keywords} />
		</Helmet>
	)
}

Meta.defaultProps = {
	title: `Welcome to ${process.env.REACT_APP_SHOP_NAME}`,
	description: 'Chung toi ban template',
	keywords: 'template, website, free template'
}
