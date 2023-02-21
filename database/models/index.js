const User = require('./users.model');
const Product = require('./products.model');
const Order = require('./orders.model');
const OrderItem = require('./order-items.model');
const Chat = require('./chats.model');
const Sequelize = require('./sequelize');

Product.belongsTo(User, {
  as: 'owner',
  foreignKey: 'user_id'
})

User.hasMany(Product, {
  as: 'products',
  foreignKey: 'id'
})


Order.belongsTo(User, {
  as: 'owner',
  foreignKey: 'user_id'
})

User.hasMany(Order, {
  as: 'orders',
  foreignKey: 'id'
})


OrderItem.belongsTo(Order, {
  as: 'order',
  foreignKey: 'order_id'
})

Order.hasMany(OrderItem, {
  as: 'order_items',
  foreignKey: 'id'
})


OrderItem.belongsTo(Product, {
  as: 'product',
  foreignKey: 'product_id'
})

Product.hasMany(OrderItem, {
  as: 'order_items',
  foreignKey: 'id'
})


Chat.belongsTo(User, {
  as: 'owner',
  foreignKey: 'sender_id'
})

User.hasMany(Chat, {
  as: 'chats',
  foreignKey: 'id'
})

module.exports = {
  User,
  Product,
  Order,
  OrderItem,
  Chat,
  Sequelize
}