module.exports = (sequelize, DataTypes) => {
  const Case = sequelize.define('Case', {
    name: DataTypes.STRING,

    status: DataTypes.ENUM('處理中', '結案'),
    personInCharge: DataTypes.STRING,
    typesMajor: DataTypes.ENUM('一般', '法律', '急難救助'),
    typesMinor: DataTypes.ENUM(
      '一般',
      '求職',
      '陳情',
      '施政建議',
      '債務',
      '勞資',
      '車禍',
      '家事',
      '繼承',
      '刑事',
      '諮詢',
      '非訟',
      '生活扶助',
      '死亡救助',
      '急難紓困',
      '重大災害',
      '醫療補助',
    ),
    relation1: DataTypes.STRING,
    relation2: DataTypes.STRING,
    relation3: DataTypes.STRING,
    contact1: DataTypes.STRING,
    contact2: DataTypes.STRING,
    contact3: DataTypes.STRING,
    note: DataTypes.TEXT,
    handle: DataTypes.TEXT,
  });

  Case.associate = (models) => {
    Case.belongsTo(models.Client);
  };

  return Case;
};
