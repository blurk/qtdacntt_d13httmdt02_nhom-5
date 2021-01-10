import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

/*
 * @desc Fetch all products
 *@route GET /api/products
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

export { getProductById, getProducts };
