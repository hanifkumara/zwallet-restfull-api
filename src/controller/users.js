const { getUsers, getUserById, updateUser, deleteUser, getListUsers, updateUserId } = require('../models/users');
const helper = require('../helpers/helper');
const createError = require('http-errors');
const { pagination, paginationAllUsers } = require('../helpers/pagination');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const redis = require('redis');
const { updateEmail } = require('../helpers/email');

exports.getUsers = async (req, res, next) => {
	const name = req.query.name;
	const phone = req.query.phone;
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 4;
	const offset = (page - 1) * limit;
	const setPagination = await paginationAllUsers(limit, page);
	getUsers(name, phone, limit, offset)
		.then((result) => {
			if (result.length === 0) {
				return helper.response(res, 404, null, { message: 'data not found' });
			}
			const resultUser = result.map((value) => {
				delete value.password;
				delete value.pin;
				return value;
			});

			// client.setex('getAllUsers', 60 * 60 * 60, JSON.stringify(resultUser))
			helper.response(res, 200, { users: resultUser, pagination: setPagination }, null);
		})
		.catch(() => {
			const error = createError.InternalServerError();
			return next(error);
		});
};
exports.searchUser = (req, res, next) => {
	const name = req.query.name;
	const phone = req.query.phone;
	getUsers(name, phone)
		.then((result) => {
			if (result.length === 0) {
				return helper.response(res, 404, null, { message: 'data not found' });
			}
			const resultUser = result.map((value) => {
				delete value.password;
				return value;
			});
			helper.response(res, 200, resultUser, null);
		})
		.catch(() => {
			const error = createError.InternalServerError();
			return next(error);
		});
};
exports.getUserById = (req, res, next) => {
	const id = req.params.id;
	getUserById(id)
		.then((result) => {
			if (result.length === 0) {
				return helper.response(res, 404, null, { message: 'id not found' });
			}
			// client.setex('cacheUserId' + id, 60 * 60 * 60, JSON.stringify(result))
			helper.response(res, 200, result, null);
		})
		.catch(() => {
			const error = createError.InternalServerError();
			return next(error);
		});
},
exports.listUsers = async (req, res, next) => {
	const { myId } = req;
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 4;
	const offset = (page - 1) * limit;
	const setPagination = await pagination(myId, limit, page);
	getListUsers(myId, limit, offset)
		.then((result) => {
			if (result.length === 0) {
				return helper.response(res, 404, null, { message: 'id not found' });
			}
			const resultUser = result.map((value) => {
				delete value.password;
				delete value.pin;
				return value;
			});
			helper.response(res, 200, { users: resultUser, pagination: setPagination }, null);
		})
		.catch(() => {
			const error = createError.InternalServerError();
			return next(error);
		});
};
exports.myProfile = (req, res, next) => {
	const { myId } = req;
	getUserById(myId)
		.then((result) => {
			if (result.length === 0) {
				return helper.response(res, 404, null, { message: 'id not found' });
			}
			delete result[0].password;
			helper.response(res, 200, result, null);
		})
		.catch(() => {
			const error = createError.InternalServerError();
			return next(error);
		});
};
exports.addUser = (req, res, next) => {
	const { name, phone, photo, username, email, password, pin, balance } = req.body;
	const data = { name, phone, photo, username, email, password, pin, balance };
	addUser(data)
		.then((result) => {
			const resultData = {
				insertId: result.insertId,
				data: { ...data }
			};
			helper.response(res, 201, resultData, null);
		})
		.catch(() => {
			const error = createError.InternalServerError();
			return next(error);
		});
},
exports.updateUser = (req, res, next) => {
	const { myId } = req;
	const { name, phone, phone2, username, email, password, pin, balance, roleId } = req.body;
	console.log(phone2);
	const data = {};
	if (req.file) {
		data.photo = `${process.env.BASE_URL}/v1/upload/${req.file.filename}`;
	}

	if (name) {
		data.name = req.body.name;
	}
	if (phone) {
		data.phone = req.body.phone;
	}
	if (phone2) {
		data.phone2 = req.body.phone2;
	}
	if (username) {
		data.username = req.body.username;
	}
	if (email) {
		data.email = req.body.email;
		updateEmail(email, email);
	}
	if (pin) {
		data.pin = req.body.pin;
	}
	if (balance) {
		data.balance = req.body.balance;
	}
	if (roleId) {
		data.roleId = req.body.roleId;
	}
	if (!password) {
		delete data.password;
		updateUser(myId, data)
			.then((result) => {
				if (result.affectedRows === 0) {
					return helper.response(res, 404, null, { message: 'id not found' });
				}
				delete data.password;
				helper.response(res, 200, data, null);
			})
			.catch(() => {
				const error = createError.InternalServerError();
				return next(error);
			});
	} else if (password) {
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(password, salt, function(err, hash) {
				data.password = hash;
				updateUser(myId, data)
					.then((result) => {
						if (result.affectedRows === 0) {
							return helper.response(res, 404, null, { message: 'id not found' });
						}
						delete data.password;
						helper.response(res, 200, data, null);
					})
					.catch(() => {
						const error = createError.InternalServerError();
						return next(error);
					});
			});
		});
	}
},
exports.updateUserId = (req, res, next) => {
	const { id, balance } = req.body;
	const data = {
		balance
	};
	updateUserId(id, data)
		.then((result) => {
			if (result.affectedRows === 0) {
				return helper.response(res, 404, null, { message: 'id not found' });
			}
			helper.response(res, 200, { message: 'update sucess' }, null);
		})
		.catch(() => {
			const err = createError.InternalServerError();
			return next(err);
		});
};
exports.deleteUser = (req, res, next) => {
	const id = req.params.id;
	deleteUser(id)
		.then((result) => {
			if (result.affectedRows === 0) {
				return helper.response(res, 404, null, { message: 'id not found' });
			}
			helper.response(res, 200, { message: 'delete sucess' }, null);
		})
		.catch(() => {
			const error = createError.InternalServerError();
			return next(error);
		});
};
