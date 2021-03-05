import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

/*
 * @desc Fetch all products
 * @route GET /api/products
 * @access Public
 */

const getProducts = asyncHandler(async (request, response) => {
	const pageSize = 8;
	const page = Number(request.query.pageNumber) || 1;

	const keyword = request.query.keyword
		? {
				name: {
					$regex: request.query.keyword,
					$options: 'i',
				},
		  }
		: {};

	const count = await Product.countDocuments({ ...keyword });

	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1));

	response.json({ products, page, pages: Math.ceil(count / pageSize) });
});

/*
 * @desc Fetch single product
 * @route GET /api/products/:id
 * @access Public
 */

const getProductById = asyncHandler(async (request, response) => {
	const product = await Product.findById(request.params.id);
	if (product) response.json(product);
	else {
		response.status(404);
		throw new Error('Product not found 🙉');
	}
});

/*
 * @desc DELETE a product
 * @route DELETE /api/products/:id
 * @access Private/Admin
 */

const deleteProduct = asyncHandler(async (request, response) => {
	const product = await Product.findById(request.params.id);
	if (product) {
		await product.remove();
		response.json({ message: 'Product removed' });
	} else {
		response.status(404);
		throw new Error('Product not found 🙉');
	}
});

/*
 * @desc CREATE a product
 * @route POST /api/products
 * @access Private/Admin
 */

const createProduct = asyncHandler(async (request, response) => {
	const product = new Product({
		name: 'Sample Name',
		price: 0,
		user: request.user._id,
		image: '/images/sample.jpg',
		brand: 'Sample brand',
		category: 'Sample category',
		countInStock: 0,
		numReviews: 0,
		description: 'Sample description',
	});

	const createdProduct = await product.save();
	response.status(201).json(createdProduct);
});

/*
 * @desc UPDATE a product
 * @route PUT /api/products/:id
 * @access Private/Admin
 */

const updateProduct = asyncHandler(async (request, response) => {
	const {
		name,
		price,
		description,
		image,
		brand,
		category,
		countInStock,
	} = request.body;

	const product = await Product.findById(request.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;

		const updatedProduct = await product.save();
		response.status(201).json(updatedProduct);
	} else {
		response.status(404);
		throw new Error('Product not found 🙉');
	}
});

/*
 * @desc CREATE new user's review
 * @route POST /api/products/:id/reviews
 * @access Private
 */

const createProductReview = asyncHandler(async (request, response) => {
	const { rating, comment } = request.body;

	const product = await Product.findById(request.params.id);

	if (product) {
		const alreadyReview = product.reviews.find(
			(r) => r.user.toString() === request.user._id.toString()
		);

		if (alreadyReview) {
			response.status(400);
			throw new Error('Product already review');
		}

		const review = {
			name: request.user.name,
			rating: Number(rating),
			comment,
			user: request.user._id,
		};

		product.reviews.push(review);
		product.numReviews = product.reviews.length;

		product.rating =
			product.reviews.reduce((acc, curItem) => curItem.rating + acc, 0) /
			product.reviews.length;

		await product.save();
		response.status(201).json({ message: 'Review added' });
	} else {
		response.status(404);
		throw new Error('Product not found 🙉');
	}
});

/*
 * @desc GET top rated product
 * @route GET /api/products/top
 * @access Public
 */

const getTopProducts = asyncHandler(async (request, response) => {
	const products = await Product.find({}).sort({ rating: -1 }).limit(3);

	response.json(products);
});

export {
	getProductById,
	getProducts,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
	getTopProducts,
};
