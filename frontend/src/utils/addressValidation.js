// Indian States and Union Territories
const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry'
];

// Common cities in major states (simplified list for validation)
const MAJOR_CITIES = {
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Erode', 'Tiruppur', 'Vellore'],
  'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Dharwad', 'Mangalore', 'Belgaum', 'Gulbarga'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur'],
  'Delhi': ['Delhi', 'New Delhi'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Kollam', 'Thrissur'],
  'Andhra Pradesh': ['Hyderabad', 'Visakhapatnam', 'Vijayawada', 'Guntur', 'Warangal'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Allahabad', 'Meerut'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer'],
  'Punjab': ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala'],
  'Haryana': ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Karnal'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur']
};

/**
 * Validate Indian phone number (10 digits)
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Validate Indian PIN code (6 digits)
 */
export const validatePinCode = (pinCode) => {
  const pinCodeRegex = /^[1-9][0-9]{5}$/;
  return pinCodeRegex.test(pinCode);
};

/**
 * Validate state name (case-insensitive)
 */
export const validateState = (state) => {
  if (!state) return false;
  const normalizedState = state.trim();
  return INDIAN_STATES.some(s => 
    s.toLowerCase() === normalizedState.toLowerCase() ||
    s.toLowerCase().includes(normalizedState.toLowerCase())
  );
};

/**
 * Get normalized state name
 */
export const getNormalizedState = (state) => {
  if (!state) return null;
  const normalizedState = state.trim();
  const found = INDIAN_STATES.find(s => 
    s.toLowerCase() === normalizedState.toLowerCase() ||
    s.toLowerCase().includes(normalizedState.toLowerCase())
  );
  return found || null;
};

/**
 * Validate city name (basic validation)
 */
export const validateCity = (city, state) => {
  if (!city || city.trim().length < 2) return false;
  
  // If state is provided, check if city is in the major cities list
  if (state) {
    const normalizedState = getNormalizedState(state);
    if (normalizedState && MAJOR_CITIES[normalizedState]) {
      return MAJOR_CITIES[normalizedState].some(c => 
        c.toLowerCase() === city.trim().toLowerCase()
      );
    }
  }
  
  // Basic validation: at least 2 characters, letters and spaces only
  const cityRegex = /^[a-zA-Z\s]{2,}$/;
  return cityRegex.test(city.trim());
};

/**
 * Validate complete shipping address
 */
export const validateShippingAddress = (address) => {
  const errors = {};

  // Validate name
  if (!address.name || address.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  // Validate phone
  if (!address.phone) {
    errors.phone = 'Phone number is required';
  } else if (!validatePhone(address.phone)) {
    errors.phone = 'Please enter a valid 10-digit Indian phone number';
  }

  // Validate street address
  if (!address.street || address.street.trim().length < 5) {
    errors.street = 'Street address must be at least 5 characters';
  }

  // Validate city
  if (!address.city) {
    errors.city = 'City is required';
  } else if (!validateCity(address.city, address.state)) {
    errors.city = 'Please enter a valid city name';
  }

  // Validate state
  if (!address.state) {
    errors.state = 'State is required';
  } else if (!validateState(address.state)) {
    errors.state = 'Please enter a valid Indian state';
  }

  // Validate ZIP code
  if (!address.zipCode) {
    errors.zipCode = 'ZIP code is required';
  } else if (!validatePinCode(address.zipCode)) {
    errors.zipCode = 'Please enter a valid 6-digit Indian PIN code';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Format phone number for display
 */
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.substring(0, 5)} ${cleaned.substring(5)}`;
  }
  return phone;
};

/**
 * Get state suggestions for autocomplete
 */
export const getStateSuggestions = (input) => {
  if (!input || input.length < 2) return [];
  const normalizedInput = input.toLowerCase();
  return INDIAN_STATES.filter(state =>
    state.toLowerCase().includes(normalizedInput)
  ).slice(0, 10);
};

/**
 * Get city suggestions for autocomplete
 */
export const getCitySuggestions = (input, state) => {
  if (!input || input.length < 2) return [];
  const normalizedInput = input.toLowerCase();
  
  if (state) {
    const normalizedState = getNormalizedState(state);
    if (normalizedState && MAJOR_CITIES[normalizedState]) {
      return MAJOR_CITIES[normalizedState]
        .filter(city => city.toLowerCase().includes(normalizedInput))
        .slice(0, 10);
    }
  }
  
  return [];
};

export default {
  validatePhone,
  validatePinCode,
  validateState,
  validateCity,
  validateShippingAddress,
  formatPhoneNumber,
  getStateSuggestions,
  getCitySuggestions,
  getNormalizedState
};
