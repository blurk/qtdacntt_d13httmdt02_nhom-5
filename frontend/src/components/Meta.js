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
	title: 'Tiệm nước hoa 102-Lấy bao nhiêu cũng được',
	description:
		'Nước hoa Việt nam đầu tiên được đông đảo khách hàng tin dùng, hài lòng về chất lượng bởi những mùi hương theo xu hướng nước hoa thế giới, thơm dai, lan toả',
	keywords: 'Nuoc hoa, nuoc hoa, nước hoa, Nước Hoa, nước hoa, nước hoa giá rẻ'
}
