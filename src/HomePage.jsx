// src/HomePage.jsx
import React from "react";
import { motion } from "framer-motion";
import heroImg from "./assets/hero.jpg";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { 
  BarChart3, 
  Brain, 
  ShieldCheck, 
  FileSpreadsheet,
  UserCheck,
  FileText as FileTextIcon,
  TrendingUp,
  Upload,
  Search,
  CheckCircle2,
  Award,
  FileText,
  Save,
  ExternalLink,
  Mail,
  MessageCircle,
  Database,
  Settings
} from "lucide-react";

export default function HomePage() {
  const currentHero = heroImg;

  // 2-column staggered grid data
  const learningOutcomes = [
    { icon: <BarChart3 className="w-6 h-6" />, text: "Gain strong analytical and pricing fundamentals.", color: "blue" },
    { icon: <Brain className="w-6 h-6" />, text: "Develop strategic actuarial judgment.", color: "green" },
    { icon: <ShieldCheck className="w-6 h-6" />, text: "Understand risk, regulation, and control frameworks.", color: "purple" },
    { icon: <FileSpreadsheet className="w-6 h-6" />, text: "Build practical models and valuation tools.", color: "orange" }
  ];

  // Process steps timeline
  const processSteps = [
    { icon: <Upload className="w-6 h-6" />, title: "Upload data", description: "Submit your work through the platform", color: "blue" },
    { icon: <Search className="w-6 h-6" />, title: "Run model", description: "Execute actuarial calculations", color: "green" },
    { icon: <CheckCircle2 className="w-6 h-6" />, title: "Validate outputs", description: "Review and verify results", color: "purple" },
    { icon: <Award className="w-6 h-6" />, title: "Approve & submit", description: "Get supervisor approval", color: "orange" }
  ];

  // Resources section
  const resources = [
    { 
      icon: <FileText className="w-6 h-6" />, 
      title: "QAS Reports & Policies", 
      description: "Access Quality Assurance Standards, documentation templates, and internal policy summaries for actuarial and risk teams.",
      color: "blue"
    },
    { 
      icon: <Save className="w-6 h-6" />, 
      title: "File Naming & Saving Formats", 
      description: "Reference the company's standard format for client deliverables, ensuring audit traceability and version control consistency.",
      color: "green"
    },
    { 
      icon: <ExternalLink className="w-6 h-6" />, 
      title: "Training & External Learning Links", 
      description: "Explore curated external actuarial courses, technical tutorials, and CPD resources for skill enhancement.",
      color: "purple"
    }
  ];

  // Support channels
  const supportChannels = [
    { 
      icon: <UserCheck className="w-5 h-5" />, 
      title: "Supervisor Support", 
      description: "For module clarifications and feedback", 
      contact: "Contact your Supervisor",
      color: "blue",
      link: "mailto:supervisor@kenbright.com"
    },
    { 
      icon: <MessageCircle className="w-5 h-5" />, 
      title: "Technical Support", 
      description: "For login or access issues", 
      contact: "IT Help Desk",
      color: "purple", 
      link: "mailto:help@kenbright.com"
    },
    { 
      icon: <FileText className="w-5 h-5" />, 
      title: "Content Support", 
      description: "Training material questions", 
      contact: "Senior Actuarial Team",
      color: "green",
      link: "mailto:training@kenbright.com"
    }
  ];

  // Color utility function
  const getColorClasses = (color, type = "card") => {
    const colors = {
      blue: {
        card: "bg-blue-500/20 border border-blue-400/30 hover:bg-blue-500/30",
        icon: "bg-blue-600/40 text-blue-400",
        text: "text-blue-400",
        button: "bg-blue-500 hover:bg-blue-600"
      },
      green: {
        card: "bg-green-500/20 border border-green-400/30 hover:bg-green-500/30",
        icon: "bg-green-600/40 text-green-400",
        text: "text-green-400",
        button: "bg-green-500 hover:bg-green-600"
      },
      purple: {
        card: "bg-purple-500/20 border border-purple-400/30 hover:bg-purple-500/30",
        icon: "bg-purple-600/40 text-purple-400",
        text: "text-purple-400",
        button: "bg-purple-500 hover:bg-purple-600"
      },
      orange: {
        card: "bg-orange-500/20 border border-orange-400/30 hover:bg-orange-500/30",
        icon: "bg-orange-600/40 text-orange-400",
        text: "text-orange-400",
        button: "bg-orange-500 hover:bg-orange-600"
      },
      yellow: {
        card: "bg-yellow-500/20 border border-yellow-400/30 hover:bg-yellow-500/30",
        icon: "bg-yellow-600/40 text-yellow-400",
        text: "text-yellow-400",
        button: "bg-yellow-500 hover:bg-yellow-600"
      },
      emerald: {
        card: "bg-emerald-500/20 border border-emerald-400/30 hover:bg-emerald-500/30",
        icon: "bg-emerald-600/40 text-emerald-400",
        text: "text-emerald-400",
        button: "bg-emerald-500 hover:bg-emerald-600"
      }
    };
    
    return colors[color]?.[type] || colors.blue[type];
  };

  return (
    <div className="font-sans text-white min-h-screen bg-slate-900">
      {/* HERO SECTION - Your original hero kept intact */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden -mt-20 pt-0">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${currentHero})`,
            filter: "brightness(0.55) contrast(1.02)",
            zIndex: 0,
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(800px 300px at 15% 30%, rgba(0,229,255,0.06), transparent 10%), radial-gradient(600px 200px at 85% 70%, rgba(124,77,255,0.04), transparent 12%)",
            zIndex: 1,
          }}
        />

        <div className="relative z-10 max-w-5xl px-6 text-center mt-0 pt-0">
          <motion.h1
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="leading-tight"
          >
            <span className="block text-2xl md:text-3xl font-medium text-gray-300 mb-2">
              Welcome to
            </span>
            <span
              className="block text-4xl md:text-6xl font-extrabold"
              style={{
                background:
                  "linear-gradient(90deg, #00E5FF 0%, #7C4DFF 70%)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                filter: "drop-shadow(0 6px 24px rgba(0,0,0,0.6))",
              }}
            >
              Kenbright Training Hub
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-8 flex justify-center gap-4"
          >
            <Link
              to="/modules"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              style={{
                background:
                  "linear-gradient(90deg, #00E5FF, #7C4DFF)",
                color: "#041027",
              }}
            >
              Start Training
            </Link>

            <a
              href="#learning"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-white/10 border border-white/20 text-gray-200 hover:bg-white/15 transition-all duration-300 hover:scale-105"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </header>

      {/* SVG DIVIDER */}
      <div className="relative">
        <svg
          className="absolute -top-[1px] w-full h-20 text-slate-900"
          preserveAspectRatio="none"
          viewBox="0 0 1440 150"
        >
          <path
            fill="currentColor"
            d="M0,32L80,42.7C160,53,320,75,480,85.3C640,96,800,96,960,80C1120,64,1280,32,1360,16L1440,0L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </div>

      <main className="relative z-10 bg-slate-900">
        {/* 2-Column Staggered Grid with Colorful Cards */}
        <section id="learning" className="py-20 bg-slate-800/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Learning Outcomes
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Develop essential actuarial capabilities through comprehensive training
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {learningOutcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`rounded-[30px] p-6 flex items-center gap-4 transition-all duration-300 ${getColorClasses(outcome.color, "card")}`}
                >
                  <div className={`p-4 rounded-2xl flex-shrink-0 ${getColorClasses(outcome.color, "icon")}`}>
                    {outcome.icon}
                  </div>
                  <p className="text-white font-medium text-lg">
                    {outcome.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Steps Timeline - Colorful Version */}
        <section className="py-20 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Your Learning Journey
              </h2>
              <p className="text-xl text-gray-300">
                Simple, structured process from start to completion
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6 relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/30 via-green-500/30 to-purple-500/30 transform translate-y-6"></div>
              
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center relative"
                >
                  {/* Step connector dots */}
                  <div className={`hidden md:block absolute -top-4 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full ${getColorClasses(step.color, "button")}`}></div>
                  
                  <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center border ${getColorClasses(step.color, "card")} ${getColorClasses(step.color, "icon")}`}>
                    {step.icon}
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${getColorClasses(step.color, "text")}`}>
                    {step.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Section - Colorful Cards */}
        <section className="py-20 bg-slate-800/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Resources & Reference Materials
              </h2>
              <p className="text-xl text-gray-300">
                Essential tools and documentation for your training journey
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {resources.map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`rounded-[30px] p-6 transition-all duration-300 ${getColorClasses(resource.color, "card")}`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-2xl flex-shrink-0 ${getColorClasses(resource.color, "icon")}`}>
                      {resource.icon}
                    </div>
                    <h3 className={`text-lg font-semibold ${getColorClasses(resource.color, "text")}`}>
                      {resource.title}
                    </h3>
                  </div>
                  <p className="text-gray-300">
                    {resource.description}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`mt-4 px-4 py-2 rounded-lg text-white transition-all ${getColorClasses(resource.color, "button")}`}
                  >
                    Access Resource
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

         {/* Support Section */}
        <section className="py-20 bg-slate-800">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Get Support
              </h2>
              <p className="text-xl text-gray-300">
                Dedicated channels for all your training needs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {supportChannels.map((channel, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    channel.color === 'cyan' 
                      ? 'border-cyan-500/30 bg-cyan-500/10 hover:border-cyan-400' 
                      : channel.color === 'purple'
                      ? 'border-purple-500/30 bg-purple-500/10 hover:border-purple-400'
                      : 'border-teal-500/30 bg-teal-500/10 hover:border-teal-400'
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`relative flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                      channel.color === 'cyan' 
                        ? 'border-cyan-400 text-cyan-400' 
                        : channel.color === 'purple'
                        ? 'border-purple-400 text-purple-400'
                        : 'border-teal-400 text-teal-400'
                    }`}>
                      {channel.icon}
                      {/* Ping animation */}
                      <div className={`absolute inset-0 rounded-full border-2 animate-ping ${
                        channel.color === 'cyan' ? 'border-cyan-400' 
                        : channel.color === 'purple' ? 'border-purple-400'
                        : 'border-teal-400'
                      }`}></div>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {channel.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    {channel.description}
                  </p>
                  <a 
                    href={channel.link}
                    className={`inline-flex items-center gap-2 text-sm font-medium ${
                      channel.color === 'cyan' ? 'text-cyan-400 hover:text-cyan-300'
                      : channel.color === 'purple' ? 'text-purple-400 hover:text-purple-300'
                      : 'text-teal-400 hover:text-teal-300'
                    } transition-colors`}
                  >
                    <Mail className="w-4 h-4" />
                    {channel.contact}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>  

        {/* Final CTA Section
        <section className="py-20 bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-emerald-900/40 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Start Your Learning Journey
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Join hundreds of actuaries who have transformed their skills through our structured training program
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/modules"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Begin Training Now
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section> */}
      </main>

      {/* FOOTER */}
      <footer className="py-12 bg-black/40 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="text-gray-400 text-sm mb-4">
            © {new Date().getFullYear()} Kenbright Actuarial Training Platform
          </div>
          <div className="text-gray-500 text-xs">
            Powered by Kenbright AI
          </div>
        </div>
      </footer>
    </div>
  );
}