import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus, Lock, Zap, Users, Smartphone, Shield, Bell, Sun, Moon, ChevronDown } from 'lucide-react';

export default function IntroPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setBatteryLevel(prev => Math.max(80, (prev - 0.5) % 100));
    }, 60000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} flex flex-col items-center justify-start pt-20 pb-12 px-4 sm:px-6 lg:px-8`}>
      {/* iOS Status Bar */}
      <div className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-3 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-lg' : 'bg-transparent'}`}>
        <div className="text-sm font-medium">{time}</div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 8.5L4.5 11L9 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 8.5L10.5 11L15 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="w-4 h-4 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3V1M12.5 4.5L14 3M13 8H15M12.5 11.5L14 13M8 13V15M3.5 11.5L2 13M3 8H1M3.5 4.5L2 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="w-16 h-4 bg-black/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-1000" 
              style={{ width: `${batteryLevel}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Dynamic Island */}
      <div 
        className={`fixed top-3 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black/80 backdrop-blur-xl rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${isScrolled ? 'scale-90 opacity-90' : 'scale-100 opacity-100'}`}
      >
        <div className="w-4 h-1.5 bg-gray-400/80 rounded-full"></div>
      </div>

      {/* Hero Section */}
      <div className="max-w-2xl text-center mt-12">
        <div className="relative inline-block">
          <div className={`absolute -inset-4 rounded-3xl ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'} blur-lg opacity-75 animate-pulse-slow`}></div>
          <h1 className="relative text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 sm:text-7xl">
            AuthApp
          </h1>
        </div>
        <p className={`mt-6 text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-lg mx-auto`}>
          Your secure gateway to the digital world. Experience authentication reimagined.
        </p>
      </div>

      {/* iPhone Mockup */}
      <div className="relative my-12 w-64 h-128 mx-auto">
        <div className="absolute inset-0 bg-gray-800 rounded-4xl shadow-2xl border-8 border-gray-900 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-10 bg-gray-900 flex items-center justify-center">
            <div className="w-20 h-5 bg-gray-700 rounded-full"></div>
          </div>
          <div className="absolute top-10 left-0 right-0 bottom-0 flex flex-col items-center justify-center p-4">
            <div className={`w-full h-full ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded-3xl overflow-hidden flex flex-col items-center justify-center p-6`}>
              <Lock className={`w-12 h-12 mb-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Unlock AuthApp</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-6`}>Authenticate to continue</p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                  <button 
                    key={num}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} transition-colors`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <button className={`text-sm font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} transition-colors`}>
                Forgot Passcode?
              </button>
            </div>
          </div>
          <div className="absolute bottom-2 left-0 right-0 flex justify-center">
            <div className="w-24 h-1 bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Call-to-Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Link
          to="/login"
          className={`relative overflow-hidden flex items-center justify-center px-10 py-5 rounded-xl shadow-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'} text-white font-medium transition-all duration-300 transform hover:scale-105 active:scale-95`}
          aria-label="Sign in to your account"
        >
          <span className="relative z-10 flex items-center">
            <LogIn className="w-5 h-5 mr-3" />
            Sign In
          </span>
          <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></span>
        </Link>
        <Link
          to="/register"
          className={`relative overflow-hidden flex items-center justify-center px-10 py-5 rounded-xl shadow-lg ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'} text-white font-medium transition-all duration-300 transform hover:scale-105 active:scale-95`}
          aria-label="Create a new account"
        >
          <span className="relative z-10 flex items-center">
            <UserPlus className="w-5 h-5 mr-3" />
            Sign Up
          </span>
          <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></span>
        </Link>
      </div>

      {/* Feature Highlights */}
      <div className="mt-20 w-full max-w-4xl">
        <div className="flex items-center justify-between mb-8 px-4">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Why Choose AuthApp</h2>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Military-Grade Security",
              description: "End-to-end encryption with biometric authentication options including Face ID and Touch ID.",
              icon: <Shield className="w-8 h-8" />,
              color: darkMode ? "text-purple-400" : "text-purple-600"
            },
            {
              title: "Lightning Fast",
              description: "Near-instant authentication with our global CDN and optimized protocols.",
              icon: <Zap className="w-8 h-8" />,
              color: darkMode ? "text-yellow-400" : "text-yellow-600"
            },
            {
              title: "Seamless Experience",
              description: "Beautifully designed interface that works across all your Apple devices.",
              icon: <Smartphone className="w-8 h-8" />,
              color: darkMode ? "text-blue-400" : "text-blue-600"
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`relative overflow-hidden p-6 rounded-2xl ${darkMode ? 'bg-gray-800/80' : 'bg-white/90'} backdrop-blur-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full ${feature.color} opacity-10 -mr-10 -mt-10`}></div>
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-4 ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* iOS-style Bottom Sheet */}
      <div className={`fixed bottom-0 left-0 right-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-t-3xl shadow-2xl transform transition-transform duration-300 z-40 pt-4 px-6 pb-8 max-w-md mx-auto border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex justify-center mb-2">
          <div className="w-8 h-1 rounded-full bg-gray-400"></div>
        </div>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h3>
          <ChevronDown className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: <Bell className="w-6 h-6 mx-auto" />, label: "Alerts" },
            { icon: <Lock className="w-6 h-6 mx-auto" />, label: "Privacy" },
            { icon: <Users className="w-6 h-6 mx-auto" />, label: "Users" },
            { icon: <Smartphone className="w-6 h-6 mx-auto" />, label: "Devices" },
          ].map((item, index) => (
            <button 
              key={index}
              className={`flex flex-col items-center p-3 rounded-xl ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
            >
              <div className={`w-10 h-10 flex items-center justify-center rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {item.icon}
              </div>
              <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}