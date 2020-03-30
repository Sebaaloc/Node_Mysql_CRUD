const person = require('../models').person;

exports.getUser = async condition => {
  const personFound = await person.findOne({
    where: condition,
    attributes: ['name', 'last_name', 'id', 'mail', 'phone']
  });
  return personFound;
};

exports.createUser = async userToInsert =>
  person
    .create({
      name: userToInsert.name,
      last_name: userToInsert.last_name,
      id: userToInsert.id,
      mail: userToInsert.mail,
      phone: userToInsert.phone
    })
    .then(data => data)
    .catch(error => error);

exports.createUserBulk = usersToInsert =>
  person
    .bulkCreate(usersToInsert)
    .then(data => data)
    .catch(error => error);

const validateUserInput = userToUpdate => {
  const update = {};
  userToUpdate.name ? Object.assign(update, { name: userToUpdate.name }) : '';
  userToUpdate.last_name ? Object.assign(update, { last_name: userToUpdate.last_name }) : '';
  Object.assign(update, { id: userToUpdate.id });
  userToUpdate.mail ? Object.assign(update, { mail: userToUpdate.mail }) : '';
  userToUpdate.phone ? Object.assign(update, { phone: userToUpdate.phone }) : '';
  return update;
};

exports.updateUser = async userToUpdate => {
  const update = await validateUserInput(userToUpdate);
  return person
    .update(update, { returning: true, where: { id: userToUpdate.id } })
    .then(data => {
      console.log(data)
      return {
        updated: data[1]
      };
    })
    .catch(error => {
      return error;
    });
};

exports.deleteUser = idToDelete =>
  person
    .destroy({ where: { id: idToDelete } })
    .then(data => {
      return data;
    })
    .catch(error => {
      return error;
    });
