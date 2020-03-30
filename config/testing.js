exports.config = {
  environment: 'testing',
  isTesting: true,
  common: {
    database: {
      database: process.env.DATABASE_TEST
    }
  }
};
