// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message'
      });
    }

    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Maybe integrate with a CRM

    // For now, just return success
    res.status(200).json({
      success: true,
      message: 'Thank you for contacting us. We will get back to you soon!'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Subscribe to newsletter
// @route   POST /api/contact/newsletter
// @access  Public
exports.subscribeNewsletter = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address'
      });
    }

    // In a real application, you would:
    // 1. Save email to database (with duplicate check)
    // 2. Send confirmation email
    // 3. Integrate with email marketing service (Mailchimp, etc.)

    res.status(200).json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!'
    });
  } catch (error) {
    next(error);
  }
};
