"use client";
import Image from "next/image";
import React from "react";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Globe,
  Download,
  Award,
  Code,
  Users,
  Shield,
} from "lucide-react";

const AboutPage = () => {
  const stats = [
    { icon: Code, label: "1300+", description: "DSA Problems Solved" },
    { icon: Users, label: "9+", description: "Projects Completed" },
    { icon: Award, label: "2+", description: "Years Experience" },
    { icon: Shield, label: "100%", description: "Secure Applications" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-100/20 to-slate-100 dark:from-slate-900 dark:via-purple-900/20 dark:to-slate-900 relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="max-w-4xl w-full">
          
          {/* Main About Me Card with Permanent Glowing Border */}
          <div className="glass-effect rounded-3xl p-8 md:p-12 border-4 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] bg-white/40 dark:bg-slate-800/40 dark:border-purple-400 dark:shadow-[0_0_20px_rgba(192,132,252,0.4)] backdrop-blur-md">
            <div className="flex flex-col items-center text-center gap-8">
              
              {/* Profile Section */}
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1 shadow-2xl">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <Image
                      src="/Krish.png"
                      alt="Krish Dhaked"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Bio Section */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                  About Me
                </h1>

                <p className="text-lg md:text-xl leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl">
                  Hi, I&apos;m{" "}
                  <span className="text-purple-700 dark:text-purple-300 font-semibold">
                    Krish Dhaked
                  </span>
                  , a passionate{" "}
                  <span className="text-purple-700 dark:text-purple-300 font-semibold">
                    competitive programmer
                  </span>{" "}
                  and full-stack developer currently pursuing my B.Tech at{" "}
                  <span className="text-purple-700 dark:text-purple-300 font-semibold">
                    IIIT Allahabad
                  </span>
                  . I thrive on solving complex coding challenges and building
                  intuitive user experiences.
                </p>

                <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                  With over{" "}
                  <span className="text-green-600 dark:text-green-400 font-semibold">
                    1300+ DSA problems
                  </span>{" "}
                  solved, I combine logic with design to build impactful
                  applications. My journey includes web app development,
                  algorithm optimization, and meaningful collaborations on
                  projects like{" "}
                  <span className="text-purple-700 dark:text-purple-300 font-semibold">
                    VaultiX
                  </span>{" "}
                  and{" "}
                  <span className="text-purple-700 dark:text-purple-300 font-semibold">
                    Smart Retail Inventory
                  </span>
                  .
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-2xl">
                {stats.map(({ icon: Icon, label, description }) => (
                  <div
                    key={label}
                    className="text-center p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                      {label}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{description}</div>
                  </div>
                ))}
              </div>

              {/* Contact Section */}
              <div className="w-full max-w-2xl space-y-6">
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Mail className="w-6 h-6 text-purple-400" />
                  Contact Me
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a
                    href="mailto:krishdhaked777@gmail.com"
                    className="flex items-center gap-3 p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-300 group"
                  >
                    <Mail className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Email</div>
                      <div className="text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                        krishdhaked777@gmail.com
                      </div>
                    </div>
                  </a>

                  <a
                    href="tel:+919982722888"
                    className="flex items-center gap-3 p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-300 group"
                  >
                    <Phone className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Phone</div>
                      <div className="text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                        +91 9982722888
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://github.com/kd5778"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 group"
                >
                  <Github className="w-5 h-5 group-hover:text-purple-300 transition-colors" />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://linkedin.com/in/krishdhaked5778"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 group"
                >
                  <Linkedin className="w-5 h-5 group-hover:text-purple-300 transition-colors" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 group"
                >
                  <Globe className="w-5 h-5 group-hover:text-purple-300 transition-colors" />
                  <span>Portfolio</span>
                </a>
              </div>

              {/* Resume Download */}
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105"
              >
                <Download className="w-5 h-5" />
                View Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;