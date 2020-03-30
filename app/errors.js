exports.notFound = message => {
  return {
    internalCode: exports.NOT_FOUND,
    message
  };
};

exports.bad_request = message => {
  return {
    internalCode: exports.BAD_REQUEST,
    message
  };
};

exports.NOT_FOUND = 'NOT_FOUND';
exports.BAD_REQUEST = 'BAD_REQUEST';

exports.userNotFound = exports.notFound('User not found');
exports.missingInputArguments = custom => exports.bad_request(custom);
exports.userAlreadyExists = exports.bad_request('User with the input ID already exists');
exports.userNotFoundForUpdate = exports.notFound(
  'The user that was input to update does not exist or no changes were commited'
);
exports.userNotFoundForDelete = exports.notFound('The user that was input to delete does not exist');
