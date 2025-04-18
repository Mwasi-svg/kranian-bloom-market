// src/pages/Contact.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import { MessageCircle, Instagram, Facebook } from 'lucide-react'; // Import MessageCircle icon

const Contact: React.FC = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center text-kranian-700 mb-8">Our Contacts</h1>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <p className="text-gray-700 mb-6">
          We'd love to hear from you! Please find our contact details below.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Contacts</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium text-gray-700">Address:</h3>
            <p className="text-sm text-gray-600">APA Arcade, 2nd Floor Suite 20, Argwings Kodhek Road, Hurlingham. Nairobi Kenya</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium text-gray-700">Phone:</h3>
            <p className="text-sm text-gray-600">(+254) 701 640 801, (+254) 702 726 346</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium text-gray-700">Email:</h3>
            <p className="text-sm text-gray-600">info@kranianfarms.com</p>
          </div>          
        </div>

        {/* Meet Our Team Section */}
        <div className="mt-12">
          <div className="flex justify-center space-x-6 mb-8">
            <a href="https://www.instagram.com/kranianfarms_kenya/" className="text-gray-500 hover:text-kranian-500">
              <Instagram size={32} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61575074558774" className="text-gray-500 hover:text-kranian-500">
              <Facebook size={32} />
            </a>
          </div>
          <h2 className="text-3xl font-bold text-center text-kranian-700 mb-4">Meet Our Team</h2>
          <p className="text-gray-700 text-center mb-8">Our dedicated team is passionate delivering quality product to your table.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Rachel Muturi */}
            <div className="flex flex-col items-center">
              <img
                src="/placeholder.svg"
                alt="Rachel Muturi"
                className="w-48 h-48 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">Rachel Muturi</h3>
              <p className="text-gray-600 mb-2">Director</p>
              <p className="text-gray-700 text-center mb-4">"At Kranian Farms, I grow more than crops--I grow community."</p>
              <div className="flex space-x-4">                
                <a href="mailto:rachel@kranianfarms.com" className="text-gray-500 hover:text-kranian-500">
                  <Mail size={24} />
                </a>
                <a href="tel:+254701640801" className="text-gray-500 hover:text-kranian-500">
                  <Phone size={24} />
                </a>
                <a href="https://wa.me/254701640801" className="text-gray-500 hover:text-kranian-500">
                  <MessageCircle size={24} /> {/* WhatsApp icon */}
                </a>
                {/* Add other social media links as needed */}
              </div>
            </div>

            {/* Brian Senelwa */}
            <div className="flex flex-col items-center">
              <img
                src="/placeholder.svg"
                alt="Brian Senelwa"
                className="w-48 h-48 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">Brian Senelwa</h3>
              <p className="text-gray-600 mb-2">Director</p>
              <p className="text-gray-700 text-center mb-4">"Dedication to quality, transparency, and long-term sustainability."</p>
              <div className="flex space-x-4">                
                <a href="mailto:brian@kranianfarms.com" className="text-gray-500 hover:text-kranian-500">
                  <Mail size={24} />
                </a>
                <a href="tel:+254702726346" className="text-gray-500 hover:text-kranian-500">
                  <Phone size={24} />
                </a>
                <a href="https://wa.me/254702726346" className="text-gray-500 hover:text-kranian-500">
                  <MessageCircle size={24} /> {/* WhatsApp icon */}
                </a>
                {/* Add other social media links as needed */}                
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Contact;