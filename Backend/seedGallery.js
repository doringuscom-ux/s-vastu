require('dotenv').config();
const mongoose = require('mongoose');
const Gallery = require('./models/Gallery');

const images = [
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    alt: "Luxury Living Room",
    category: "Residential",
    size: "large"
  },
  {
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
    alt: "Modern Interior",
    category: "Vastu Compliant",
    size: "small"
  },
  {
    src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop",
    alt: "Elegant Bedroom",
    category: "Residential",
    size: "medium"
  },
  {
    src: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=800&auto=format&fit=crop",
    alt: "Architectural Design",
    category: "Commercial",
    size: "small"
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    alt: "Spacious Hall",
    category: "Vastu Compliant",
    size: "medium"
  },
  {
    src: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?q=80&w=800&auto=format&fit=crop",
    alt: "Office Space Vastu",
    category: "Commercial",
    size: "large"
  }
];

const seedGallery = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Clear existing gallery items
    await Gallery.deleteMany();
    
    // Insert new images
    await Gallery.insertMany(images);
    
    console.log('Gallery images seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedGallery();
