import React from 'react';
import { FaBox, FaClock, FaChartLine, FaCreditCard } from 'react-icons/fa';
import Link from 'next/link';

const TrackingScreen = () => {
  const itemsSold = 150;
  const timeRemaining = '2 months';
  const creditScore = 750;

  return (
    <div className="bg-nurva4 min-h-screen font-nurvafont border-2 border-black rounded-xl p-4 hover:shadow-lg">
      <header className="flex justify-between p-4">
        <div className="flex items-center">
          <Link href={{ pathname: '/' }}>
            <img src="/fidulogo.png" alt="Logo" className="h-8 w-8 mr-2" />
          </Link>
          <h1 className="text-xl font-bold">Nurva</h1>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center h-3/4">
        <h2 className="text-2xl font-bold mb-8 border-2 border-white rounded-2xl p-4">Tracking Dashboard</h2>

        <div className="bg-nurva4 p-8 rounded-xl shadow-lg w-full max-w-md">
          <div className="flex items-center justify-between mb-4 bg-nurva3 rounded-lg p-4">
            <div className="flex items-center">
              <FaBox className="inline-block mr-2 text-nurva1" />
              <p className="text-lg font-bold">Items Sold:</p>
            </div>
            <p className="text-lg font-bold">{itemsSold}</p>
          </div>

          <div className="flex items-center justify-between mb-4 bg-nurva3 rounded-lg p-4">
            <div className="flex items-center">
              <FaClock className="inline-block mr-2 text-nurva1" />
              <p className="text-lg font-bold">Time Remaining:</p>
            </div>
            <p className="text-lg font-bold">{timeRemaining}</p>
          </div>

          <div className="flex items-center justify-between mb-4 bg-nurva3 rounded-lg p-4">
            <div className="flex items-center">
              <FaCreditCard className="inline-block mr-2 text-nurva1" />
              <p className="text-lg font-bold">Credit Score:</p>
            </div>
            <p className="text-lg font-bold bg-nurva2 rounded-xl p-2 tex text-nurva4">{creditScore}</p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default TrackingScreen;
