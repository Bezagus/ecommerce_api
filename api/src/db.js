require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false,
  native: false,
});
const basename = path.basename(__filename);

const modelDefiners = [];


fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize));


let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


const { Answer, Categorie, Comment, Delivery_Type, Payment_Method, Product, Review, Rol, SaleDetail, Sale, Status_Sale, Stock_Product, User } = sequelize.models;



Comment.hasMany(Answer);
Answer.belongsTo(Comment);

Comment.belongsTo(User);
User.hasMany(Comment);

Comment.belongsTo(Product);
Product.hasMany(Comment);

User.belongsTo(Rol);
Rol.hasMany(User);

Sale.belongsTo(User);
User.hasMany(Sale);

Product.belongsTo(Categorie);
Categorie.hasMany(Product);




/*

Sale.belongsTo(Status_Sale);
Status_Sale.hasMany(Sale);

Sale.belongsTo(Payment_Method);
Payment_Method.hasMany(Sale);

Sale.belongsTo(Status_Sale);
Status_Sale.hasMany(Sale);

Sale.hasOne(SaleDetail);
SaleDetail.belongsTo(Sale);

SaleDetail.belongsToMany(Product, { through: 'User_Profile' });
Product.belongsToMany(SaleDetail, { through: 'User_Profile' });

Product.hasOne(Stock_Product);
Stock_Product.belongsTo(Product); 

*/

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};