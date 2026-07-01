require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Check if admin exists
    let admin = await Admin.findOne({ username: 'admin' });
    if (!admin) {
      admin = new Admin({
        username: 'admin',
        password: 'admin123'
      });
      console.log('Creating new Admin user (admin / admin123)');
    } else {
      admin.password = 'admin123';
      console.log('Resetting existing Admin user password to admin123');
    }
    await admin.save();
    
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
