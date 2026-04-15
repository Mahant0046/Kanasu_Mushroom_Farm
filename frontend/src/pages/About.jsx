import { Heart, Users, Award, Leaf, Sprout, TrendingUp, Globe, ShieldCheck } from 'lucide-react';

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-forest-600 via-forest-700 to-earth-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1504194574166-4eb71d598bd6?w=1920&q=80"
            alt="Mushroom Farm"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 leading-tight">
              About Kanasu Mushroom Farm
            </h1>
            <p className="text-lg text-forest-100 max-w-2xl leading-relaxed">
              Growing nature's finest mushrooms with love, care, and sustainable practices since 2019
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gradient-to-b from-white to-forest-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="section-title text-4xl mb-6">Our Story</h2>
              <p className="text-earth-700 mb-6 text-lg leading-relaxed">
                Kanasu Mushroom Farm began with a simple dream: to provide fresh, organic mushrooms to our local community. What started as a small experimental setup in our backyard has grown into a thriving farm serving customers across the region.
              </p>
              <p className="text-earth-700 mb-6 text-lg leading-relaxed">
                Five years ago, we noticed the lack of truly fresh, chemical-free mushrooms in the market. Most available options were either imported or grown with excessive pesticides. We decided to change that.
              </p>
              <p className="text-earth-700 text-lg leading-relaxed">
                Today, we're proud to grow premium quality mushrooms using sustainable methods that respect both nature and our customers. Every mushroom we produce is a testament to our commitment to quality and health.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="bg-forest-100 px-4 py-2 rounded-lg">
                  <span className="text-forest-700 font-semibold">Since 2019</span>
                </div>
                <div className="bg-forest-100 px-4 py-2 rounded-lg">
                  <span className="text-forest-700 font-semibold">500+ Happy Customers</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-forest-400 to-forest-600 rounded-full blur-2xl opacity-30"></div>
              <div className="relative bg-gradient-to-br from-forest-50 to-white p-8 rounded-3xl shadow-2xl flex items-center justify-center">
                <img 
                  src="/cropped_circle_logo.png" 
                  alt="Kanasu Mushroom Farm" 
                  className="w-64 h-64 object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-forest-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title text-4xl mb-4">Our Values</h2>
            <p className="section-subtitle text-xl">What drives everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-forest-100 hover:border-forest-300 text-center">
              <div className="bg-gradient-to-br from-forest-400 to-forest-600 w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-earth-900 mb-3">
                100% Organic
              </h3>
              <p className="text-earth-600 leading-relaxed">
                No chemical pesticides or fertilizers. Pure, natural growth.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-forest-100 hover:border-forest-300 text-center">
              <div className="bg-gradient-to-br from-forest-400 to-forest-600 w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-earth-900 mb-3">
                Quality First
              </h3>
              <p className="text-earth-600 leading-relaxed">
                Every mushroom meets our strict quality standards.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-forest-100 hover:border-forest-300 text-center">
              <div className="bg-gradient-to-br from-forest-400 to-forest-600 w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-earth-900 mb-3">
                Community Focus
              </h3>
              <p className="text-earth-600 leading-relaxed">
                Supporting local farmers and creating rural employment.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-forest-100 hover:border-forest-300 text-center">
              <div className="bg-gradient-to-br from-forest-400 to-forest-600 w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-earth-900 mb-3">
                Sustainable
              </h3>
              <p className="text-earth-600 leading-relaxed">
                Eco-friendly farming using agricultural waste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cultivation Process */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title text-4xl mb-4">Our Cultivation Process</h2>
            <p className="section-subtitle text-xl">How we grow the perfect mushroom</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: '01',
                  title: 'Substrate Preparation',
                  description: 'We prepare organic substrate from agricultural waste like straw and sawdust, sterilizing it to create the perfect growing medium.',
                  icon: <Sprout className="h-6 w-6" />
                },
                {
                  step: '02',
                  title: 'Spore Inoculation',
                  description: 'High-quality mushroom spores are carefully introduced into the prepared substrate under sterile conditions.',
                  icon: <TrendingUp className="h-6 w-6" />
                },
                {
                  step: '03',
                  title: 'Mycelium Growth',
                  description: 'The spawn colonizes the substrate over 2-3 weeks in a controlled environment with optimal temperature and humidity.',
                  icon: <Globe className="h-6 w-6" />
                },
                {
                  step: '04',
                  title: 'Fruiting',
                  description: 'Mushrooms begin to form when conditions are right. We monitor and adjust light, temperature, and humidity.',
                  icon: <Leaf className="h-6 w-6" />
                },
                {
                  step: '05',
                  title: 'Harvesting',
                  description: 'Mushrooms are harvested at peak freshness, typically within 24 hours of reaching full size.',
                  icon: <Award className="h-6 w-6" />
                },
                {
                  step: '06',
                  title: 'Packaging & Delivery',
                  description: 'Fresh mushrooms are carefully packed and delivered to customers within 24 hours of harvest.',
                  icon: <Heart className="h-6 w-6" />
                }
              ].map((process, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-forest-500 to-forest-700 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                      {process.step}
                    </div>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-forest-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-forest-600">{process.icon}</div>
                      <h3 className="text-xl font-semibold text-earth-900">
                        {process.title}
                      </h3>
                    </div>
                    <p className="text-earth-600 leading-relaxed">{process.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Varieties */}
      <section className="py-20 bg-gradient-to-b from-forest-50 to-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title text-4xl mb-4">Our Mushroom Varieties</h2>
            <p className="section-subtitle text-xl">Premium quality, carefully cultivated</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'Button Mushrooms',
                description: 'The versatile favorite. Perfect for salads, soups, and everyday cooking.',
                emoji: '🍄',
                color: 'from-amber-400 to-amber-600'
              },
              {
                name: 'Oyster Mushrooms',
                description: 'Delicate texture with a mild, savory flavor. Excellent for grilling.',
                emoji: '🍄',
                color: 'from-blue-400 to-blue-600'
              },
              {
                name: 'Shiitake Mushrooms',
                description: 'Rich, umami-packed flavor. A staple in Asian cuisine.',
                emoji: '🍄',
                color: 'from-orange-400 to-orange-600'
              },
              {
                name: 'Milky Mushrooms',
                description: 'Creamy and mild, perfect for Indian curries and dishes.',
                emoji: '🍄',
                color: 'from-purple-400 to-purple-600'
              }
            ].map((variety, index) => (
              <div key={index} className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-forest-100 hover:border-forest-300 text-center">
                <div className={`bg-gradient-to-br ${variety.color} w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500 shadow-md`}>
                  {variety.emoji}
                </div>
                <h3 className="text-xl font-semibold text-earth-900 mb-3">
                  {variety.name}
                </h3>
                <p className="text-earth-600 leading-relaxed">{variety.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title text-4xl mb-4">Meet Our Team</h2>
            <p className="section-subtitle text-xl">The people behind Kanasu Farm</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Rajesh Kumar',
                role: 'Founder & Head Farmer',
                description: '20+ years of agricultural expertise',
                color: 'from-forest-400 to-forest-600'
              },
              {
                name: 'Priya Sharma',
                role: 'Operations Manager',
                description: 'Ensuring quality in every step',
                color: 'from-amber-400 to-amber-600'
              },
              {
                name: 'Arun Patel',
                role: 'Customer Relations',
                description: 'Making every customer happy',
                color: 'from-blue-400 to-blue-600'
              }
            ].map((member, index) => (
              <div key={index} className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-forest-100 hover:border-forest-300 text-center">
                <div className={`bg-gradient-to-br ${member.color} w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500 shadow-md`}>
                  👤
                </div>
                <h3 className="text-xl font-semibold text-earth-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-forest-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-earth-600 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
