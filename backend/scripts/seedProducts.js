const mongoose = require('mongoose');
const Product = require('./../../models/Product');
require('dotenv').config();

const products = [
  {
    name: 'Fiddle Leaf Fig',
    description: 'Large, lush leaves. Great for indoors.',
    price: 45,
    image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Indoor Plants',
    stock: 10,
    featured: true,
    difficulty: 'Medium',
    light_requirements: 'High',
    watering_frequency: 'Weekly',
  },
  {
    name: 'Snake Plant',
    description: 'Low maintenance, air purifying.',
    price: 25,
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Indoor Plants',
    stock: 20,
    featured: true,
    difficulty: 'Easy',
    light_requirements: 'Low',
    watering_frequency: 'Bi-weekly',
  },
  {
    name: 'Succulent Mix',
    description: 'Assorted succulents for any space.',
    price: 30,
    image: 'https://images.pexels.com/photos/1974508/pexels-photo-1974508.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Succulents',
    stock: 15,
    featured: true,
    difficulty: 'Easy',
    light_requirements: 'Medium',
    watering_frequency: 'Monthly',
  },
  {
    name: 'Rose Bush',
    description: 'Beautiful outdoor flowering plant.',
    price: 40,
    image: 'https://images.pexels.com/photos/1359862/pexels-photo-1359862.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Flowering Plants',
    stock: 8,
    featured: true,
    difficulty: 'Medium',
    light_requirements: 'High',
    watering_frequency: 'Weekly',
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Seeded featured products!');
  mongoose.disconnect();
}

seed();
