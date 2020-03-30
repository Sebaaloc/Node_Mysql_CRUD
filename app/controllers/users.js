const userService = require('../services/users');
const errors = require('../errors');

exports.getuser = async (req, res, next) => {
  try {
    const user = await userService.getUser({ id: req.query.id });
    if (!user) {
      throw errors.userNotFound;
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    if (Object.prototype.hasOwnProperty.call(user, 'errors')) {
      throw errors.userAlreadyExists;
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
};

exports.createUserBatch = async (req, res, next) => {
  try {
    const user = await userService.createUserBulk(req.body);
    if (Object.prototype.hasOwnProperty.call(user, 'errors')) {
      throw errors.userAlreadyExists;
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUser(req.body);
    if (updatedUser.updated === 0) {
      throw errors.userNotFoundForUpdate;
    }
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userDeleted = await userService.deleteUser(req.body.id);
    if (userDeleted === 1) {
      res.send({
        deleted: userDeleted
      });
    }
    throw errors.userNotFoundForDelete;
  } catch (error) {
    next(error);
  }
};
