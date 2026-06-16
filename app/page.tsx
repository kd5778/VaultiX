"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { Shield, Lock, Zap, ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620118981476-5b8561b2f587?auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center bg-no-repeat opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-slate-900/80 to-slate-900/90"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Secure Password Management
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">VaultiX</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Store, manage, and autofill your passwords securely from anywhere.
              Your digital life deserves world-class protection — all in one place.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="glass-effect rounded-2xl p-6 card-hover">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Military-Grade Security</h3>
              <p className="text-slate-400 text-sm">AES-256 encryption with zero-knowledge architecture</p>
            </div>
            
            <div className="glass-effect rounded-2xl p-6 card-hover">
              <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Smart Organization</h3>
              <p className="text-slate-400 text-sm">Categorize passwords, cards, and Wi-Fi networks</p>
            </div>
            
            <div className="glass-effect rounded-2xl p-6 card-hover">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Lightning Fast</h3>
              <p className="text-slate-400 text-sm">Instant access with one-click copy functionality</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleGetStarted}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl text-lg button-glow transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <div className="text-slate-400 text-sm">
              ✨ Trusted by thousands of users worldwide
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              SOC 2 Compliant
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              End-to-End Encryption
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Zero-Knowledge Architecture
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
