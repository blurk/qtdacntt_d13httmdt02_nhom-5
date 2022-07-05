const products = [
	{
		rating: '4',
		numReviews: 1,
		price: 200000,
		countInStock: 1000,
		name: 'Template bán đồ uống',
		image:
			'https://images-wixmp-530a50041672c69d335ba4cf.wixmp.com/templates/image/b9c06865f3659efc970035931e25af7d0fc7869e1f0a58218f0e7465fb895cc41652803282805.jpg/v1/fill/w_1076%2Ch_606%2Cq_90%2Cusm_0.60_1.00_0.01/b9c06865f3659efc970035931e25af7d0fc7869e1f0a58218f0e7465fb895cc41652803282805.webp',
		description:
			'Thương hiệu của bạn mới mẻ và năng động, và sự hiện diện trực tuyến của bạn cũng phải giống nhau. Với các hiệu ứng di chuột tương tác, nền sáng và bố cục hiện đại, mẫu này rất thú vị. ',
		brand: 'wix',
		category: 'e-commerce'
	},
	{
		rating: '2',
		numReviews: 1,
		price: 350000,
		countInStock: 100,
		name: 'Công ty AI',
		image:
			'https://images-wixmp-530a50041672c69d335ba4cf.wixmp.com/templates/image/3b2a97a89809eaf8ef1d0260365ec60296730f21c3f65e0026b4e884a0c1c7701622022079679.jpg/v1/fill/w_1076%2Ch_606%2Cq_90%2Cusm_0.60_1.00_0.01/3b2a97a89809eaf8ef1d0260365ec60296730f21c3f65e0026b4e884a0c1c7701622022079679.webp',
		description:
			'Tính thẩm mỹ có tầm nhìn xa của mẫu này là ở đây để cung cấp cái nhìn về tương lai. Thiết kế tinh vi cho phép sản phẩm của bạn tỏa sáng, trong khi ứng dụng Wix Forms đóng vai trò là công cụ hoàn hảo để tuyển dụng nhân tài hàng đầu và mời những người đam mê công nghệ đăng ký nhận các bản cập nhật của công ty. Nhấp vào “Chỉnh sửa” để ngồi vào ghế lái xe.',
		brand: 'wix',
		category: 'company'
	},
	{
		rating: '5',
		numReviews: 1,
		price: 320000,
		countInStock: 150,
		name: 'Nhà hàng Nhật',
		image:
			'https://images-wixmp-530a50041672c69d335ba4cf.wixmp.com/templates/image/eb4468a0d22374f0742589221341ea76ee1ddf7ae02b4e3eab8bc567adaba1291652357403039.jpg/v1/fill/w_1076%2Ch_606%2Cq_90%2Cusm_0.60_1.00_0.01/eb4468a0d22374f0742589221341ea76ee1ddf7ae02b4e3eab8bc567adaba1291652357403039.webp',
		description:
			'Một mẫu mới cho thực phẩm tươi ngon. Thiết kế đơn giản, cổ điển này là khung hoàn hảo cho ẩm thực của bạn. Tích hợp liền mạch với các ứng dụng Thực đơn, Đặt hàng và Đặt chỗ của Wix cho phép khách hàng của bạn dễ dàng chọn món ăn yêu thích, đặt hàng hoặc đặt bàn ngay từ trang web của bạn. Hãy sẵn sàng để làm hài lòng thực khách với sự hiện diện trực tuyến trang nhã. Nhấp vào "Chỉnh sửa" để bắt đầu.',
		brand: 'wix',
		category: 'restaurant'
	},
	{
		rating: '0',
		numReviews: 0,
		price: 470000,
		countInStock: 100,
		name: 'Fitnesso',
		image:
			'https://assets-global.website-files.com/5e593fb060cf877cf875dd1f/5e9ccdee1b847f8b97567aee_5e871798a0b7b03beb5eeb10_Gallery%25201.png',
		brand: 'webflow',
		category: 'e-commerce',
		description:
			'Fitensso là một giải pháp Thương mại điện tử tuyệt vời cho bất kỳ huấn luyện viên thể dục nào muốn bán gói cao cấp của họ trực tuyến, lên lịch cuộc gọi hoặc thu thập email với các lớp học và tài nguyên miễn phí.'
	},
	{
		rating: '0',
		numReviews: 0,
		price: 370000,
		countInStock: 100,
		name: 'Pompeo',
		image:
			'https://assets-global.website-files.com/5e593fb060cf877cf875dd1f/5eb1ca606ed3920c95587906_Image-Gallery-1.jpg',
		brand: 'webflow',
		category: 'e-commerce',
		description:
			'Pompeo là một mẫu Thương mại điện tử Webflow Gốm sứ - mẫu này độc đáo, gọn gàng và đơn giản. Đây là một giải pháp web lý tưởng cho các lớp học gốm hiện đại, xưởng gốm, cửa hàng gốm sứ, cửa hàng đồ gốm và các sự kiện.'
	},
	{
		rating: '0',
		numReviews: 0,
		price: 680000,
		countInStock: 101,
		name: 'Công ty Game',
		image:
			'https://images-wixmp-530a50041672c69d335ba4cf.wixmp.com/templates/image/f64b27167c5debc3aca4c7fec0bf5c699bb113c5a3bef2706d400f0df60282551627989849994.jpg/v1/fill/w_1076%2Ch_606%2Cq_90%2Cusm_0.60_1.00_0.01/f64b27167c5debc3aca4c7fec0bf5c699bb113c5a3bef2706d400f0df60282551627989849994.webp',
		brand: 'wix',
		category: 'company',
		description:
			'Thể hiện thẩm mỹ đặc trưng của công ty bạn với mẫu vui nhộn, đầy màu sắc này. '
	},
	{
		rating: '0',
		numReviews: 0,
		price: 180000,
		countInStock: 101,
		name: 'Photographer',
		image:
			'https://images-wixmp-530a50041672c69d335ba4cf.wixmp.com/templates/image/33182debef315b11800dc6f1f4cb303bf2baf24de03ddcc342276d73812d02261623238418718.jpg/v1/fill/w_1076%2Ch_606%2Cq_90%2Cusm_0.60_1.00_0.01/33182debef315b11800dc6f1f4cb303bf2baf24de03ddcc342276d73812d02261623238418718.webp',
		brand: 'wix',
		category: 'portfolio',
		description:
			'Sử dụng mẫu trang nhã và tối giản này để chia sẻ tác phẩm tuyệt đẹp của bạn với thế giới. Sắp xếp hình ảnh của bạn thành các phòng trưng bày độc đáo, tùy chỉnh danh mục đầu tư của bạn và thêm thông tin chi tiết về công việc và tầm nhìn nghệ thuật của bạn.'
	},
	{
		rating: '0',
		numReviews: 0,
		price: 310000,
		countInStock: 100,
		name: 'Công ty xây dựng',
		image:
			'https://images-wixmp-530a50041672c69d335ba4cf.wixmp.com/templates/image/2c1c9d6532aa6602a9d161dee53accf4d66beef2ad7874835eaebea0b810eaea1595331247135.jpg/v1/fill/w_1076%2Ch_606%2Cq_90%2Cusm_0.60_1.00_0.01/2c1c9d6532aa6602a9d161dee53accf4d66beef2ad7874835eaebea0b810eaea1595331247135.webp',
		brand: 'wix',
		category: 'company',
		description:
			'Xây dựng một trang web ấn tượng như các công trình xây dựng của bạn với mẫu công ty xây dựng chuyên nghiệp và hấp dẫn này. Với một khu vực để quảng bá dịch vụ của bạn và các trang danh mục đầu tư hấp dẫn, đây là mẫu trang web hoàn hảo cho bất kỳ ai muốn giới thiệu các dự án của họ và thu hút khách hàng.'
	},
	{
		rating: '0',
		numReviews: 0,
		price: 400000,
		countInStock: 100,
		name: 'Modeling Agency',
		image:
			'https://images-wixmp-530a50041672c69d335ba4cf.wixmp.com/templates/image/3bb108fceab832e783c4cb89ac388fd2e840a8db296891cb9bead03b44d86dbb.jpg/v1/fill/w_1076%2Ch_606%2Cq_90%2Cusm_0.60_1.00_0.01/3bb108fceab832e783c4cb89ac388fd2e840a8db296891cb9bead03b44d86dbb.webp',
		brand: 'wix',
		category: 'agency',
		description:
			'Một mẫu cổ điển, sang trọng làm nổi bật khuôn mặt mới mẻ đó. Đơn giản chỉ cần xây dựng những cuốn sách có hình ảnh bắt mắt, chất lượng cao và thêm thông tin hữu ích như cách đăng ký tài năng của bạn hoặc đăng ký gia nhập đại lý.'
	},
	{
		rating: '0',
		numReviews: 0,
		price: 0,
		countInStock: 0,
		name: 'Sample Name',
		image: 'https://via.placeholder.com/300',
		brand: 'Sample brand',
		category: 'Sample category',
		description: 'Sample description'
	},
	{
		rating: '0',
		numReviews: 0,
		price: 0,
		countInStock: 0,
		name: 'Sample Name',
		image: 'https://via.placeholder.com/300',
		brand: 'Sample brand',
		category: 'Sample category',
		description: 'Sample description'
	}
]

export default products
