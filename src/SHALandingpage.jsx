// src/SHALandingpage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    ChevronLeft,
    ChevronRight,
    Sparkles,
    ArrowRight,
    Brain,
    Target,
    Shield,
    TrendingUp,
    Users,
    LogOut
} from "lucide-react";
import AuthModal from "./components/Auth/AuthModal";
import shaLogo from "./assets/SHA_Logo2.png";

// SHA Brand Colors
const colors = {
    blue: "#0066B3",
    green: "#8BC53F",
    darkBlue: "#003D6B",
    purple: "#9D4EDD",
    cyan: "#00D4FF",
    orange: "#FF6B35"
};

// Carousel Slides
const carouselSlides = [
    {
        title: "Master Actuarial Science",
        subtitle: "Comprehensive training for insurance professionals",
        highlight: "17+ Modules Available",
        cta: "Start Learning Today"
    },
    {
        title: "IFRS 17 Expertise",
        subtitle: "Stay ahead with regulatory compliance training",
        highlight: "Industry Standard",
        cta: "Explore IFRS 17"
    },
    {
        title: "Data-Driven Decisions",
        subtitle: "Learn advanced analytics and modeling techniques",
        highlight: "Practical Skills",
        cta: "View Curriculum"
    },
    {
        title: "Protect What Matters",
        subtitle: "Building secure futures through actuarial excellence",
        highlight: "Family Coverage",
        cta: "Join Now"
    }
];

const slideBackgrounds = [
    `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.blue} 50%, ${colors.green}90 100%)`,
    `linear-gradient(135deg, ${colors.blue} 0%, ${colors.purple} 50%, ${colors.darkBlue} 100%)`,
    `linear-gradient(135deg, ${colors.green}dd 0%, ${colors.blue} 50%, ${colors.darkBlue} 100%)`,
    `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.cyan}80 50%, ${colors.blue} 100%)`
];

