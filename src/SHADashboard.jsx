// src/SHADashboard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import shaLogo from "./assets/SHA_Logo2.png";
import kenbrightLogo from "./assets/kenbright-logo-white.png";
import {
    BarChart3,
    FileText,
    ArrowRight,
    Sparkles,
    BookOpen,
    Laptop,
    Gamepad2,
    PieChart,
    LogOut,
    Home,
    ClipboardList,
    ChevronDown,
    Menu,
    X,
    Wrench,
    Globe
} from "lucide-react";
import { useState, useEffect } from "react";

// SHA Brand Colors
const colors = {
    blue: "#0066B3",
    green: "#8BC53F",
    darkBlue: "#003D6B",
    purple: "#9D4EDD",
    cyan: "#00D4FF",
    orange: "#FF6B35"
};

// Integrated Navbar Component
function DashboardNavbar({ user, onLogout }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [toolsOpen, setToolsOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toolsItems = [
        { name: "Industry Insights", icon: <Globe className="w-4 h-4" />, color: colors.blue, link: "/insights" },
        { name: "Resources", icon: <FileText className="w-4 h-4" />, color: colors.green, link: "/resources" },
        { name: "Training Links", icon: <BookOpen className="w-4 h-4" />, color: colors.purple, link: "/SHA-training-links" },
        { name: "Claims Dashboard", icon: <PieChart className="w-4 h-4" />, color: colors.cyan, link: "/claims-dashboard" },
        { name: "VBA Claims Plot", icon: <BarChart3 className="w-4 h-4" />, color: colors.orange, link: "/vba-claims" }
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-xl shadow-lg">
            {/* Reduced padding: py-5 to py-3 */}
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8 py-3.5">
                <div className="flex items-center gap-4">
                    <Link to="/SHADashboard" className="flex items-center gap-2">
                        {/* Adjusted logo positioning for smaller navbar */}
                        <div className="relative w-32 h-32 -mb-10 -mt-6 flex items-center justify-center">
                            <img
                                src={shaLogo}
                                alt="SHA Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </Link>

                    <div className="hidden lg:flex items-center gap-1">
                        {/* Reduced button padding: px-5 py-3 to px-4 py-2 */}
                        <Link to="/"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl transition font-medium text-gray-700 hover:bg-gray-100">
                            <Home className="w-5 h-5" />
                            <span className="text-base">Home</span>
                        </Link>

                        <div className="relative"
                            onMouseEnter={() => setToolsOpen(true)}
                            onMouseLeave={() => setToolsOpen(false)}>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-xl transition font-medium text-gray-700 hover:bg-gray-100">
                                <Wrench className="w-5 h-5" />
                                <span className="text-base">Tools</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${toolsOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <div className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ${toolsOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
                                <div className="p-2">
                                    {toolsItems.map((item, i) => (
                                        <Link key={i} to={item.link}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition group">
                                            <div className="p-2 rounded-lg transition-all group-hover:scale-110"
                                                style={{ background: `${item.color}15`, color: item.color }}>
                                                {item.icon}
                                            </div>
                                            <span className="text-gray-700 font-medium">{item.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Link to="/SHAmodules"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl transition font-medium text-gray-700 hover:bg-gray-100">
                            <ClipboardList className="w-5 h-5" />
                            <span className="text-base">Training Modules</span>
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {user && user.name && (
                        <>
                            <div className="hidden md:flex items-center gap-3 mr-3">
                                {/* Reduced avatar size: w-12 h-12 to w-10 h-10 */}
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base"
                                    style={{ background: `linear-gradient(135deg, ${colors.purple}, ${colors.blue})` }}>
                                    {user.name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <div>
                                    {/* Reduced text sizes */}
                                    <div className="font-semibold text-sm text-gray-800">
                                        {user.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {user.email}
                                    </div>
                                </div>
                            </div>
                            {/* Reduced button padding */}
                            <button onClick={onLogout}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 text-red-500 hover:bg-red-500/30 transition font-medium border border-red-500/30 text-base">
                                <LogOut className="w-5 h-5" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </>
                    )}

                    {/* Reduced mobile menu button size */}
                    <button onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden p-2.5 rounded-xl text-gray-700 hover:bg-gray-100">
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu (unchanged) */}
            <div className={`lg:hidden overflow-hidden transition-all duration-500 ${mobileOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <div className="bg-white border-t border-gray-100 py-6 px-8 space-y-3">
                    <Link to="/"
                        className="flex items-center gap-3 px-5 py-4 rounded-xl hover:bg-gray-50 text-gray-700 text-base"
                        onClick={() => setMobileOpen(false)}>
                        <Home className="w-6 h-6" style={{ color: colors.blue }} /> Home
                    </Link>

                    <div className="px-5 py-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">Tools</div>

                    {toolsItems.map((item, i) => (
                        <Link key={i} to={item.link}
                            className="flex items-center gap-3 px-5 py-4 rounded-xl hover:bg-gray-50 text-gray-700 text-base"
                            onClick={() => setMobileOpen(false)}>
                            <span style={{ color: item.color }}>{item.icon}</span> {item.name}
                        </Link>
                    ))}

                    <Link to="/SHAmodules"
                        className="flex items-center gap-3 px-5 py-4 rounded-xl hover:bg-gray-50 text-gray-700 text-base"
                        onClick={() => setMobileOpen(false)}>
                        <ClipboardList className="w-6 h-6" style={{ color: colors.green }} /> Training Modules
                    </Link>

                    {user && user.name && (
                        <button onClick={() => { onLogout(); setMobileOpen(false); }}
                            className="flex items-center justify-center gap-3 px-5 py-4 rounded-xl text-red-500 hover:bg-red-50 w-full text-base">
                            <LogOut className="w-6 h-6" /> Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default function SHADashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('user');
        sessionStorage.removeItem('showWelcome');
        sessionStorage.removeItem('welcomeName');
        navigate('/');
    };

    const quickAccessCards = [
        { title: "IFRS17 Game", description: "Interactive learning experience to master IFRS 17 concepts", icon: <Gamepad2 className="w-8 h-8" />, color: colors.cyan, link: "/ifrs17-game" },
        { title: "Actuarial Training Hub", description: "Comprehensive training modules for actuarial professionals", icon: <BookOpen className="w-8 h-8" />, color: colors.blue, link: "/SHAmodules" },
        { title: "IFRS 17 Digital Training", description: "Digital training platform for IFRS 17 implementation", icon: <Laptop className="w-8 h-8" />, color: colors.green, link: "/ifrs17-digital" },
        { title: "Claims Dashboard", description: "Analyze and visualize claims data efficiently", icon: <PieChart className="w-8 h-8" />, color: colors.purple, link: "/claims-dashboard" },
        { title: "VBA Claims Plot", description: "Visual analytics tools for claims analysis", icon: <BarChart3 className="w-8 h-8" />, color: colors.orange, link: "/vba-claims" },
        { title: "Resources", description: "Documentation, guides & reference materials", icon: <FileText className="w-8 h-8" />, color: colors.darkBlue, link: "/SHA-training-links" }
    ];

    return (
        <div className="font-sans text-white min-h-screen" style={{
            background: `radial-gradient(1000px at 80% 20%, ${colors.blue}15, transparent 70%),
                radial-gradient(800px at 20% 80%, ${colors.green}15, transparent 70%),
                radial-gradient(600px at 60% 50%, ${colors.purple}08, transparent 70%),
                linear-gradient(180deg, #001529 0%, #002847 100%)`
        }}>
            <DashboardNavbar user={user} onLogout={handleLogout} />

            {/* Reduced padding-top to match smaller navbar: pt-24 to pt-20 */}
            <div className="pt-20">
                <header className="relative flex items-center justify-center overflow-hidden py-12">
                    <div className="absolute inset-0" style={{
                        background: `radial-gradient(circle at 20% 30%, ${colors.blue}20, transparent 50%),
                            radial-gradient(circle at 80% 70%, ${colors.green}15, transparent 50%),
                            linear-gradient(to bottom, rgba(6, 18, 28, 0.7), rgba(0, 40, 71, 0.8))`,
                        zIndex: 1
                    }} />

                    <div className="relative z-10 max-w-6xl px-6 text-center">
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }} className="space-y-4">

                            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border"
                                style={{ background: `linear-gradient(135deg, ${colors.blue}20, ${colors.green}20)`, borderColor: `${colors.green}40` }}>
                                <Sparkles className="w-3.5 h-3.5" style={{ color: colors.green }} />
                                <span className="text-md font-semibold text-gray-200">
                                    Welcome back, {user?.name || user?.email?.split('@')[0] || 'User'}!
                                </span>
                            </motion.div>

                            <h1 className="leading-tight mt-6">
                                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    className="block text-2xl md:text-3xl font-medium mb-3 tracking-wider text-gray-200"
                                    style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                                    Your Dashboard
                                </motion.span>
                                <motion.span initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="block text-3xl md:text-4xl font-extrabold mb-4 leading-tight"
                                    style={{
                                        background: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.green} 100%)`,
                                        WebkitBackgroundClip: "text", 
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text", 
                                        filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))"
                                    }}>
                                    SHA Actuarial Hub
                                </motion.span>
                            </h1>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.6 }}
                                className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                                {quickAccessCards.map((card, index) => (
                                    <motion.div key={index}
                                        whileHover={{ scale: 1.03, y: -3, boxShadow: `0 0 30px ${card.color}80, 0 0 60px ${card.color}40` }}
                                        className="group cursor-pointer outline-none">
                                        <Link to={card.link}
                                            className="block rounded-xl p-6 backdrop-blur-md border-2 transition-all duration-300 h-full outline-none ring-0"
                                            style={{
                                                background: `linear-gradient(135deg, ${card.color}20, ${card.color}08)`,
                                                borderColor: `${card.color}60`,
                                                boxShadow: `0 0 20px ${card.color}50, 0 0 40px ${card.color}20`
                                            }}>
                                            <div className="flex flex-col items-center text-center">
                                                <div className="p-4 rounded-lg mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                                                    style={{ background: `${card.color}25`, color: card.color, boxShadow: `0 0 15px ${card.color}60, 0 0 30px ${card.color}30` }}>
                                                    {card.icon}
                                                </div>
                                                <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                                                <p className="text-gray-300 text-sm leading-relaxed mb-3">{card.description}</p>
                                                <div className="mt-4 flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition"
                                                    style={{ color: card.color }}>
                                                    Open <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </header>
            </div>

            <footer className="py-8 backdrop-blur-xl border-t"
                style={{ background: 'linear-gradient(to right, rgba(0, 61, 107, 0.95), rgba(0, 51, 89, 0.95))', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <img src={shaLogo} alt="SHA Logo" className="h-12 w-auto" />
                            <div className="text-white text-sm font-medium">© {new Date().getFullYear()} SHA Training Platform</div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-white text-lg font-medium">Powered by</span>
                            <img src={kenbrightLogo} alt="Kenbright Logo" className="h-16 w-auto" />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}