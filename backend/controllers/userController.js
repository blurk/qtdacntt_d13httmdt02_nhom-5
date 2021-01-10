import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

/*
 * @desc Authenticate user and get token
 * @route POST /api/users/login
 * @access Public
 */

const authUser = asyncHandler(async (request, response) => {
	const { email, password } = request.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		response.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: null,
		});
	} else {
		response.status(401);
		throw new Error('Invalid email or password');
	}

	response.json(user);
});

export { authUser };
