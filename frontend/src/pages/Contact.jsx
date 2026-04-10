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
      <section className="bg-gradient-to-br from-forest-600 to-earth-700 text-white py-20">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-forest-100 max-w-2xl">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <div className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-display font-semibold text-earth-900 mb-6">
                Get in Touch
              </h2>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-start space-x-4">
                  <div className="text-forest-600 mt-1">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-earth-900 mb-1">Address</h3>
                    <p className="text-earth-600">
                      Farm Road<br />
                      Bangalore, Karnataka<br />
                      India 560001
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-forest-600 mt-1">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-earth-900 mb-1">Phone</h3>
                    <p className="text-earth-600">+91 98765 43210</p>
                    <p className="text-earth-600">Mon-Sat, 9am-6pm</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-forest-600 mt-1">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-earth-900 mb-1">Email</h3>
                    <p className="text-earth-600">hello@kanasu.com</p>
                    <p className="text-earth-600">support@kanasu.com</p>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="card p-6">
                <h3 className="font-semibold text-earth-900 mb-2">
                  Subscribe to Our Newsletter
                </h3>
                <p className="text-earth-600 text-sm mb-4">
                  Get updates on new products, recipes, and special offers.
                </p>
                {newsletterSubmitted ? (
                  <div className="text-forest-600 text-sm">
                    ✓ Subscribed successfully!
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      required
                      className="input flex-1"
                    />
                    <button type="submit" className="btn-primary px-4">
                      <Send className="h-5 w-5" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Form */}
            <div className="card p-8">
              <h2 className="text-2xl font-display font-semibold text-earth-900 mb-6">
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
                      className="input"
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
                      className="input"
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
                    className="input"
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
                    className="input"
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
                    className="input"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-primary flex items-center justify-center disabled:opacity-50"
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
      <section className="bg-earth-100 py-16">
        <div className="container">
          <div className="card p-8 aspect-video flex items-center justify-center bg-earth-200">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-earth-400 mx-auto mb-4" />
              <p className="text-earth-600">Map integration would go here</p>
              <p className="text-earth-500 text-sm">Bangalore, Karnataka, India</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
