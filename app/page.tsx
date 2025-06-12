import Link from 'next/link';
import React from 'react';
import { FaFileAlt, FaLock, FaUser } from 'react-icons/fa';

const App = () => {
  return (
    <div className="bg-nurva3 min-h-screen font-nurvafont border-2 border-black rounded-xl p-4 hover:shadow-lg">
      <header className="flex justify-between p-4">
        <div className="flex items-center">
          <Link href={{
            pathname: '/',
          }}>
            <img src="/fidulogo.png" alt="Logo" className="h-8 w-8 mr-2" />
          </Link>
          <h1 className="text-xl font-bold">Nurva</h1>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center h-3/4">
        <img src="/fidulogo.png" alt="Hero" className="h-32 w-32 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Nurva</h2>
        <p className="text-lg mb-8 border-2 border-white p-2 rounded-2xl">Manage Your microloans with AI</p>

        <div className="bg-nurva3 p-8 rounded-lg shadow-lg">
          <input type="email" placeholder="Email" className="text-black mb-4 p-2 w-full rounded-xl border-2 border-nurva1 glow-border" />
          <input type="password" placeholder="Password" className="text-black mb-4 p-2 w-full rounded-xl border-2 border-nurva1 glow-border" />
          <button className="bg-nurva2 text-nurva3 p-2 mb-2 w-full hover:bg-nurva1 hover:text-nurva3 rounded-3xl hover:border-2 hover:border-nurva2">Create Account</button>
          <Link href={{
            pathname: '/onboarding',
          }}><button className="bg-nurva2 text-nurva3 p-2 w-full hover:bg-nurva1 hover:text-nurva3 rounded-3xl hover:border-2 hover:border-nurva2">Log In</button></Link>
        </div>
      </main>

      <footer className="bg-nurva4 text-white p-1 text-center fixed bottom-0 left-0 w-full border-black rounded-2xl mt-8">
        <div className="flex justify-center">
          <button className="bg-nurva3 text-white text-md p-2 mr-4 mb-2 hover:bg-nurva3 hover:text-nurva1 rounded-3xl flex items-center hover:border-2 hover:border-white"><FaLock size={12} className='mr-4' /> Privacy Policy</button>
          <button className="bg-nurva3 text-white text-md p-2 mr-4 mb-2 hover:bg-nurva3 hover:text-nurva1 rounded-3xl flex items-center hover:border-2 hover:border-white"><FaFileAlt size={12} className='mr-4' /> Terms of Service</button>
          <button className="bg-nurva3 text-white text-md p-2 mb-2 hover:bg-nurva3 hover:text-nurva1 rounded-3xl flex items-center hover:border-2 hover:border-white"><FaUser size={12} className='mr-4' /> Credits</button>
        </div>
      </footer>
    </div>
  );
};

export default App;
