const db = require('../database/dbConfig');

module.exports = {
    findBy,
    find,
    add
}


function add(user) {
    return db('users')
    .insert(user)
}

function find() {
    return db('users').select('id', 'username');
}

function findBy(filter) {
    console.log(filter)
    return db('users')
    .where("username", filter.username).first()
}