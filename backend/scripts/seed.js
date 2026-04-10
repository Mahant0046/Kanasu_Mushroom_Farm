require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Category = require('../models/Category');
const Product = require('../models/Product');
const User = require('../models/User');
const Blog = require('../models/Blog');

// Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kanasu-mushroom')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Seed data
const seedData = async () => {
  try {
    // Clear existing data
    await Category.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Blog.deleteMany();
    console.log('Cleared existing data');

    // Create categories
    const categories = await Category.create([
      {
        name: 'Fresh Mushrooms',
        slug: 'fresh-mushrooms',
        description: 'Farm-fresh organic mushrooms harvested daily',
        order: 1,
        image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=800&q=80'
      },
      {
        name: 'Dried Products',
        slug: 'dried-products',
        description: 'Premium dried mushrooms with extended shelf life',
        order: 2,
        image: 'https://images.unsplash.com/photo-1596395819057-7324d3e1c665?w=800&q=80'
      },
      {
        name: 'Grow Kits',
        slug: 'grow-kits',
        description: 'DIY mushroom growing kits for home cultivation',
        order: 3,
        image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?w=800&q=80'
      },
      {
        name: 'Powders',
        slug: 'powders',
        description: 'Nutritious mushroom powders for cooking and supplements',
        order: 4,
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80'
      },
      {
        name: 'Pickles',
        slug: 'pickles',
        description: 'Delicious mushroom pickles and preserves',
        order: 5,
        image: 'https://images.unsplash.com/photo-1568558686332-51648c6c0d81?w=800&q=80'
      }
    ]);
    console.log('Created categories');

    // Get category IDs
    const freshCategory = categories.find(c => c.slug === 'fresh-mushrooms')._id;
    const driedCategory = categories.find(c => c.slug === 'dried-products')._id;
    const kitCategory = categories.find(c => c.slug === 'grow-kits')._id;
    const powderCategory = categories.find(c => c.slug === 'powders')._id;
    const pickleCategory = categories.find(c => c.slug === 'pickles')._id;

    // Create products
    const products = await Product.create([
      // Fresh Mushrooms
      {
        name: 'Fresh Button Mushrooms',
        slug: 'fresh-button-mushrooms',
        description: 'Premium quality button mushrooms, freshly harvested from our farm. Perfect for salads, soups, and stir-fries.',
        category: freshCategory,
        price: 120,
        mushroomType: 'button',
        productType: 'fresh',
        weight: { value: 250, unit: 'g' },
        stock: 50,
        featured: true,
        thumbnail: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=800&q=80',
          'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80'
        ],
        nutritionInfo: {
          protein: '3g per 100g',
          calories: '22 per 100g',
          fiber: '1g per 100g',
          vitamins: 'B vitamins, Selenium'
        },
        healthBenefits: ['High in protein', 'Rich in antioxidants', 'Supports immune system', 'Low in calories'],
        storageInstructions: 'Store in refrigerator in a paper bag. Use within 5-7 days.',
        tags: ['fresh', 'organic', 'button', 'salad']
      },
      {
        name: 'Fresh Oyster Mushrooms',
        slug: 'fresh-oyster-mushrooms',
        description: 'Delicate oyster mushrooms with a mild, savory flavor. Excellent for grilling and sautéing.',
        category: freshCategory,
        price: 150,
        mushroomType: 'oyster',
        productType: 'fresh',
        weight: { value: 200, unit: 'g' },
        stock: 40,
        featured: true,
        thumbnail: 'https://images.unsplash.com/photo-1568558686332-51648c6c0d81?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1568558686332-51648c6c0d81?w=800&q=80',
          'https://images.unsplash.com/photo-1595776613215-e567a7ce3e74?w=800&q=80'
        ],
        nutritionInfo: {
          protein: '3.5g per 100g',
          calories: '33 per 100g',
          fiber: '2g per 100g',
          vitamins: 'B vitamins, Vitamin D'
        },
        healthBenefits: ['Heart healthy', 'Anti-inflammatory', 'Rich in fiber', 'Supports immunity'],
        storageInstructions: 'Refrigerate in a breathable container. Best used within 4-5 days.',
        tags: ['fresh', 'organic', 'oyster', 'gourmet']
      },
      {
        name: 'Fresh Shiitake Mushrooms',
        slug: 'fresh-shiitake-mushrooms',
        description: 'Premium shiitake mushrooms with rich, umami flavor. A staple in Asian cuisine.',
        category: freshCategory,
        price: 180,
        mushroomType: 'shiitake',
        productType: 'fresh',
        weight: { value: 200, unit: 'g' },
        stock: 35,
        featured: true,
        thumbnail: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80',
          'https://images.unsplash.com/photo-1596395819057-7324d3e1c665?w=800&q=80'
        ],
        nutritionInfo: {
          protein: '2.2g per 100g',
          calories: '34 per 100g',
          fiber: '1.5g per 100g',
          vitamins: 'B vitamins, Vitamin D'
        },
        healthBenefits: ['Supports heart health', 'Boosts immunity', 'Anti-cancer properties', 'Rich in antioxidants'],
        storageInstructions: 'Store in refrigerator. Remove from plastic and wrap in paper towel.',
        tags: ['fresh', 'organic', 'shiitake', 'asian', 'umami']
      },
      {
        name: 'Fresh Milky Mushrooms',
        slug: 'fresh-milky-mushrooms',
        description: 'Creamy, mild-flavored milky mushrooms perfect for Indian cooking and curries.',
        category: freshCategory,
        price: 140,
        mushroomType: 'milky',
        productType: 'fresh',
        weight: { value: 250, unit: 'g' },
        stock: 45,
        thumbnail: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=800&q=80',
          'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?w=800&q=80'
        ],
        nutritionInfo: {
          protein: '3g per 100g',
          calories: '28 per 100g',
          fiber: '1.2g per 100g',
          vitamins: 'B vitamins, Potassium'
        },
        healthBenefits: ['High protein', 'Low fat', 'Digestive health', 'Energy booster'],
        storageInstructions: 'Refrigerate in a paper bag. Use within 5-6 days.',
        tags: ['fresh', 'organic', 'milky', 'curry']
      },
      // Dried Products
      {
        name: 'Dried Oyster Mushrooms',
        slug: 'dried-oyster-mushrooms',
        description: 'Sun-dried oyster mushrooms with concentrated flavor. Rehydrates beautifully.',
        category: driedCategory,
        price: 250,
        mushroomType: 'oyster',
        productType: 'dried',
        weight: { value: 100, unit: 'g' },
        stock: 30,
        featured: true,
        thumbnail: 'https://images.unsplash.com/photo-1595776613215-e567a7ce3e74?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1595776613215-e567a7ce3e74?w=800&q=80'
        ],
        healthBenefits: ['Long shelf life', 'Intense flavor', 'Nutrient dense', 'Easy storage'],
        storageInstructions: 'Store in airtight container in cool, dry place. Lasts up to 6 months.',
        tags: ['dried', 'oyster', 'pantry']
      },
      {
        name: 'Dried Shiitake Mushrooms',
        slug: 'dried-shiitake-mushrooms',
        description: 'Premium dried shiitake with deep umami flavor. Essential for broths and stir-fries.',
        category: driedCategory,
        price: 300,
        mushroomType: 'shiitake',
        productType: 'dried',
        weight: { value: 100, unit: 'g' },
        stock: 25,
        featured: true,
        thumbnail: 'https://images.unsplash.com/photo-1596395819057-7324d3e1c665?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1596395819057-7324d3e1c665?w=800&q=80'
        ],
        healthBenefits: ['Rich umami', 'Immune support', 'Heart healthy', 'Versatile'],
        storageInstructions: 'Keep in airtight container away from moisture. Shelf life: 8-10 months.',
        tags: ['dried', 'shiitake', 'umami', 'broth']
      },
      // Grow Kits
      {
        name: 'Button Mushroom Grow Kit',
        slug: 'button-mushroom-grow-kit',
        description: 'Complete DIY kit to grow your own button mushrooms at home. Harvest in 3-4 weeks.',
        category: kitCategory,
        price: 599,
        mushroomType: 'button',
        productType: 'grow-kit',
        weight: { value: 1, unit: 'kg' },
        stock: 20,
        featured: true,
        thumbnail: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?w=800&q=80',
          'https://images.unsplash.com/photo-1568558686332-51648c6c0d81?w=800&q=80'
        ],
        healthBenefits: ['Home grown', 'Chemical free', 'Educational', 'Fun activity'],
        storageInstructions: 'Keep in cool place until ready to use. Follow included instructions.',
        tags: ['grow-kit', 'button', 'diy', 'home']
      },
      {
        name: 'Oyster Mushroom Grow Kit',
        slug: 'oyster-mushroom-grow-kit',
        description: 'Easy-to-use oyster mushroom kit. Perfect for beginners. Harvest in 2-3 weeks.',
        category: kitCategory,
        price: 699,
        mushroomType: 'oyster',
        productType: 'grow-kit',
        weight: { value: 1, unit: 'kg' },
        stock: 15,
        featured: true,
        thumbnail: 'https://images.unsplash.com/photo-1595776613215-e567a7ce3e74?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1595776613215-e567a7ce3e74?w=800&q=80',
          'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80'
        ],
        healthBenefits: ['Fast growing', 'High yield', 'Beginner friendly', 'Organic'],
        storageInstructions: 'Store in cool, dark place. Start within 2 weeks of purchase.',
        tags: ['grow-kit', 'oyster', 'diy', 'beginner']
      },
      // Powders
      {
        name: 'Mushroom Protein Powder',
        slug: 'mushroom-protein-powder',
        description: 'Premium blend of dried mushroom powder. High protein, perfect for smoothies.',
        category: powderCategory,
        price: 450,
        mushroomType: 'mixed',
        productType: 'powder',
        weight: { value: 200, unit: 'g' },
        stock: 25,
        thumbnail: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80'
        ],
        healthBenefits: ['High protein', 'Nutrient dense', 'Easy to use', 'Versatile'],
        storageInstructions: 'Store in airtight container. Keep away from moisture.',
        tags: ['powder', 'protein', 'supplement', 'smoothie']
      },
      {
        name: 'Shiitake Mushroom Powder',
        slug: 'shiitake-mushroom-powder',
        description: 'Pure shiitake mushroom powder for soups, sauces, and seasoning.',
        category: powderCategory,
        price: 350,
        mushroomType: 'shiitake',
        productType: 'powder',
        weight: { value: 100, unit: 'g' },
        stock: 30,
        thumbnail: 'https://images.unsplash.com/photo-1596395819057-7324d3e1c665?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1596395819057-7324d3e1c665?w=800&q=80'
        ],
        healthBenefits: ['Umami flavor', 'Immune boost', 'Convenient', 'Natural seasoning'],
        storageInstructions: 'Airtight container in cool, dry place.',
        tags: ['powder', 'shiitake', 'seasoning', 'soup']
      },
      // Pickles
      {
        name: 'Spicy Mushroom Pickle',
        slug: 'spicy-mushroom-pickle',
        description: 'Traditional Indian-style spicy mushroom pickle with aromatic spices.',
        category: pickleCategory,
        price: 280,
        mushroomType: 'button',
        productType: 'pickle',
        weight: { value: 250, unit: 'g' },
        stock: 40,
        thumbnail: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=800&q=80'
        ],
        healthBenefits: ['Probiotic', 'Flavorful', 'Traditional', 'Long shelf life'],
        storageInstructions: 'Refrigerate after opening. Use clean, dry spoon.',
        tags: ['pickle', 'spicy', 'indian', 'traditional']
      },
      {
        name: 'Garlic Mushroom Pickle',
        slug: 'garlic-mushroom-pickle',
        description: 'Mushrooms pickled with fresh garlic and herbs. Perfect accompaniment.',
        category: pickleCategory,
        price: 260,
        mushroomType: 'mixed',
        productType: 'pickle',
        weight: { value: 250, unit: 'g' },
        stock: 35,
        thumbnail: 'https://images.unsplash.com/photo-1568558686332-51648c6c0d81?w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1568558686332-51648c6c0d81?w=800&q=80'
        ],
        healthBenefits: ['Garlic benefits', 'Flavorful', 'Natural', 'Preservative free'],
        storageInstructions: 'Keep refrigerated. Consume within 3 months after opening.',
        tags: ['pickle', 'garlic', 'herbs', 'condiment']
      }
    ]);
    console.log('Created products');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@kanasu.com',
      password: 'admin123',
      role: 'admin',
      phone: '+919876543210',
      address: {
        street: 'Farm Road',
        city: 'Bangalore',
        state: 'Karnataka',
        zipCode: '560001'
      }
    });
    console.log('Created admin user');

    // Create blog posts
    const blogs = await Blog.create([
      {
        title: '10 Health Benefits of Eating Mushrooms Daily',
        slug: 'health-benefits-of-mushrooms',
        excerpt: 'Discover why mushrooms are considered a superfood and how they can improve your health.',
        featuredImage: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=800&q=80',
        content: `Mushrooms are often overlooked as a nutritional powerhouse, but they offer incredible health benefits. Here are 10 reasons to include mushrooms in your daily diet:

1. **Boost Immune System**: Mushrooms contain beta-glucans that enhance immune function.
2. **High in Protein**: Perfect for vegetarians and vegans looking for protein sources.
3. **Rich in Antioxidants**: Fight free radicals and reduce inflammation.
4. **Heart Health**: Help lower cholesterol and blood pressure.
5. **Weight Management**: Low in calories but high in nutrients.
6. **Bone Health**: Good source of vitamin D when exposed to sunlight.
7. **Diabetes Friendly**: Low glycemic index and helps regulate blood sugar.
8. **Digestive Health**: High fiber content promotes healthy digestion.
9. **Brain Function**: Some mushrooms may help protect against cognitive decline.
10. **Cancer Fighting**: Studies show potential anti-cancer properties.

At Kanasu Mushroom Farm, we grow organic, chemical-free mushrooms to ensure you get all these benefits without any harmful additives.`,
        category: 'health-benefits',
        published: true,
        tags: ['health', 'nutrition', 'superfood', 'wellness'],
        readingTime: 5
      },
      {
        title: 'How to Grow Your Own Mushrooms at Home',
        slug: 'grow-mushrooms-at-home',
        excerpt: 'A complete guide to starting your home mushroom garden with our easy-to-use grow kits.',
        featuredImage: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?w=800&q=80',
        content: `Growing mushrooms at home is easier than you think! With our Kanasu grow kits, you can harvest fresh mushrooms in just 2-4 weeks.

**Getting Started:**
1. Choose your mushroom variety (Button, Oyster, or Shiitake)
2. Find a suitable location with indirect light
3. Maintain temperature between 20-25°C
4. Keep humidity levels high (70-80%)

**Step-by-Step Process:**
1. Open the grow kit and make small cuts in the substrate
2. Spray water 2-3 times daily to maintain moisture
3. Wait for mycelium colonization (7-10 days)
4. Watch for pinheads (tiny mushroom formations)
5. Harvest when caps fully open

**Tips for Success:**
- Use filtered or distilled water
- Avoid direct sunlight
- Maintain consistent temperature
- Harvest regularly to encourage new growth

**Common Mistakes to Avoid:**
- Overwatering (can cause mold)
- Underwatering (stunts growth)
- Too much light (mushrooms prefer shade)
- Poor air circulation

Our grow kits come with detailed instructions and support. Happy growing!`,
        category: 'growing-guide',
        published: true,
        tags: ['growing', 'diy', 'home-garden', 'beginner'],
        readingTime: 8
      },
      {
        title: 'Creamy Mushroom Soup Recipe',
        slug: 'creamy-mushroom-soup-recipe',
        excerpt: 'A warm, comforting mushroom soup perfect for rainy days. Easy to make with fresh mushrooms.',
        featuredImage: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
        content: `This creamy mushroom soup is a family favorite at Kanasu Farm. It's simple, delicious, and showcases the natural flavor of fresh mushrooms.

**Ingredients:**
- 500g fresh button mushrooms, sliced
- 1 onion, chopped
- 3 cloves garlic, minced
- 2 cups vegetable broth
- 1 cup heavy cream
- 2 tbsp butter
- 2 tbsp flour
- Fresh thyme
- Salt and pepper to taste

**Instructions:**
1. Melt butter in a large pot over medium heat
2. Add onions and garlic, sauté until fragrant
3. Add mushrooms, cook until they release moisture
4. Sprinkle flour and stir for 2 minutes
5. Add vegetable broth, bring to a simmer
6. Cook for 15 minutes until mushrooms are tender
7. Blend half the soup for creaminess (optional)
8. Add heavy cream, stir well
9. Season with salt, pepper, and fresh thyme
10. Serve hot with crusty bread

**Pro Tips:**
- Use a mix of mushroom varieties for depth of flavor
- Don't overcook the mushrooms initially
- Add cream at the end to prevent separation
- Garnish with sautéed mushroom slices

This soup freezes well for up to 3 months. Enjoy!`,
        category: 'recipe',
        published: true,
        tags: ['recipe', 'soup', 'comfort-food', 'easy'],
        readingTime: 6
      },
      {
        title: 'Our Farm Story: From Small Beginnings',
        slug: 'our-farm-story',
        excerpt: "Learn about Kanasu Mushroom Farm's journey and our commitment to organic farming.",
        featuredImage: 'https://images.unsplash.com/photo-1500076656114-488c8b0e6582?w=800&q=80',
        content: `Kanasu Mushroom Farm started with a simple dream: to provide fresh, organic mushrooms to our local community. What began as a small experimental setup in our backyard has grown into a thriving farm serving customers across the region.

**Our Beginning:**
Five years ago, we noticed the lack of truly fresh, chemical-free mushrooms in the market. Most available options were either imported or grown with excessive pesticides. We decided to change that.

**Our Philosophy:**
- 100% organic cultivation
- No chemical pesticides or fertilizers
- Sustainable farming practices
- Direct farm-to-customer delivery
- Fair pricing for farmers and customers

**Our Process:**
We grow our mushrooms using traditional methods combined with modern hygiene standards. Our substrate is prepared from organic agricultural waste, making our farming eco-friendly.

**Our Varieties:**
We specialize in four main varieties:
1. Button Mushrooms - The versatile favorite
2. Oyster Mushrooms - Delicate and flavorful
3. Shiitake Mushrooms - Rich and umami-packed
4. Milky Mushrooms - Perfect for Indian cuisine

**Community Impact:**
We work with local farmers, provide employment in rural areas, and educate people about the benefits of mushroom cultivation.

**Looking Forward:**
We plan to expand our product line, introduce more exotic varieties, and reach more customers who value quality, organic food.

Thank you for being part of our journey!`,
        category: 'farm-story',
        published: true,
        tags: ['about', 'farm', 'organic', 'sustainability'],
        readingTime: 7
      },
      {
        title: 'Storage Tips: Keep Your Mushrooms Fresh Longer',
        slug: 'mushroom-storage-tips',
        excerpt: 'Learn the best ways to store different types of mushrooms to maximize freshness and shelf life.',
        featuredImage: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80',
        content: `Proper storage is key to enjoying fresh mushrooms at their best. Here's our comprehensive guide:

**Fresh Mushrooms:**
- Store in refrigerator (2-4°C)
- Use paper bags, not plastic (allows breathing)
- Don't wash before storage
- Use within 5-7 days
- Check for moisture and remove if present

**Dried Mushrooms:**
- Store in airtight containers
- Keep in cool, dry place
- Away from direct sunlight
- Shelf life: 6-12 months
- Rehydrate before use

**Mushroom Powders:**
- Airtight glass containers
- Cool, dark location
- Moisture-free environment
- Shelf life: 8-10 months
- Use dry spoon only

**Pickles and Preserves:**
- Refrigerate after opening
- Use clean, dry utensils
- Oil layer on top helps preservation
- Consume within recommended time
- Check for spoilage signs

**Signs of Spoilage:**
- Slimy texture (fresh mushrooms)
- Dark spots or discoloration
- Unpleasant odor
- Mold growth
- Soft or mushy texture

**Reviving Slightly Wilted Mushrooms:**
- Soak in cold water for 10 minutes
- Pat dry thoroughly
- Use immediately in cooking
- Don't revive if showing spoilage signs

**Freezing Mushrooms:**
- Clean and slice first
- Blanch for 2-3 minutes
- Flash freeze on tray
- Transfer to freezer bags
- Lasts 3-6 months

Following these tips will help reduce food waste and ensure you always have quality mushrooms ready for cooking!`,
        category: 'tips',
        published: true,
        tags: ['storage', 'freshness', 'tips', 'kitchen'],
        readingTime: 5
      },
      {
        title: 'Mushroom Curry - South Indian Style',
        slug: 'mushroom-curry-south-indian',
        excerpt: 'A delicious and aromatic mushroom curry recipe that pairs perfectly with rice or roti.',
        featuredImage: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=800&q=80',
        content: `This South Indian style mushroom curry is a staple in many households. It's flavorful, nutritious, and easy to prepare.

**Ingredients:**
- 400g fresh mushrooms (button or milky)
- 2 onions, finely chopped
- 2 tomatoes, chopped
- 1 tbsp ginger-garlic paste
- 2-3 green chilies
- 1/2 cup coconut milk
- 1 tsp mustard seeds
- 1 tsp cumin seeds
- Curry leaves
- Turmeric, red chili powder, coriander powder
- Salt to taste
- 2 tbsp oil
- Fresh coriander for garnish

**Instructions:**
1. Clean and chop mushrooms into bite-sized pieces
2. Heat oil in a pan, add mustard seeds
3. When they splutter, add cumin seeds and curry leaves
4. Add onions, sauté until golden
5. Add ginger-garlic paste, cook until raw smell disappears
6. Add tomatoes, cook until soft
7. Add all spices, mix well
8. Add mushrooms, stir to coat
9. Add 1/2 cup water, cover and cook
10. When mushrooms are tender, add coconut milk
11. Simmer for 2-3 minutes
12. Garnish with fresh coriander

**Serving Suggestions:**
- Steamed rice
- Dosa or idli
- Chapati or roti
- Appam

**Variations:**
- Add vegetables like peas or potatoes
- Use coconut cream for richer taste
- Add kasuri methi for aroma
- Make it spicier with more chilies

This curry is protein-rich, low in calories, and absolutely delicious!`,
        category: 'recipe',
        published: true,
        tags: ['recipe', 'curry', 'indian', 'south-indian'],
        readingTime: 6
      }
    ]);
    console.log('Created blog posts');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
