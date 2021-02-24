import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

/*
 * @desc Fetch all products
 * @route GET /api/products
 * @access Public
 */

const getProducts = asyncHandler(async (request, response) => {
	const products = await Product.find({});
	response.json(products);
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

export {
	getProductById,
	getProducts,
	deleteProduct,
	createProduct,
	updateProduct,
};
