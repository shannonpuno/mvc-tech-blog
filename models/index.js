const User = require('./User');
const blogPosts = require('./blogPosts');
const comments = require('./comments');

// associations
User.hasMany(blogPosts, {
    foreignKey: 'user_id',
});

User.hasMany(comments, {
    foreignKey: 'blogpost_id'
});

blogPosts.belongsTo(User, {
    foreignKey: 'user_id',
});

blogPosts.hasMany(comments, {
    foreignKey: 'blogpost_id',
});

comments.belongsTo(User, {
    foreignKey: 'user_id'
});

comments.belongsTo(blogPosts, {
    foreignKey: 'blogpost_id'
});

module.exports = {User, blogPosts, comments};