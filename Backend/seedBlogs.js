require('dotenv').config();
const mongoose = require('mongoose');
const Blog = require('./models/Blog');

const sampleBlogs = [
  {
    title: "5 Vastu Tips for a Peaceful Bedroom",
    slug: "5-vastu-tips-peaceful-bedroom",
    excerpt: "Discover how the right placement of your bed and subtle color changes can drastically improve your sleep quality.",
    content: "A peaceful bedroom is the foundation of a healthy life. According to Vastu Shastra, your bedroom should ideally be in the South-West corner of the house. This direction is associated with Earth, bringing stability and grounding energy. \n\n1. Bed Placement: Place your bed so that your head points South or East. \n2. Colors: Use soothing colors like light pink, light blue, or earthy tones. Avoid dark or aggressive colors like bright red or black. \n3. Mirrors: Ensure no mirrors face the bed directly. \n4. Clutter: Keep the space under your bed entirely clear to let energy flow. \n5. Electronics: Minimize electronic devices in the bedroom to reduce electromagnetic fields that disrupt rest.",
    coverImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop",
    category: "Bedroom Vastu",
    author: "S-Vastu Solution",
    isPublished: true,
    metaTitle: "5 Vastu Tips for a Peaceful Bedroom | S-Vastu",
    metaDescription: "Learn 5 essential Vastu tips for your bedroom to improve sleep and harmony."
  },
  {
    title: "How to Choose the Right Colors for Your Home Office",
    slug: "right-colors-home-office-vastu",
    excerpt: "Colors have a profound impact on productivity and mood. Learn which shades attract success and focus according to Vastu.",
    content: "The modern home office is a place of focus, wealth generation, and creativity. The colors you surround yourself with can either enhance your productivity or drain your energy.\n\nFor a home office, Vastu recommends light and vibrant colors. Light green is considered highly auspicious as it represents the energy of Mercury, which governs intellect and commerce. Light yellow or cream are also excellent choices as they keep the environment bright, promoting alertness and clear decision-making.\n\nAvoid dark blues and blacks, as they can induce lethargy and hinder the flow of wealth.",
    coverImage: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=800&auto=format&fit=crop",
    category: "Office Vastu",
    author: "S-Vastu Solution",
    isPublished: true,
    metaTitle: "Vastu Colors for Home Office | S-Vastu",
    metaDescription: "Boost your productivity by choosing the best Vastu-compliant colors for your home office."
  },
  {
    title: "The Science Behind the 16 Vastu Zones",
    slug: "science-behind-16-vastu-zones",
    excerpt: "Vastu is not magic, it's architectural science. We break down the 16 elemental zones of a property and explain their influence.",
    content: "Vastu Shastra divides a space into 16 distinct zones, each governed by specific elements and cosmic energies. Understanding these zones is the first step to diagnosing problems in your home or office.\n\nFor example, the North-East zone is governed by Water and is responsible for clarity of mind and vision. If this zone is blocked or heavily loaded, occupants may suffer from mental fog or lack of foresight.\n\nConversely, the South-East zone is the Fire zone, governing cash flow and vitality. A water element (like a sink or blue color) here can severely impact financial stability. Balancing these 16 zones ensures a harmonious and prosperous environment.",
    coverImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
    category: "Vastu Basics",
    author: "S-Vastu Solution",
    isPublished: true,
    metaTitle: "Understanding 16 Vastu Zones | S-Vastu",
    metaDescription: "A scientific breakdown of the 16 Vastu zones and how they impact daily life."
  },
  {
    title: "Vastu Remedies for Financial Stability",
    slug: "vastu-remedies-financial-stability",
    excerpt: "Struggling with cash flow? These simple Vastu adjustments can help unblock financial energies in your home or business.",
    content: "Financial stability is heavily influenced by the North and South-East directions in your property. The North represents new opportunities and the god of wealth (Kubera), while the South-East represents liquid cash (Fire element).\n\nIf you're facing financial hurdles, check your North zone. Ensure it is clean, clutter-free, and ideally has a water element like a small fountain. Avoid keeping heavy furniture here. \n\nIn the South-East, ensure there are no blue or black colors, as Water extinguishes Fire. A red bulb or keeping your kitchen in this zone can greatly enhance cash flow.",
    coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop",
    category: "Wealth & Prosperity",
    author: "S-Vastu Solution",
    isPublished: true,
    metaTitle: "Vastu Remedies for Wealth and Finance | S-Vastu",
    metaDescription: "Discover powerful Vastu remedies to attract financial stability and wealth."
  },
  {
    title: "Main Entrance Vastu: The Gateway of Energy",
    slug: "main-entrance-vastu-gateway",
    excerpt: "Your main door is where cosmic energy enters your home. Learn the dos and don'ts of main entrance Vastu.",
    content: "The main entrance is considered the 'Archway to Victory' in Vastu Shastra. It is the point where both physical beings and cosmic energies enter the space.\n\nIdeally, the main door should be larger than all other doors in the house and should open inwards in a clockwise direction. This welcomes energy in. It should be well-lit and decorated with auspicious symbols like Swastika or Om.\n\nAvoid placing shoe racks directly in front of the door or having a creaky door, as this creates negative vibrations that block positive energy from entering.",
    coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
    category: "Home Vastu",
    author: "S-Vastu Solution",
    isPublished: true,
    metaTitle: "Main Door Vastu Guidelines | S-Vastu",
    metaDescription: "Optimize your main entrance with these Vastu rules to invite positive energy."
  },
  {
    title: "Kitchen Vastu: Health is Wealth",
    slug: "kitchen-vastu-health-is-wealth",
    excerpt: "The kitchen is the source of health and nourishment. Find out the best directions and layouts for your kitchen.",
    content: "In Vastu, the kitchen represents the element of Fire. Therefore, the most auspicious direction for the kitchen is the South-East corner of the house. If that is not possible, the North-West is the second best alternative.\n\nWhen cooking, one should ideally face East. The gas stove should be placed in the South-East corner of the kitchen platform. Ensure that the sink (Water) and the stove (Fire) are not kept side-by-side or directly facing each other, as these are opposing elements that can cause family disputes.\n\nKeep your kitchen clutter-free and well-ventilated to ensure the food prepared there carries high, positive vibrations.",
    coverImage: "https://images.unsplash.com/photo-1556910103-1c02745a872f?q=80&w=800&auto=format&fit=crop",
    category: "Kitchen Vastu",
    author: "S-Vastu Solution",
    isPublished: true,
    metaTitle: "Vastu Shastra for Kitchen | S-Vastu",
    metaDescription: "Enhance your family's health by aligning your kitchen with Vastu principles."
  }
];

const seedBlogs = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('Connected! Clearing existing blogs...');
    await Blog.deleteMany({});
    
    console.log('Inserting sample blogs...');
    await Blog.insertMany(sampleBlogs);
    
    console.log(`Successfully seeded ${sampleBlogs.length} blogs!`);
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedBlogs();
