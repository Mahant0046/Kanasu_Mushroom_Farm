import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { contactAPI } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await contactAPI.submit(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    try {
      await contactAPI.subscribeNewsletter({ email: newsletterEmail });
      setNewsletterSubmitted(true);
      setNewsletterEmail('');
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  if (submitted) {
    return (
      <div className="py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-3xl font-display font-semibold text-earth-900 mb-4">
              Thank You!
            </h2>
            <p className="text-earth-600 mb-8">
              We've received your message and will get back to you soon.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-primary"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-forest-600 via-forest-700 to-earth-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1920&q=80"
            alt="Mushroom Farm"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 leading-tight">
              Contact Us
            </h1>
            <p className="text-lg text-forest-100 max-w-2xl leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      <div className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-display font-semibold text-earth-900 mb-8">
                Get in Touch
              </h2>
              
              <div className="space-y-6 mb-12">
                <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-forest-100 hover:border-forest-300">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-forest-400 to-forest-600 p-3 rounded-xl text-white mt-1 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-earth-900 mb-2 text-lg">Address</h3>
                      <p className="text-earth-600 leading-relaxed">
                        Farm Road<br />
                        Bangalore, Karnataka<br />
                        India 560001
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-forest-100 hover:border-forest-300">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-forest-400 to-forest-600 p-3 rounded-xl text-white mt-1 group-hover:scale-110 transition-transform duration-300">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-earth-900 mb-2 text-lg">Phone</h3>
                      <p className="text-earth-600 leading-relaxed">+91 98765 43210</p>
                      <p className="text-earth-600 text-sm">Mon-Sat, 9am-6pm</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-forest-100 hover:border-forest-300">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-forest-400 to-forest-600 p-3 rounded-xl text-white mt-1 group-hover:scale-110 transition-transform duration-300">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-earth-900 mb-2 text-lg">Email</h3>
                      <p className="text-earth-600 leading-relaxed">hello@kanasu.com</p>
                      <p className="text-earth-600 text-sm">support@kanasu.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-forest-50 to-white p-8 rounded-2xl shadow-lg border border-forest-200">
                <h3 className="font-semibold text-earth-900 mb-3 text-xl">
                  Subscribe to Our Newsletter
                </h3>
                <p className="text-earth-600 mb-6 leading-relaxed">
                  Get updates on new products, recipes, and special offers.
                </p>
                {newsletterSubmitted ? (
                  <div className="bg-forest-100 text-forest-700 px-4 py-3 rounded-lg font-medium">
                    ✓ Subscribed successfully!
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      required
                      className="input flex-1 px-4 py-3"
                    />
                    <button type="submit" className="btn-primary px-6 py-3">
                      <Send className="h-5 w-5" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-forest-100">
              <h2 className="text-3xl font-display font-semibold text-earth-900 mb-8">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input px-4 py-3 border-2 border-earth-200 focus:border-forest-500 focus:ring-2 focus:ring-forest-200 transition-all duration-300 rounded-lg"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input px-4 py-3 border-2 border-earth-200 focus:border-forest-500 focus:ring-2 focus:ring-forest-200 transition-all duration-300 rounded-lg"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input px-4 py-3 border-2 border-earth-200 focus:border-forest-500 focus:ring-2 focus:ring-forest-200 transition-all duration-300 rounded-lg"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="input px-4 py-3 border-2 border-earth-200 focus:border-forest-500 focus:ring-2 focus:ring-forest-200 transition-all duration-300 rounded-lg"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input px-4 py-3 border-2 border-earth-200 focus:border-forest-500 focus:ring-2 focus:ring-forest-200 transition-all duration-300 rounded-lg resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-primary px-8 py-4 text-lg font-semibold flex items-center justify-center disabled:opacity-50 hover:shadow-lg transition-shadow duration-300 rounded-xl"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                  <Send className="h-5 w-5 ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="bg-gradient-to-b from-forest-50 to-white py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title text-4xl mb-4">Find Us</h2>
            <p className="section-subtitle text-xl">Visit our farm and experience fresh mushrooms</p>
          </div>
          <div className="card p-2 rounded-3xl overflow-hidden shadow-2xl border border-forest-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15382.715597460432!2d74.98187829978579!3d15.447872512320235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8cd70176844d5%3A0xd64403c1b8785e27!2sKarnatak%20Arts%20College%20Dharwad!5e0!3m2!1sen!2sin!4v1776239129388!5m2!1sen!2sin"
              className="w-full h-96 md:h-[500px] rounded-2xl border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Store Location"
            ></iframe>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
