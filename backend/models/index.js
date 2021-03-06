const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.message = require("./message.model.js")(sequelize, Sequelize);
db.comment = require("./comment.model.js")(sequelize, Sequelize);
db.like = require("./like.model.js")(sequelize, Sequelize);

db.users.hasMany(db.message, { as: "message"});
db.message.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user"
})

db.message.hasMany(db.comment, { as: "comment"});
db.comment.belongsTo(db.message, {
  foreignKey: "messageId",
  as: "message"
})

db.users.hasMany(db.comment, { as: "comment"});
db.comment.belongsTo(db.users, {
  foreignKey: "userId",
  as: "users"
})

db.users.hasMany(db.like, { as: "like"});
db.like.belongsTo(db.users, {
  foreignKey: 'userId',
  as: 'user',
});

db.message.hasMany(db.like, { as: "like"});
db.like.belongsTo(db.message, {
  foreignKey: 'messageId',
  as: 'message',
});

module.exports = db;