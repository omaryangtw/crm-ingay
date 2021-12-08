const path = require('path');

module.exports = {
  db: {
    database: process.env.DB_NAME || 'crm',
    user: process.env.DB_USER || 'crm',
    password: process.env.DB_PASSWORD || 'crm',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: path.resolve(__dirname, '../../crm.sqlite'),
      logQueryParameters: true,
    },
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
  },
};
