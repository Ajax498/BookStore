import React from "react";

function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:bg-slate-800 p-6">
      <div className="max-w-3xl bg-white dark:bg-slate-900 text-gray-800 dark:text-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-semibold mb-6 text-center text-indigo-600 dark:text-white">
          About Us
        </h1>
        
        <p className="mb-6 text-lg leading-relaxed">
          Welcome to <strong>bookStore</strong> — your ultimate online bookstore. Whether you're a student, a professional, or simply a curious reader, our goal is to make reading more accessible and affordable.
        </p>

        <p className="mb-6 text-lg leading-relaxed">
          We offer a diverse selection of books across categories, including technology, literature, education, self-help, and more. All books are available digitally, so you can read them from anywhere at any time.
        </p>

        <p className="mb-6 text-lg leading-relaxed">
          Our mission is to support lifelong learners and provide a user-friendly platform for both discovering and enjoying great books.
        </p>

        <p className="mb-6 text-lg leading-relaxed">
          Thank you for visiting — we’re delighted to have you here. Happy reading!
        </p>
      </div>
    </div>
  );
}

export default About;
