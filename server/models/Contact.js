module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    date: DataTypes.DATE,
    contactType: DataTypes.ENUM('撥出', '來電', '親訪', '簡訊'),
    isSuccess: DataTypes.BOOLEAN,
    record: DataTypes.STRING,
    personInCharge: DataTypes.STRING,
  });

  Contact.associate = (models) => {
    Contact.belongsTo(models.Client);
  };

  return Contact;
};
