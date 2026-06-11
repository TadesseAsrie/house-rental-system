// src/pages/shared/ContactPage.jsx
import React from "react";
import ContactForm from "../../components/forms/ContactForm";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-12">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4">Send us a Message</h2>
          <ContactForm />
        </div>

        {/* Office Information */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">Our Office</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary-600 mt-1" />
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-gray-600">
                    123 Rental Street, Suite 100
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FaPhone className="text-primary-600 mt-1" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FaEnvelope className="text-primary-600 mt-1" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600">info@rentalhub.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">Find Us</h2>
            <div className="h-64 bg-gray-200 dark:bg-secondary-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Google Map View</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
