import React, { useState } from "react";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4001/contact", formData); // adjust port if needed
      console.log("Success:", response.data);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending contact message:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const goBack = () => {
    window.history.back(); // Go back to the previous page (or window)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:bg-slate-800 p-4">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 shadow-lg rounded-3xl p-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-indigo-600 dark:text-white">
          Contact Us
        </h2>

        {/* Back Button */}
        <button
          onClick={goBack}
          className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block"
        >
          &larr; Back
        </button>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 text-lg">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800 dark:text-white dark:border-gray-600"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 text-lg">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800 dark:text-white dark:border-gray-600"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 text-lg">Message</label>
            <textarea
              name="message"
              required
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800 dark:text-white dark:border-gray-600"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
