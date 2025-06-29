import React from "react";

function Cards({ item }) {
  return (
    <div className="my-4 p-2">
      <div className="card w-72 bg-base-100 shadow-md hover:scale-105 transition-transform duration-200 dark:bg-slate-900 dark:text-white dark:border rounded-xl">
        <figure className="w-full h-48 bg-white flex items-center justify-center">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain p-2"
          />
        </figure>

        <div className="card-body p-3">
          <h2 className="card-title text-base truncate">{item.name}</h2>

          {/* Category added back here */}
          <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1">
            {item.category}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-300 truncate">{item.title}</p>

          <div className="mt-4">
            <a
              href={`http://localhost:4001${item.pdfUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200"
            >
              Read PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
