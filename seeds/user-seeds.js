const { User } = require('../models');

const userData = [{
        username: 'Lernantino',
        password: 'password'

    },
    {
        username: 'Daniel',
        password: 'password'
    },
    {
        username: 'Mickey',
        password: 'password'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
