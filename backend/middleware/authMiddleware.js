import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = asyncHandler(async (request, response, next) => {
	let token = request.headers.authorization;

	if (token && token.startsWith('Bearer')) {
		try {
			token = token.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			request.user = await User.findById(decoded.id).select('-password');

			next();
		} catch (error) {
			console.error({ error });
			response.status(401);
			throw new Error('Not authorized, token failed');
		}
	}

	if (!token) {
		response.status(401);
		throw new Error('Not authorized, no token');
	}
});

export { protect };
