import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const CallbackModal = ({ isOpen, onClose, servicesList, theme, initialSelectedService }) => { // Add initialSelectedService prop
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [errors, setErrors] = useState({});

  const isDarkMode = theme === 'dark';

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setName('');
      setPhone('');
      setEmail('');
      // Use initialSelectedService if provided (it will be '' from CTA or a title from a card)
      // The <select> element's "Select a service" option has value=""
      setSelectedService(initialSelectedService || ''); 
      setErrors({});
    }
  }, [isOpen, servicesList, initialSelectedService]); // Add initialSelectedService to dependencies

  if (!isOpen) {
    return null;
  }

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\+?([0-9\s-]{7,15})$/.test(phone)) {
      newErrors.phone = 'Invalid phone number format.';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address.';
    }
    if (!selectedService) newErrors.service = 'Please select a service.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Callback Request Submitted:', { name, phone, email, selectedService });
      // Here you would typically send the data to a backend
      onClose(); // Close modal on successful submission
    }
  };

  const modalBgColor = isDarkMode ? 'bg-neutral-800' : 'bg-white';
  const textColor = isDarkMode ? 'text-neutral-100' : 'text-gray-900';
  const inputBgColor = isDarkMode ? 'bg-neutral-700' : 'bg-gray-100';
  const inputBorderColor = isDarkMode ? 'border-neutral-600' : 'border-gray-300';
  const inputFocusBorderColor = isDarkMode ? 'focus:border-orange-400' : 'focus:border-orange-500';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm">
      <div className={`relative w-full max-w-lg p-6 sm:p-8 rounded-xl shadow-2xl ${modalBgColor} ${textColor}`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isDarkMode ? 'text-neutral-400 hover:bg-neutral-700' : 'text-gray-500 hover:bg-gray-200'}`}
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Request a Callback</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-neutral-300' : 'text-gray-700'}`}>Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2.5 rounded-lg border ${inputBorderColor} ${inputBgColor} ${textColor} focus:ring-orange-500 ${inputFocusBorderColor} transition-shadow focus:shadow-md`}
              placeholder="e.g., John Doe"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="phone" className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-neutral-300' : 'text-gray-700'}`}>Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full px-4 py-2.5 rounded-lg border ${inputBorderColor} ${inputBgColor} ${textColor} focus:ring-orange-500 ${inputFocusBorderColor} transition-shadow focus:shadow-md`}
              placeholder="e.g., +91 9876543210"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="email" className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-neutral-300' : 'text-gray-700'}`}>Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2.5 rounded-lg border ${inputBorderColor} ${inputBgColor} ${textColor} focus:ring-orange-500 ${inputFocusBorderColor} transition-shadow focus:shadow-md`}
              placeholder="e.g., john.doe@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="service" className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-neutral-300' : 'text-gray-700'}`}>Service of Interest</label>
            <select
              id="service"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className={`w-full px-4 py-2.5 rounded-lg border ${inputBorderColor} ${inputBgColor} ${textColor} focus:ring-orange-500 ${inputFocusBorderColor} transition-shadow focus:shadow-md appearance-none`}
            >
              <option value="" disabled>Select a service</option>
              {servicesList && servicesList.map(service => (
                <option key={service.id} value={service.title}>{service.title}</option>
              ))}
            </select>
            {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default CallbackModal;
