/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import Hero from "./components/Hero";
import GalleryAndPlans from "./components/GalleryAndPlans";
import { Sparkles } from "lucide-react";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-200">
      <div className="container mx-auto px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs italic">AI</span>
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-800">個人數位空間</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
          <a href="#hero-section" className="hover:text-brand-accent transition-colors">首頁</a>
          <a href="#basic-info" className="hover:text-brand-accent transition-colors">個人簡歷</a>
          <a href="#internship-experience" className="hover:text-brand-accent transition-colors">實習經驗</a>
          <a href="#japan-map" className="hover:text-brand-accent transition-colors">日本地圖</a>
          <a href="#3d-display" className="hover:text-brand-accent transition-colors">3D 展示</a>
          <a href="#holiday-plan" className="hover:text-brand-accent transition-colors">連假計畫</a>
        </div>

        <button className="px-4 py-2 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-slate-800 transition-colors">
          Export Site
        </button>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="h-12 bg-white border-t border-slate-200">
      <div className="container mx-auto px-8 h-full flex items-center justify-between text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
        <span>Professional Personal Portfolio v2.0</span>
        <div className="flex gap-6 items-center">
          <span>Security: Private</span>
          <span>© 2024 個人展示空間</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Banner Section */}
        <Hero />
        
        {/* Main Content Area */}
        <div id="content-area" className="container mx-auto px-8 py-12">
          <section className="max-w-4xl mx-auto">
            <GalleryAndPlans />
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

