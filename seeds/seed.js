const sequelize = require('../config/connection');
const { User, BlogPost, Comment } = require('../models');

const userData = require('./userData.json');
const blogPostData = require('./blogPostData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    /*let sequelize fetch the created records from the database 
    and return them as an array of model instances */
    returning: true,
  });

  for (const blogPost of blogPostData) {
    await BlogPost.create({
      ...blogPost,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  const blogPosts = await BlogPost.findAll();

  for (const comment of commentData) {
    const user = users[Math.floor(Math.random() * users.length)];
    const blogPost = blogPosts[Math.floor(Math.random() * blogPosts.length)];
    await Comment.create({
      ...comment,
      user_id: user.id,
      blogpost_id: blogPost.id
    });
  }

  process.exit(0);
};

seedDatabase();