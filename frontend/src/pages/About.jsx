import { Leaf, Heart, Users, Award } from 'lucide-react';

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-forest-600 to-earth-700 text-white py-20">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            About Kanasu Mushroom Farm
          </h1>
          <p className="text-lg text-forest-100 max-w-2xl">
            Growing nature's finest mushrooms with love, care, and sustainable practices since 2019
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Our Story</h2>
              <p className="text-earth-600 mb-4">
                Kanasu Mushroom Farm began with a simple dream: to provide fresh, organic mushrooms to our local community. What started as a small experimental setup in our backyard has grown into a thriving farm serving customers across the region.
              </p>
              <p className="text-earth-600 mb-4">
                Five years ago, we noticed the lack of truly fresh, chemical-free mushrooms in the market. Most available options were either imported or grown with excessive pesticides. We decided to change that.
              </p>
              <p className="text-earth-600">
                Today, we're proud to grow premium quality mushrooms using sustainable methods that respect both nature and our customers. Every mushroom we produce is a testament to our commitment to quality and health.
              </p>
            </div>
            <div className="bg-earth-100 rounded-2xl p-12 flex items-center justify-center">
              <span className="text-9xl">🌱</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-forest-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">What drives everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card p-6 text-center">
              <div className="text-forest-600 mb-4 flex justify-center">
                <Leaf className="h-10 w-10" />
              </div>
              <h3 className="text-lg font-semibold text-earth-900 mb-2">
                100% Organic
              </h3>
              <p className="text-earth-600 text-sm">
                No chemical pesticides or fertilizers. Pure, natural growth.
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="text-forest-600 mb-4 flex justify-center">
                <Heart className="h-10 w-10" />
              </div>
              <h3 className="text-lg font-semibold text-earth-900 mb-2">
                Quality First
              </h3>
              <p className="text-earth-600 text-sm">
                Every mushroom meets our strict quality standards.
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="text-forest-600 mb-4 flex justify-center">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="text-lg font-semibold text-earth-900 mb-2">
                Community Focus
              </h3>
              <p className="text-earth-600 text-sm">
                Supporting local farmers and creating rural employment.
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="text-forest-600 mb-4 flex justify-center">
                <Award className="h-10 w-10" />
              </div>
              <h3 className="text-lg font-semibold text-earth-900 mb-2">
                Sustainable
              </h3>
              <p className="text-earth-600 text-sm">
                Eco-friendly farming using agricultural waste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cultivation Process */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Cultivation Process</h2>
            <p className="section-subtitle">How we grow the perfect mushroom</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: '01',
                  title: 'Substrate Preparation',
                  description: 'We prepare organic substrate from agricultural waste like straw and sawdust, sterilizing it to create the perfect growing medium.'
                },
                {
                  step: '02',
                  title: 'Spore Inoculation',
                  'description': 'High-quality mushroom spores are carefully introduced into the prepared substrate under sterile conditions.'
                },
                {
                  step: '03',
                  title: 'Mycelium Growth',
                  description: 'The spawn colonizes the substrate over 2-3 weeks in a controlled environment with optimal temperature and humidity.'
                },
                {
                  step: '04',
                  title: 'Fruiting',
                  description: 'Mushrooms begin to form when conditions are right. We monitor and adjust light, temperature, and humidity.'
                },
                {
                  step: '05',
                  title: 'Harvesting',
                  description: 'Mushrooms are harvested at peak freshness, typically within 24 hours of reaching full size.'
                },
                {
                  step: '06',
                  title: 'Packaging & Delivery',
                  description: 'Fresh mushrooms are carefully packed and delivered to customers within 24 hours of harvest.'
                }
              ].map((process, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-forest-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                      {process.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-earth-900 mb-2">
                      {process.title}
                    </h3>
                    <p className="text-earth-600">{process.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Varieties */}
      <section className="py-16 bg-forest-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Mushroom Varieties</h2>
            <p className="section-subtitle">Premium quality, carefully cultivated</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Button Mushrooms',
                description: 'The versatile favorite. Perfect for salads, soups, and everyday cooking.',
                emoji: '🍄'
              },
              {
                name: 'Oyster Mushrooms',
                description: 'Delicate texture with a mild, savory flavor. Excellent for grilling.',
                emoji: '🍄'
              },
              {
                name: 'Shiitake Mushrooms',
                description: 'Rich, umami-packed flavor. A staple in Asian cuisine.',
                emoji: '🍄'
              },
              {
                name: 'Milky Mushrooms',
                description: 'Creamy and mild, perfect for Indian curries and dishes.',
                emoji: '🍄'
              }
            ].map((variety, index) => (
              <div key={index} className="card p-6 text-center">
                <span className="text-6xl mb-4 block">{variety.emoji}</span>
                <h3 className="text-lg font-semibold text-earth-900 mb-2">
                  {variety.name}
                </h3>
                <p className="text-earth-600 text-sm">{variety.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">The people behind Kanasu Farm</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: 'Rajesh Kumar',
                role: 'Founder & Head Farmer',
                description: '20+ years of agricultural expertise'
              },
              {
                name: 'Priya Sharma',
                role: 'Operations Manager',
                description: 'Ensuring quality in every step'
              },
              {
                name: 'Arun Patel',
                role: 'Customer Relations',
                description: 'Making every customer happy'
              }
            ].map((member, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="w-24 h-24 bg-earth-200 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                  👤
                </div>
                <h3 className="text-lg font-semibold text-earth-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-forest-600 text-sm font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-earth-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
