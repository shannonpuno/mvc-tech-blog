const User = require('./User');
const blogPosts = require('./blogPosts');
const Comment = require('./comments');

// associations
User.hasMany(blogPosts, {
    foreignKey: 'user_id',
});

User.hasMany(Comment, {
    foreignKey: 'blogpost_id'
});

blogPosts.belongsTo(User, {
    foreignKey: 'user_id',
});

blogPosts.hasMany(Comment, {
    foreignKey: 'blogpost_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(blogPosts, {
    foreignKey: 'blogpost_id'
});

module.exports = {User, blogPosts, Comment};