export default function SHALandingpage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [showAuthModal, setShowAuthModal] = useState(false);
    const navigate = useNavigate();

    // Check if user is logged in
    useEffect(() => {
        const checkLoginStatus = () => {
            const user = localStorage.getItem('user');
            if (user) {
                try {
                    const userData = JSON.parse(user);
                    setIsLoggedIn(true);
                    setUserName(userData.name || userData.email?.split('@')[0] || 'User');
                } catch (e) {
                    setIsLoggedIn(false);
                    setUserName("");
                }
            } else {
                setIsLoggedIn(false);
                setUserName("");
            }
        };

        checkLoginStatus();

        const handleStorageChange = () => checkLoginStatus();
        window.addEventListener('storage', handleStorageChange);

        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Auto-advance carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);

    // Show auth modal
    const showAuth = () => {
        setShowAuthModal(true);
    };

    // Handle successful authentication - UPDATED
    const handleAuthSuccess = (userData) => {
        // Save user to localStorage
        localStorage.setItem("user", JSON.stringify(userData));

        // Set welcome session flag
        sessionStorage.setItem("showWelcome", "true");
        sessionStorage.setItem("welcomeName", userData.name);

        // Close modal
        setShowAuthModal(false);

        // Force page reload to update App.jsx state and navigate to dashboard
        window.location.href = "/SHADashboard";
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        sessionStorage.removeItem('showWelcome');
        sessionStorage.removeItem('welcomeName');
        setIsLoggedIn(false);
        setUserName("");
        // Refresh the page to update UI
        window.location.reload();
    };

    const goToDashboard = () => navigate('/SHADashboard');

    return (
        <div className="min-h-screen bg-gray-900 overflow-hidden">
            {/* Auth Modal */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onAuthSuccess={handleAuthSuccess}
            />

            {/* NAVBAR - Keep original height but extend logo downwards */}
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-white/95 backdrop-blur-xl shadow-2xl" : "bg-black/20 backdrop-blur-sm"
                }`}>
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8 py-4"> {/* Keep py-4 */}
                    {/* SHA Logo - Left - Clean big logo */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            {/* Remove the gradient background element too */}
                            <div className="relative w-32 h-32 -mb-8 -mt-3 flex items-center justify-center">
                                {/* Clean transparent logo */}
                                <img
                                    src={shaLogo}
                                    alt="SHA Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                        <div className={`hidden sm:block ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                            <div className="font-bold text-lg leading-tight">SHA Actuarial Hub</div>
                            <div className="text-xs opacity-70">Professional Training Platform</div>
                        </div>
                    </div>

                    {/* Login/Signup or User Actions - Right */}
                    <div className="flex items-center gap-3">
                        {isLoggedIn ? (
                            <>
                                <button
                                    onClick={goToDashboard}
                                    className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 border-2 ${
                                        isScrolled 
                                        ? 'bg-white text-gray-800 border-gray-200 hover:bg-gray-50 hover:border-gray-300' 
                                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30 backdrop-blur-sm'
                                    }`}
                                >
                                    Dashboard
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                                        isScrolled 
                                        ? 'text-gray-600 hover:text-red-600 hover:bg-red-50' 
                                        : 'text-white/80 hover:text-red-400 hover:bg-white/10'
                                    }`}
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                                {/* Moved "Hi, user" to the end */}
                                <div className="hidden md:flex items-center gap-3 ml-4 border-l border-gray-300/50 pl-4"> {/* Added ml-4, border, and pl-4 */}
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base"
                                        style={{ background: `linear-gradient(135deg, ${colors.purple}, ${colors.blue})` }}>
                                        {userName?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <span className={`text-base font-medium ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                                        Hi, {userName}
                                    </span>
                                </div>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={showAuth}
                                    className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
                                        }`}
                                >
                                    Login
                                </button>
                                <button
                                    onClick={showAuth}
                                    className="px-6 py-2.5 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                    style={{
                                        background: `linear-gradient(135deg, ${colors.blue}, ${colors.green})`,
                                        boxShadow: `0 4px 20px ${colors.blue}50`
                                    }}
                                >
                                    Sign Up Free
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* CAROUSEL */}
            <div className="relative pt-28">
                <div className="relative h-[500px] md:h-[600px] overflow-hidden">
                    {carouselSlides.map((slide, i) => (
                        <div
                            key={i}
                            className={`absolute inset-0 transition-all duration-700 ease-in-out ${currentSlide === i
                                ? 'opacity-100 translate-x-0'
                                : i < currentSlide
                                    ? 'opacity-0 -translate-x-full'
                                    : 'opacity-0 translate-x-full'
                                }`}
                            style={{ background: slideBackgrounds[i] }}
                        >
                            {/* Decorative Elements */}
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="absolute top-10 right-10 w-64 h-64 rounded-full blur-3xl opacity-30" style={{ background: colors.green }} />
                                <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full blur-3xl opacity-20" style={{ background: colors.cyan }} />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: 'white' }} />
                                <div
                                    className="absolute inset-0 opacity-10"
                                    style={{
                                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                                        backgroundSize: '50px 50px'
                                    }}
                                />
                            </div>

                            {/* Content */}
                            <div className="relative h-full max-w-7xl mx-auto px-4 lg:px-8 flex items-center">
                                <div className="grid lg:grid-cols-2 gap-8 items-center w-full">
                                    {/* Left - Text */}
                                    <div className="text-white z-10">
                                        <div
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                                            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)' }}
                                        >
                                            <Sparkles className="w-4 h-4" style={{ color: colors.green }} />
                                            <span className="text-sm font-semibold">{slide.highlight}</span>
                                        </div>
                                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                                            {slide.title}
                                        </h1>
                                        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-lg">
                                            {slide.subtitle}
                                        </p>
                                        <button
                                            onClick={isLoggedIn ? goToDashboard : showAuth}
                                            className="px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all hover:scale-105 hover:shadow-2xl"
                                            style={{
                                                background: colors.green,
                                                boxShadow: `0 10px 40px ${colors.green}50`
                                            }}
                                        >
                                            {isLoggedIn ? "Go to Dashboard" : slide.cta}
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Right - Visual */}
                                    <div className="hidden lg:flex justify-end">
                                        <div className="relative">
                                            <div
                                                className="w-[400px] h-[300px] rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
                                                style={{
                                                    background: 'rgba(255,255,255,0.1)',
                                                    backdropFilter: 'blur(20px)',
                                                    border: '1px solid rgba(255,255,255,0.2)'
                                                }}
                                            >
                                                <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                                                    <div className="flex -space-x-4 mb-6">
                                                        {['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'].map((c, j) => (
                                                            <div
                                                                key={j}
                                                                className="w-14 h-14 rounded-full border-4 border-white/20 flex items-center justify-center text-white font-bold"
                                                                style={{ background: c }}
                                                            >
                                                                {String.fromCharCode(65 + j)}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <p className="text-white/90 text-lg font-semibold">Join 500+ Actuaries</p>
                                                    <p className="text-white/60 text-sm mt-2">Learning Together</p>
                                                    <div className="flex gap-4 mt-6">
                                                        <div className="px-4 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.15)' }}>
                                                            <div className="text-2xl font-black text-white">17+</div>
                                                            <div className="text-xs text-white/70">Modules</div>
                                                        </div>
                                                        <div className="px-4 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.15)' }}>
                                                            <div className="text-2xl font-black text-white">120h</div>
                                                            <div className="text-xs text-white/70">Content</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="absolute -top-4 -left-4 px-4 py-2 rounded-xl shadow-xl animate-bounce"
                                                style={{ background: colors.green }}
                                            >
                                                <span className="text-white font-bold text-sm">🎓 New Modules!</span>
                                            </div>
                                            <div
                                                className="absolute -bottom-4 -right-4 px-6 py-3 rounded-xl shadow-xl"
                                                style={{ background: 'white' }}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <TrendingUp className="w-5 h-5" style={{ color: colors.green }} />
                                                    <span className="font-bold" style={{ color: colors.darkBlue }}>98% Success Rate</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Navigation */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all hover:scale-110 backdrop-blur-sm shadow-xl"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all hover:scale-110 backdrop-blur-sm shadow-xl"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                        {carouselSlides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentSlide(i)}
                                className={`h-3 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-10 bg-white shadow-lg' : 'w-3 bg-white/40 hover:bg-white/60'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* FEATURES SECTION */}
            <section className="py-20 px-4 lg:px-8 relative" style={{ background: '#ffffff' }}>
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2
                            className="text-4xl lg:text-5xl font-black mb-4"
                            style={{
                                background: `linear-gradient(135deg, ${colors.blue}, ${colors.green})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            Why Choose SHA Hub?
                        </h2>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                            Comprehensive actuarial training designed by industry experts
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: <Brain className="w-8 h-8" />, title: "Expert Content", desc: "Industry-leading curriculum", color: colors.blue },
                            { icon: <Target className="w-8 h-8" />, title: "Practical Skills", desc: "Real-world applications", color: colors.green },
                            { icon: <Shield className="w-8 h-8" />, title: "Compliance Ready", desc: "IFRS 17 & regulations", color: colors.purple },
                            { icon: <TrendingUp className="w-8 h-8" />, title: "Career Growth", desc: "Advance your expertise", color: colors.cyan }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="group p-8 rounded-3xl border-2 transition-all duration-500 hover:scale-105 cursor-pointer"
                                style={{
                                    background: `linear-gradient(135deg, ${item.color}10, ${item.color}05)`,
                                    borderColor: `${item.color}25`,
                                    boxShadow: `0 4px 20px ${item.color}10`
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = `0 10px 40px ${item.color}30`;
                                    e.currentTarget.style.borderColor = `${item.color}50`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = `0 4px 20px ${item.color}10`;
                                    e.currentTarget.style.borderColor = `${item.color}25`;
                                }}
                            >
                                <div
                                    className="p-4 rounded-2xl w-fit mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3"
                                    style={{ background: `${item.color}15`, color: item.color }}
                                >
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2" style={{ color: colors.darkBlue }}>{item.title}</h3>
                                <p className="text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TEAM SECTION */}
            <section className="py-20 px-4 lg:px-8" style={{ background: 'linear-gradient(180deg, #001020 0%, #000810 100%)' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                                style={{ background: `${colors.cyan}20`, border: `1px solid ${colors.cyan}40` }}
                            >
                                <Users className="w-4 h-4" style={{ color: colors.cyan }} />
                                <span className="text-sm font-semibold" style={{ color: colors.cyan }}>Collaborative Learning</span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-black text-white mb-6">
                                Learn Together, <span style={{ color: colors.green }}>Grow Together</span>
                            </h2>
                            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                                Join a community of actuarial professionals collaborating on real-world challenges.
                            </p>
                            <div className="space-y-4 mb-8">
                                {[
                                    "Interactive team workshops and case studies",
                                    "Peer-to-peer knowledge sharing sessions",
                                    "Expert-led masterclasses and Q&A sessions",
                                    "Real-time collaboration on actuarial models"
                                ].map((text, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: colors.green }}>
                                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-300">{text}</span>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={isLoggedIn ? goToDashboard : showAuth}
                                className="px-8 py-4 rounded-xl font-bold text-white text-lg flex items-center gap-3 transition-all hover:scale-105"
                                style={{
                                    background: `linear-gradient(135deg, ${colors.cyan}, ${colors.blue})`,
                                    boxShadow: `0 10px 40px ${colors.cyan}30`
                                }}
                            >
                                {isLoggedIn ? "Continue Learning" : "Join Our Community"}
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="relative hidden lg:block">
                            <div
                                className="relative w-full h-[400px] rounded-3xl overflow-hidden"
                                style={{
                                    background: `linear-gradient(135deg, ${colors.blue}30, ${colors.green}20)`,
                                    border: `2px solid ${colors.blue}40`
                                }}
                            >
                                <div className="absolute inset-0 flex items-center justify-center p-8">
                                    <div className="relative w-full h-full">
                                        <div
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-24 rounded-lg"
                                            style={{ background: colors.darkBlue, border: `2px solid ${colors.blue}60` }}
                                        >
                                            <div className="w-full h-16 rounded-t-lg p-2" style={{ background: colors.blue }}>
                                                <div className="flex gap-1">
                                                    <div className="w-2 h-2 rounded-full bg-red-400" />
                                                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                                                    <div className="w-2 h-2 rounded-full bg-green-400" />
                                                </div>
                                            </div>
                                        </div>
                                        {[
                                            { x: '15%', y: '20%', color: '#FF6B6B', name: 'A' },
                                            { x: '75%', y: '15%', color: '#4ECDC4', name: 'B' },
                                            { x: '85%', y: '60%', color: '#45B7D1', name: 'C' },
                                            { x: '20%', y: '70%', color: '#96CEB4', name: 'D' },
                                            { x: '50%', y: '85%', color: '#FFEAA7', name: 'E' }
                                        ].map((member, i) => (
                                            <div
                                                key={i}
                                                className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
                                                style={{ left: member.x, top: member.y, animationDelay: `${i * 0.2}s` }}
                                            >
                                                <div
                                                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-xl"
                                                    style={{ background: member.color, boxShadow: `0 0 20px ${member.color}60` }}
                                                >
                                                    {member.name}
                                                </div>
                                            </div>
                                        ))}
                                        <div
                                            className="absolute top-4 right-4 px-3 py-2 rounded-lg text-xs font-semibold animate-bounce"
                                            style={{ background: colors.green, color: 'white' }}
                                        >
                                            Live Session
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-12 px-4 lg:px-8 border-t border-white/10" style={{ background: '#000a15' }}>
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white"
                            style={{ background: `linear-gradient(135deg, ${colors.blue}, ${colors.green})` }}
                        >
                            SHA
                        </div>
                        <span className="text-white/60">© {new Date().getFullYear()} SHA Actuarial Hub. All rights reserved.</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-white/60">Powered by</span>
                        <div
                            className="px-6 py-3 rounded-xl font-bold text-white"
                            style={{
                                background: `linear-gradient(135deg, ${colors.blue}40, ${colors.green}40)`,
                                border: `1px solid ${colors.green}50`
                            }}
                        >
                            KENBRIGHT
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}