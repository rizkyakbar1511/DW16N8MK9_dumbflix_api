'use strict';
module.exports = (sequelize, DataTypes) => {
  const Film = sequelize.define('Film', {
    title: DataTypes.STRING,
    thumbnailFilm: DataTypes.STRING,
    year: DataTypes.INTEGER,
    description: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {});
  Film.associate = function(models) {
    // associations can be defined here
    Film.belongsTo(models.Category, {
      foreignKey: {
        name: "categoryId"
      }
    })
    Film.hasMany(models.Episode)
  };
  return Film;
};