const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoseeDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');

const Items = new Schema(
    {
        name: { type: String, required: true },
        sizeL: { type: Number, default: 0 },
        sizeM: { type: Number, default: 0 },
        sizeS: { type: Number, default: 0 },
        price: { type: Number },
        types: { type: String },
        code: { type: String },
        img: { type: String },
        desc: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

//Plugin
mongoose.plugin(slug);
Items.plugin(mongoseeDelete, {
    overrideMethods: true,
    deleteAt: true,
});

module.exports = mongoose.model('Items', Items);
