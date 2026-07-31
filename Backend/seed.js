require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

const seedAdmin = async () => {
  try {
    await connectDB();
    
    const username = 'admin';
    const password = 'admin123';
    
    let adminUser = await Admin.findOne({ username });
    
    if (adminUser) {
      adminUser.password = password;
      adminUser.role = 'admin';
      adminUser.name = 'Main Admin';
      adminUser.email = 'admin@svastu.com';
      adminUser.phone = '1234567890';
      await adminUser.save();
      console.log('Admin user updated successfully');
    } else {
      const newAdmin = new Admin({
        username,
        password,
        role: 'admin',
        name: 'Main Admin',
        email: 'admin@svastu.com',
        phone: '1234567890'
      });
      await newAdmin.save();
      console.log('Admin user created successfully');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
