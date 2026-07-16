require('dotenv').config();
const mongoose = require('mongoose');
const Page = require('./models/Page'); // Adjust path if necessary

const citiesToSeed = [
  // United States of America
  { title: 'Los Angeles', country: 'United States of America' },
  { title: 'Chicago', country: 'United States of America' },
  { title: 'Houston', country: 'United States of America' },
  { title: 'Phoenix', country: 'United States of America' },
  { title: 'Philadelphia', country: 'United States of America' },

  // Malaysia
  { title: 'Penang', country: 'Malaysia' },
  { title: 'Johor Bahru', country: 'Malaysia' },
  { title: 'Ipoh', country: 'Malaysia' },
  { title: 'Kuching', country: 'Malaysia' },
  { title: 'Kota Kinabalu', country: 'Malaysia' },

  // New Zealand
  { title: 'Wellington', country: 'New Zealand' },
  { title: 'Christchurch', country: 'New Zealand' },
  { title: 'Hamilton', country: 'New Zealand' },
  { title: 'Tauranga', country: 'New Zealand' },
  { title: 'Dunedin', country: 'New Zealand' },

  // United Arab Emirates
  { title: 'Abu Dhabi', country: 'United Arab Emirates' },
  { title: 'Sharjah', country: 'United Arab Emirates' },
  { title: 'Al Ain', country: 'United Arab Emirates' },
  { title: 'Ajman', country: 'United Arab Emirates' },
  { title: 'Ras Al Khaimah', country: 'United Arab Emirates' },

  // Singapore
  { title: 'Jurong', country: 'Singapore' },
  { title: 'Tampines', country: 'Singapore' },
  { title: 'Woodlands', country: 'Singapore' },
  { title: 'Hougang', country: 'Singapore' },
  { title: 'Yishun', country: 'Singapore' },

  // Australia
  { title: 'Brisbane', country: 'Australia' },
  { title: 'Perth', country: 'Australia' },
  { title: 'Adelaide', country: 'Australia' },
  { title: 'Gold Coast', country: 'Australia' },
  { title: 'Canberra', country: 'Australia' },

  // Canada
  { title: 'Montreal', country: 'Canada' },
  { title: 'Vancouver', country: 'Canada' },
  { title: 'Calgary', country: 'Canada' },
  { title: 'Edmonton', country: 'Canada' },
  { title: 'Ottawa', country: 'Canada' },

  // India
  { title: 'Pune', country: 'India' },
  { title: 'Ahmedabad', country: 'India' },
  { title: 'Chennai', country: 'India' },
  { title: 'Kolkata', country: 'India' },
  { title: 'Surat', country: 'India' },

  // United Kingdom
  { title: 'Birmingham', country: 'United Kingdom' },
  { title: 'Manchester', country: 'United Kingdom' },
  { title: 'Glasgow', country: 'United Kingdom' },
  { title: 'Liverpool', country: 'United Kingdom' },
  { title: 'Edinburgh', country: 'United Kingdom' }
];

const seedCities = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    for (const city of citiesToSeed) {
      const slug = city.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const metaTitle = `Best Vastu Consultant in ${city.title}, ${city.country} | S-Vastu Solution`;
      const metaDescription = `Looking for expert Vastu services in ${city.title}, ${city.country}? S-Vastu Solution provides top-notch Vastu consultations for residential and commercial properties.`;
      
      const existingPage = await Page.findOne({ slug });
      
      if (!existingPage) {
        await Page.create({
          title: city.title,
          slug,
          country: city.country,
          metaTitle,
          metaDescription,
          metaKeywords: `vastu consultant ${city.title}, vastu expert ${city.title}, best astrologer ${city.title}`
        });
        console.log(`Added: ${city.title} (${city.country})`);
      } else {
        console.log(`Skipped: ${city.title} already exists`);
      }
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding cities:', error);
    process.exit(1);
  }
};

seedCities();
