const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String },
  stock: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  difficulty: { type: String },
  light_requirements: { type: String },
  watering_frequency: { type: String },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
