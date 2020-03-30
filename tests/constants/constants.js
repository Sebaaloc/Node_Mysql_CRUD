exports.singleUserData = {
  name: 'Carolina',
  last_name: 'Alarcon',
  id: '192837465',
  mail: 'caro@gmail.com',
  phone: '12647894'
};

exports.singleUserDataUpdate = {
  name: 'Caro',
  last_name: 'Alarcon',
  id: '192837465',
  mail: 'caro@gmail.com',
  phone: '12647894'
};

exports.singleUserDataUpdateIDTooLong = {
  name: 'Caro',
  last_name: 'Alarcon',
  id: '1928374613245678975313487987894631318678643134878131785',
  mail: 'caro@gmail.com',
  phone: '12647894'
};

exports.singleUserDataUpdateMissingFields = {
  name: 'Caro',
  last_name: 'Alarcon',
  mail: 'caro@gmail.com',
  phone: '12647894'
};

exports.userMissingFields = {
  last_name: 'Alarcon',
  id: '192837465',
  mail: 'caro@gmail.com',
  phone: '12647894'
};

exports.idExcessOfCharacters = {
  name: 'Carolina',
  last_name: 'Alarcon',
  id: '1928374657899641231465',
  mail: 'caro@gmail.com',
  phone: '12647894'
};

exports.usersBatch = [
  {
    name: 'Sebastian',
    last_name: 'Alarcon',
    id: '1',
    mail: 'sebastian@gmail.com',
    phone: '6014002'
  },
  {
    name: 'Carolina',
    last_name: 'Alarcon',
    id: '2',
    mail: 'caro@gmail.com',
    phone: '12647894'
  },
  {
    name: 'Diego',
    last_name: 'Alarcon',
    id: '3',
    mail: 'diego@gmail.com',
    phone: '12647894'
  },
  {
    name: 'Patricia',
    last_name: 'Ochoa',
    id: '4',
    mail: 'patricia@gmail.com',
    phone: '12647894'
  }
];

exports.batchMissingFields = [
  {
    last_name: 'Alarcon',
    id: '1',
    mail: 'sebastian@gmail.com',
    phone: '6014002'
  }
];

exports.batchExcesiveLength = [
  {
    name: 'Sebastian',
    last_name: 'Alarcon',
    id: '123456789012345678978945632',
    mail: 'sebastian@gmail.com',
    phone: '6014002'
  }
];
