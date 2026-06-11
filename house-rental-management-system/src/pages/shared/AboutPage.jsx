// src/pages/shared/AboutPage.jsx
import React from "react";
import { FaBullseye, FaLightbulb, FaUsers, FaChartLine } from "react-icons/fa";

const AboutPage = () => {
  const team = [
    { name: "John Smith", role: "CEO & Founder", image: null },
    { name: "Sarah Johnson", role: "Head of Operations", image: null },
    { name: "Mike Brown", role: "Lead Developer", image: null },
    { name: "Emily Davis", role: "Customer Success", image: null },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About RentalHub</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're revolutionizing the way people find and manage rental
          properties, making the process seamless and transparent for everyone.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white dark:bg-secondary-800 rounded-lg p-8 text-center shadow-md">
          <FaBullseye className="text-4xl text-primary-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
          <p className="text-gray-600">
            To simplify the rental process by providing a trusted platform that
            connects property owners with quality tenants, backed by innovative
            technology and exceptional service.
          </p>
        </div>

        <div className="bg-white dark:bg-secondary-800 rounded-lg p-8 text-center shadow-md">
          <FaLightbulb className="text-4xl text-primary-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">Our Vision</h2>
          <p className="text-gray-600">
            To become the world's most trusted and comprehensive rental
            management platform, empowering millions of users to find their
            perfect home.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <FaUsers className="text-3xl text-primary-600 mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Customer First</h3>
            <p className="text-gray-600">
              We prioritize our users' needs and work tirelessly to exceed
              expectations.
            </p>
          </div>
          <div className="text-center">
            <FaChartLine className="text-3xl text-primary-600 mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">
              Constantly evolving our platform with cutting-edge technology and
              features.
            </p>
          </div>
          <div className="text-center">
            <FaBullseye className="text-3xl text-primary-600 mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Transparency</h3>
            <p className="text-gray-600">
              Building trust through honest communication and clear processes.
            </p>
          </div>
        </div>
      </div>

      {/* Team */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 bg-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 p-8 bg-primary-600 rounded-lg text-white">
        <div className="text-center">
          <div className="text-3xl font-bold">500+</div>
          <div className="text-sm">Properties Listed</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">1000+</div>
          <div className="text-sm">Happy Tenants</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">200+</div>
          <div className="text-sm">Property Owners</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">50+</div>
          <div className="text-sm">Cities Covered</div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
