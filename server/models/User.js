const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));

async function hashPassword(user) {
  const SALT_FACTOR = 8;
  if (!user.changed('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(SALT_FACTOR);
  const hash = await bcrypt.hash(user.password, salt, null);
  user.setDataValue('password', hash);
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
        beforeSave: hashPassword,
      },
    },
  );
  User.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
  };
  return User;
};
