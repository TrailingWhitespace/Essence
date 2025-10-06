import React from 'react';

// This is an async Server Component
export default async function HomePage() {
  let apiMessage = "Loading message from backend...";
  let apiStatus = "pending";

  try {
    // We fetch data directly from our Express API endpoint.
    // The `cache: 'no-store'` option ensures we get fresh data on every request.
    const res = await fetch('http://localhost:5001/api/health', { cache: 'no-store' });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    apiMessage = data.message;
    apiStatus = data.status;

  } catch (error) {
    console.error("Failed to fetch from API:", error);
    apiMessage = "Failed to load message from backend.";
    apiStatus = "error";
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Frontend + Backend Connection</h1>
        <p className="text-xl text-gray-300">
          The Next.js frontend has successfully fetched data from the Express backend.
        </p>
        <div className="mt-8 p-6 border border-gray-700 rounded-lg bg-gray-800 shadow-lg">
          <p className="text-lg">
            <span className="font-semibold text-cyan-400">Backend Message:</span> "{apiMessage}"
          </p>
          <p className="text-lg mt-2">
            <span className="font-semibold text-cyan-400">Backend Status:</span>{' '}
            <span className={`font-bold ${apiStatus === 'OK' ? 'text-green-400' : 'text-red-400'}`}>
              {apiStatus}
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}