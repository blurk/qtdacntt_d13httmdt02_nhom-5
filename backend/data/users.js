import bcrypt from 'bcryptjs';

const users = [
	{
		name: 'Admin',
		email: 'admin@gmail.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'Sinh',
		email: 'sinh@gmail.com',
		password: bcrypt.hashSync('123456', 10),
	},
	{
		name: 'Linh',
		email: 'linh@gmail.com',
		password: bcrypt.hashSync('123456', 10),
	},
];

export default users;
