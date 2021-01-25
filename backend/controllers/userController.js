import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

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
			token: generateToken(user._id),
		});
	} else {
		response.status(401);
		throw new Error('Invalid email or password');
	}

	response.json(user);
});

/*
 * @desc Register new User
 * @route POST /api/users
 * @access Public
 */

const registerUser = asyncHandler(async (request, response) => {
	const { email, password, name } = request.body;

	const userExist = await User.findOne({ email });

	if (userExist) {
		response.status(400);
		throw new Error('User already exist');
	}

	const user = await User.create({ name, email, password });

	if (user) {
		response.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		response.status(400);
		throw new Error('Invalid user data ⚠');
	}
});

/*
 * @desc GET user profile
 * @route GET /api/users/profile
 * @access Private
 */

const getUserProfile = asyncHandler(async (request, response) => {
	const user = await User.findById(request.user._id);

	if (user) {
		response.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		response.status(404);
		throw new Error('User not found');
	}
});

/*
 * @desc UPDATE user profile
 * @route PUT /api/users/profile
 * @access Private
 */

const updateUserProfile = asyncHandler(async (request, response) => {
	const user = await User.findById(request.user._id);

	if (user) {
		user.name = request.body.name || user.name;
		user.email = request.body.email || user.email;

		if (request.body.password) {
			user.password = request.body.password;
		}

		const updatedUser = await user.save();

		response.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id),
		});
	} else {
		response.status(404);
		throw new Error('User not found');
	}
});

export { authUser, getUserProfile, registerUser, updateUserProfile };
