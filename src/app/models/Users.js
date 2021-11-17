const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoseeDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');

const Users = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String },
    },
    {
        timestamps: true,
    },
);

//Plugin
mongoose.plugin(slug);
Users.plugin(mongoseeDelete, {
    overrideMethods: true,
    deleteAt: true,
});

module.exports = mongoose.model('Users', Users);
