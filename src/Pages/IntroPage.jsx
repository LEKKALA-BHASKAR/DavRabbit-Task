import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus, Lock, Zap, Users, Smartphone, Shield, Bell, Sun, Moon, ChevronDown, Fingerprint, Eye, EyeOff } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function IntroPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);
  const [activeDigit, setActiveDigit] = useState(null);
  const [islandExpanded, setIslandExpanded] = useState(false);
  const [islandContent, setIslandContent] = useState(null);
  const [phoneUnlocked, setPhoneUnlocked] = useState(false);
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);
  const phoneRotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });
  
  const [mockupRef, mockupInView] = useInView({
    triggerOnce: false,
    threshold: 0.5
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setBatteryLevel(prev => Math.max(80, (prev - 0.5) % 100));
    }, 60000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Dynamic Island interaction
    const islandTimer = setTimeout(() => {
      setIslandExpanded(true);
      setIslandContent('Face ID');
      setTimeout(() => {
        setIslandExpanded(false);
        setTimeout(() => {
          setIslandExpanded(true);
          setIslandContent('Unlocking...');
          setTimeout(() => {
            setPhoneUnlocked(true);
            setIslandContent('Unlocked');
            setTimeout(() => {
              setIslandExpanded(false);
              setIslandContent(null);
            }, 1000);
          }, 1500);
        }, 500);
      }, 2000);
    }, 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(islandTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDigitPress = (digit) => {
    setActiveDigit(digit);
    setTimeout(() => setActiveDigit(null), 200);
    
    // Simulate successful passcode entry
    if (digit === 1) {
      setIslandExpanded(true);
      setIslandContent('Face ID');
      setTimeout(() => {
        setIslandExpanded(false);
        setTimeout(() => {
          setIslandExpanded(true);
          setIslandContent('Unlocking...');
          setTimeout(() => {
            setPhoneUnlocked(true);
            setIslandContent('Unlocked');
            setTimeout(() => {
              setIslandExpanded(false);
              setIslandContent(null);
            }, 1000);
          }, 1500);
        }, 500);
      }, 2000);
    }
  };

  const features = [
    {
      title: "Military-Grade Security",
      description: "End-to-end encryption with biometric authentication options including Face ID and Touch ID.",
      icon: <Shield className="w-8 h-8" />,
      color: darkMode ? "text-purple-400" : "text-purple-600",
      bgColor: darkMode ? "bg-purple-900/20" : "bg-purple-100/50"
    },
    {
      title: "Lightning Fast",
      description: "Near-instant authentication with our global CDN and optimized protocols.",
      icon: <Zap className="w-8 h-8" />,
      color: darkMode ? "text-yellow-400" : "text-yellow-600",
      bgColor: darkMode ? "bg-yellow-900/20" : "bg-yellow-100/50"
    },
    {
      title: "Seamless Experience",
      description: "Beautifully designed interface that works across all your Apple devices.",
      icon: <Smartphone className="w-8 h-8" />,
      color: darkMode ? "text-blue-400" : "text-blue-600",
      bgColor: darkMode ? "bg-blue-900/20" : "bg-blue-100/50"
    },
  ];

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} flex flex-col items-center justify-start pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden`}
    >
      {/* Animated background gradient */}
      <motion.div 
        className="fixed inset-0 -z-10"
        style={{
          background: darkMode 
            ? 'radial-gradient(circle at 50% 50%, #1e3a8a 0%, #111827 70%)'
            : 'radial-gradient(circle at 50% 50%, #3b82f6 0%, #e0f2fe 70%)',
          y: backgroundY,
          opacity: 0.7
        }}
      />
      
      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${darkMode ? 'bg-white/10' : 'bg-blue-500/10'}`}
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              width: Math.random() * 10 + 2,
              height: Math.random() * 10 + 2,
              opacity: Math.random() * 0.5 + 0.1
            }}
            animate={{
              y: [null, Math.random() * 100 - 50],
              x: [null, Math.random() * 100 - 50],
              transition: {
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }
            }}
          />
        ))}
      </div>

      {/* iOS Status Bar */}
      <motion.div 
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-3 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-lg' : 'bg-transparent'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
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
      </motion.div>

      {/* Dynamic Island with animations */}
      <motion.div 
        className={`fixed top-3 left-1/2 transform -translate-x-1/2 ${islandExpanded ? 'w-40 h-12' : 'w-32 h-8'} bg-black/80 backdrop-blur-xl rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${isScrolled ? 'scale-90 opacity-90' : 'scale-100 opacity-100'} z-50`}
        animate={{
          width: islandExpanded ? 160 : 128,
          height: islandExpanded ? 48 : 32
        }}
        transition={{ type: 'spring', damping: 15 }}
      >
        <AnimatePresence mode="wait">
          {islandContent ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-white text-xs font-medium flex items-center"
            >
              {islandContent === 'Face ID' && <Fingerprint className="w-4 h-4 mr-2" />}
              {islandContent}
            </motion.div>
          ) : (
            <motion.div
              key="default"
              className="w-4 h-1.5 bg-gray-400/80 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hero Section */}
      <motion.div 
        className="max-w-2xl text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="relative inline-block">
          <motion.div 
            className={`absolute -inset-4 rounded-3xl ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'} blur-lg opacity-75`}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.7, 0.9, 0.7]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <h1 className="relative text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 sm:text-7xl">
            AuthApp
          </h1>
        </div>
        <motion.p 
          className={`mt-6 text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-lg mx-auto`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Your secure gateway to the digital world. Experience authentication reimagined.
        </motion.p>
      </motion.div>

      {/* iPhone Mockup with 3D effects */}
      <motion.div 
        ref={mockupRef}
        className="relative my-12 w-64 h-128 mx-auto"
        style={{
          scale: phoneScale,
          rotate: phoneRotate,
          y: useTransform(scrollYProgress, [0, 1], [0, -50])
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="absolute inset-0 bg-gray-800 rounded-4xl shadow-2xl border-8 border-gray-900 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-10 bg-gray-900 flex items-center justify-center">
            <div className="w-20 h-5 bg-gray-700 rounded-full"></div>
          </div>
          <div className="absolute top-10 left-0 right-0 bottom-0 flex flex-col items-center justify-center p-4">
            <motion.div 
              className={`w-full h-full ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded-3xl overflow-hidden flex flex-col items-center justify-center p-6`}
              initial={{ opacity: 0 }}
              animate={mockupInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              {phoneUnlocked ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full h-full flex flex-col items-center justify-center"
                >
                  <div className={`w-16 h-16 rounded-full mb-6 flex items-center justify-center ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100/50'}`}>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    >
                      <Lock className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </motion.div>
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Welcome back!</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-6 text-center`}>
                    Authentication successful. You're now securely logged in.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 rounded-full ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white font-medium`}
                  >
                    Continue to Dashboard
                  </motion.div>
                </motion.div>
              ) : (
                <>
                  <Lock className={`w-12 h-12 mb-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Unlock AuthApp</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-6`}>Authenticate to continue</p>
                  
                  {/* Animated passcode dots */}
                  <div className="flex space-x-4 mb-6">
                    {[1, 2, 3, 4].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`w-3 h-3 rounded-full ${activeDigit !== null && i < activeDigit ? (darkMode ? 'bg-blue-400' : 'bg-blue-600') : (darkMode ? 'bg-gray-700' : 'bg-gray-300')}`}
                        animate={{
                          scale: activeDigit !== null && i < activeDigit ? [1, 1.2, 1] : 1
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    ))}
                  </div>
                  
                  {/* Interactive passcode grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                      <motion.button 
                        key={num}
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} transition-colors relative overflow-hidden`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDigitPress(num)}
                      >
                        {num}
                        {num === 9 && (
                          <motion.div 
                            className="absolute inset-0 flex items-center justify-center"
                            animate={{
                              opacity: showPasscode ? 0 : 1
                            }}
                          >
                            <Fingerprint className="w-5 h-5" />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between w-full px-4">
                    <button 
                      className={`text-sm font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} transition-colors flex items-center`}
                      onClick={() => setShowPasscode(!showPasscode)}
                    >
                      {showPasscode ? (
                        <>
                          <EyeOff className="w-4 h-4 mr-1" />
                          Hide
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-1" />
                          Show
                        </>
                      )}
                    </button>
                    <button className={`text-sm font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} transition-colors`}>
                      Forgot Passcode?
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
          <div className="absolute bottom-2 left-0 right-0 flex justify-center">
            <div className="w-24 h-1 bg-gray-700 rounded-full"></div>
          </div>
        </div>
        
        {/* Screen reflection effect */}
        <motion.div 
          className="absolute inset-0 rounded-4xl pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0],
            x: [-100, 100]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 5
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </motion.div>
      </motion.div>

      {/* Call-to-Action Buttons with magnetic effect */}
      <motion.div 
        className="mt-8 flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <MagneticButton
          to="/login"
          darkMode={darkMode}
          className={`${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'}`}
          icon={<LogIn className="w-5 h-5 mr-3" />}
          label="Sign In"
        />
        <MagneticButton
          to="/register"
          darkMode={darkMode}
          className={`${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'}`}
          icon={<UserPlus className="w-5 h-5 mr-3" />}
          label="Sign Up"
        />
      </motion.div>

      {/* Feature Highlights with staggered animations */}
      <motion.div 
        ref={featuresRef}
        className="mt-20 w-full max-w-4xl"
        initial={{ opacity: 0 }}
        animate={featuresInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-8 px-4">
          <motion.h2 
            className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0, x: -20 }}
            animate={featuresInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Why Choose AuthApp
          </motion.h2>
          <motion.button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={featuresInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`relative overflow-hidden p-6 rounded-2xl ${darkMode ? 'bg-gray-800/80' : 'bg-white/90'} backdrop-blur-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}
              initial={{ opacity: 0, y: 30 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ 
                y: -5,
                boxShadow: darkMode ? '0 10px 25px -5px rgba(0, 0, 0, 0.4)' : '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className={`absolute -inset-4 rounded-3xl ${feature.bgColor} blur-lg opacity-50 -z-10`}></div>
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-4 ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{feature.description}</p>
              
              {/* Floating animation */}
              <motion.div 
                className={`absolute -z-10 rounded-full ${feature.bgColor}`}
                animate={{
                  y: [0, 15, 0],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{
                  duration: 4 + index,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  width: 100 + index * 20,
                  height: 100 + index * 20,
                  top: -30 + index * 10,
                  right: -30 + index * 10
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* iOS-style Bottom Sheet with gestures */}
      
    </div>
  );
}

// Magnetic button component
const MagneticButton = ({ to, darkMode, className, icon, label }) => {
  const ref = useRef(null);
  
  const handleMouseMove = (e) => {
    const { current } = ref;
    if (!current) return;
    
    const { left, top, width, height } = current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.3;
    const y = (e.clientY - top - height / 2) * 0.3;
    
    current.style.transform = `translate(${x}px, ${y}px)`;
  };
  
  const handleMouseLeave = () => {
    const { current } = ref;
    if (!current) return;
    current.style.transform = 'translate(0, 0)';
  };
  
  return (
    <Link
      to={to}
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={ref}
        className={`flex items-center justify-center px-10 py-5 rounded-xl shadow-lg ${className} text-white font-medium transition-all duration-300`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <span className="relative z-10 flex items-center">
          {icon}
          {label}
        </span>
        <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></span>
      </motion.div>
    </Link>
  );
};