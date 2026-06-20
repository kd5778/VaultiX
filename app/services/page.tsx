"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  Shield,
  Lock,
  Zap,
  Copy,
  Shuffle,
  FolderOpen,
  Eye,
  Globe,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Military-Grade Security",
    description:
      "AES-256 encryption with zero-knowledge architecture ensures your data is protected with the highest security standards.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Lock,
    title: "Smart Organization",
    description:
      "Categorize passwords, credit cards, and Wi-Fi networks into organized sections for easy management and access.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Lightning Fast Access",
    description:
      "One-click copy functionality and instant search make accessing your credentials faster than ever before.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Copy,
    title: "One-Click Copy",
    description:
      "Quickly copy usernames or passwords to clipboard without revealing sensitive data to prying eyes.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Shuffle,
    title: "Password Generator",
    description:
      "Generate strong, unpredictable passwords with customizable length and character sets for maximum security.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: FolderOpen,
    title: "Category Management",
    description:
      "Organize your data into categories like Wi-Fi, Credit Card, Codes, and more for better organization.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Eye,
    title: "Secure Visibility",
    description:
      "Toggle password visibility with confidence, knowing your data is encrypted and protected at all times.",
    color: "from-teal-500 to-cyan-500",
  },
  {
    icon: Globe,
    title: "Cross-Platform Sync",
    description:
      "Access your passwords from anywhere with cloud synchronization and multi-device support.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: RotateCcw,
    title: "Trash & Recovery Vault",
    description:
      "Safely move sensitive records to a secure trash vault instead of deleting them instantly. Restore items anytime or permanently remove them when no longer needed.",
    color: "from-orange-500 to-red-500",
  },
];

const ServicesPage = () => {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-100/20 to-slate-100 dark:from-slate-900 dark:via-purple-900/20 dark:to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/15 dark:bg-purple-500/10 border border-purple-500/30 dark:border-purple-500/20 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Our Services
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">VaultiX Features</span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Experience the next generation of password management with our
              comprehensive suite of security features designed to keep your
              digital life safe and organized.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group glass-effect rounded-2xl p-8 border-2 border-purple-200/50 bg-white/40 dark:bg-slate-800/40 dark:border-purple-500/30 backdrop-blur-md transition-all duration-300 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] dark:hover:border-purple-400 dark:hover:shadow-[0_0_20px_rgba(192,132,252,0.4)] card-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Security Stats */}
          <div className="mt-20">
            <div className="glass-effect rounded-3xl p-8 md:p-12 border-2 border-purple-200/50 bg-white/40 dark:bg-slate-800/40 dark:border-purple-500/30 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] dark:hover:border-purple-400 dark:hover:shadow-[0_0_20px_rgba(192,132,252,0.4)]">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
                  Why Choose VaultiX?
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-lg">
                  Built with security and user experience in mind
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    100% Secure
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    End-to-end encryption with zero-knowledge architecture
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Lightning Fast
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Instant access with sub-200ms response times
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Cross-Platform
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Access from any device, anywhere in the world
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="glass-effect rounded-3xl p-8 md:p-12 border-2 border-purple-200/50 bg-white/40 dark:bg-slate-800/40 dark:border-purple-500/30 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] dark:hover:border-purple-400 dark:hover:shadow-[0_0_20px_rgba(192,132,252,0.4)]">
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
                Ready to Secure Your Digital Life?
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of users who trust VaultiX to protect their
                most sensitive information with military-grade security.
              </p>
              <button
                onClick={handleGetStarted}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
