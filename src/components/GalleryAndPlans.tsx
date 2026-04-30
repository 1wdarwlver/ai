import { useState, useEffect, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Calendar, Video, Box, Briefcase, Image as ImageIcon, Trash2, Plus, Banknote, X } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface InternshipPhoto {
  id: string;
  url: string;
  scale: number;
  x: number;
  y: number;
}

export default function GalleryAndPlans() {
  const [internshipPhotos, setInternshipPhotos] = useState<InternshipPhoto[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isAdjusting, setIsAdjusting] = useState(false);
  
  // New State for Education, Language, and Certifications
  const [education, setEducation] = useState("國立高雄科技大學 - 數位多媒體設計系");
  const [languages, setLanguages] = useState("中文 (精通), 英文 (中等), 日文 (初級)");
  const [certificates, setCertificates] = useState("Adobe Certified Professional, JLPT N5");

  const [internshipInfo, setInternshipInfo] = useState({
    period: "2023.07 - 2023.09",
    company: "實習公司名稱"
  });

  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const expenseData = [
    { name: "飯店住宿", value: 60, color: "#0069a5" },
    { name: "租車與油錢", value: 17, color: "#ff7f50" },
    { name: "機票預算", value: 12, color: "#00bcd4" },
    { name: "行程開銷", value: 11, color: "#90e0ef" },
  ];

  // Auto-rotate photos every 2 seconds, but pause when adjusting
  useEffect(() => {
    if (internshipPhotos.length > 1 && !isAdjusting) {
      const timer = setInterval(() => {
        setCurrentPhotoIndex((prev) => (prev + 1) % internshipPhotos.length);
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [internshipPhotos.length, isAdjusting]);

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).map((file: File) => ({
        id: Math.random().toString(36).substr(2, 9),
        url: URL.createObjectURL(file),
        scale: 1,
        x: 0,
        y: 0
      }));
      setInternshipPhotos(prev => [...prev, ...newPhotos]);
    }
  };

  const updatePhotoStyle = (id: string, updates: Partial<Pick<InternshipPhoto, 'scale' | 'x' | 'y'>>) => {
    setInternshipPhotos(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const removePhoto = (id: string, index: number) => {
    setInternshipPhotos(prev => prev.filter(p => p.id !== id));
    if (index <= currentPhotoIndex && currentPhotoIndex > 0) {
      setCurrentPhotoIndex(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col gap-16 pb-24">
      {/* 1. 基本資訊區 (學歷、語言、證照) */}
      <section id="basic-info" className="grid grid-cols-1 gap-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:border-indigo-100 transition-all">
          <div className="space-y-8">
            {/* 學歷 */}
            <div>
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Plus size={14} className="text-indigo-600" /> 學歷
              </h2>
              <input 
                className="text-xl font-bold text-slate-800 bg-transparent border-b border-transparent hover:border-slate-200 focus:border-indigo-500 focus:outline-none w-full"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              />
            </div>
            
            {/* 語言能力 */}
            <div>
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Plus size={14} className="text-indigo-600" /> 語言能力
              </h2>
              <input 
                className="text-lg font-medium text-slate-600 bg-transparent border-b border-transparent hover:border-slate-200 focus:border-indigo-500 focus:outline-none w-full"
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
              />
            </div>

            {/* 專業證照 */}
            <div>
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Plus size={14} className="text-indigo-600" /> 專業證照
              </h2>
              <textarea 
                className="w-full text-slate-600 font-medium bg-slate-50 p-4 rounded-xl focus:outline-none border border-transparent focus:border-indigo-100 min-h-[80px]"
                value={certificates}
                onChange={(e) => setCertificates(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. 實習經驗展現區 */}
      <section id="internship-experience">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Briefcase size={20} className="text-indigo-600" />
          實習經驗
        </h2>
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:border-indigo-100 transition-all">
          <div className="flex flex-col md:flex-row items-start gap-12">
            {/* Left: Info */}
            <div className="flex-1 w-full">
              <input 
                className="text-3xl font-bold text-slate-800 bg-transparent border-b border-transparent hover:border-slate-200 focus:border-indigo-500 focus:outline-none w-full mb-4 md:text-left text-center"
                value={internshipInfo.company}
                onChange={(e) => setInternshipInfo({...internshipInfo, company: e.target.value})}
              />
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm bg-indigo-50 w-fit px-4 py-2 rounded-full mx-auto md:mx-0">
                <Calendar size={14} />
                <input 
                  className="bg-transparent border-b border-transparent hover:border-slate-200 focus:border-indigo-500 focus:outline-none w-32"
                  value={internshipInfo.period}
                  onChange={(e) => setInternshipInfo({...internshipInfo, period: e.target.value})}
                />
              </div>
            </div>

            {/* Right: Carousel - Side panel size with adjustment controls */}
            <div className="w-full md:w-80 shrink-0 relative group/container">
              <div className="aspect-square rounded-3xl overflow-hidden relative border shadow-2xl border-slate-100 group bg-slate-50">
                {internshipPhotos.length > 0 ? (
                  <>
                    <motion.img 
                      key={internshipPhotos[currentPhotoIndex].id}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      src={internshipPhotos[currentPhotoIndex].url} 
                      alt="Internship" 
                      className="w-full h-full object-cover origin-center"
                      style={{ 
                        transform: `scale(${internshipPhotos[currentPhotoIndex].scale}) translate(${internshipPhotos[currentPhotoIndex].x}%, ${internshipPhotos[currentPhotoIndex].y}%)`
                      }}
                    />
                    
                    {/* Adjustment Controls Panel */}
                    <div 
                      onMouseEnter={() => setIsAdjusting(true)}
                      onMouseLeave={() => setIsAdjusting(false)}
                      className="absolute inset-x-0 bottom-0 bg-white/90 backdrop-blur-md p-4 border-t border-slate-100 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-30"
                    >
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">調整照片</p>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[8px] font-bold text-slate-500 uppercase">
                            <span>縮放</span>
                            <span>{Math.round(internshipPhotos[currentPhotoIndex].scale * 100)}%</span>
                          </div>
                          <input 
                            type="range" min="1" max="3" step="0.1" 
                            value={internshipPhotos[currentPhotoIndex].scale}
                            onChange={(e) => updatePhotoStyle(internshipPhotos[currentPhotoIndex].id, { scale: parseFloat(e.target.value) })}
                            className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <span className="text-[8px] font-bold text-slate-500 uppercase">水平</span>
                            <input 
                              type="range" min="-50" max="50" step="1" 
                              value={internshipPhotos[currentPhotoIndex].x}
                              onChange={(e) => updatePhotoStyle(internshipPhotos[currentPhotoIndex].id, { x: parseInt(e.target.value) })}
                              className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[8px] font-bold text-slate-500 uppercase">垂直</span>
                            <input 
                              type="range" min="-50" max="50" step="1" 
                              value={internshipPhotos[currentPhotoIndex].y}
                              onChange={(e) => updatePhotoStyle(internshipPhotos[currentPhotoIndex].id, { y: parseInt(e.target.value) })}
                              className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => removePhoto(internshipPhotos[currentPhotoIndex].id, currentPhotoIndex)}
                      className="absolute top-4 right-4 p-2 bg-red-500/80 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                    {/* Dots indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 group-hover:opacity-0 transition-opacity">
                      {internshipPhotos.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentPhotoIndex ? 'bg-white w-4' : 'bg-white/40'}`}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <label className="w-full h-full flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-100 transition-colors">
                    <ImageIcon size={48} className="mb-2 opacity-20" />
                    <span className="text-xs font-bold uppercase tracking-widest">尚未上傳照片</span>
                    <p className="text-[10px] mt-1 text-slate-300">點擊此處上傳實習生活照</p>
                    <input type="file" className="hidden" multiple accept="image/*" onChange={handlePhotoUpload} />
                  </label>
                )}
                
                {internshipPhotos.length > 0 && (
                  <label className="absolute bottom-4 right-4 p-2 bg-black/50 backdrop-blur-sm text-white rounded-full cursor-pointer hover:bg-black/70 transition-all z-20 shadow-lg group-hover:opacity-0">
                    <Plus size={16} />
                    <input type="file" className="hidden" multiple accept="image/*" onChange={handlePhotoUpload} />
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 日本實習地圖 - NEW */}
      <section id="japan-map">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <ImageIcon size={20} className="text-indigo-600" />
          實習地點地圖
        </h2>
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:border-indigo-100 transition-all">
          <div className="aspect-[21/9] w-full bg-slate-50 relative group">
            {/* Japan Map Iframe Placeholder/Actual */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13264627.18525547!2d131.3326194726207!3d36.21526435777416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34674e0fd77f192f%3A0xf54275141c833139!2z5pel5pys!5e0!3m2!1szh-TW!2stw!4v1714437800000!5m2!1szh-TW!2stw" 
              className="w-full h-full border-none grayscale hover:grayscale-0 transition-all duration-700"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Japan Map"
            ></iframe>
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-100 z-10">
              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">實習足跡</p>
              <p className="text-xs font-bold text-slate-800">日本實習地點分佈</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 3D 個人圖展示區 */}
      <section id="3d-display">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Box size={20} className="text-indigo-600" />
          3D 個人展示空間
        </h2>
        <div className="aspect-video bg-slate-100 rounded-3xl border-2 border-slate-200 overflow-hidden group hover:border-indigo-300 transition-all shadow-inner relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-slate-50 group-hover:bg-white transition-colors z-10">
            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <Box size={32} />
            </div>
            <h3 className="text-6xl font-black mb-10 tracking-tight text-slate-800">個人 3D 作品展示</h3>
            <a 
              href="https://studio.tripo3d.ai/workspace/generate/c4be8ffc-fa02-4b3c-ad8e-0e4dc1e1ff53" 
              target="_blank" 
              rel="noreferrer"
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100"
            >
              進入 3D 展示間
            </a>
          </div>
        </div>
      </section>

      {/* 2. 清明連假計畫表 */}
      <section id="holiday-plan">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Calendar size={20} className="text-[#84a5b8]" />
          清明連假計畫表
        </h2>
        <div className="rounded-3xl text-white shadow-xl relative overflow-hidden bg-[#84a5b8] min-h-[400px] flex flex-col justify-center p-12 transition-all hover:bg-[#7392a5]">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest border border-white/20">
                旅遊規劃
              </span>
              <span className="text-blue-50 text-sm font-semibold">沖繩之旅</span>
            </div>
            <h3 className="text-6xl font-black mb-10 tracking-tight text-white">清明連假行程規劃</h3>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://drive.google.com/file/d/1XgD-TmtfUuaWATcQkoWVmw5QN4GDf9QS/view?usp=sharing" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex px-10 py-5 bg-white text-[#84a5b8] rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all items-center gap-3 shadow-xl"
              >
                <ExternalLink size={24} /> 點此顯示計畫表
              </a>
              <button 
                onClick={() => setShowExpenseModal(true)}
                className="inline-flex px-10 py-5 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all items-center gap-3 shadow-xl cursor-pointer"
              >
                <Banknote size={24} /> 點此顯示花費
              </button>
            </div>
          </div>
        </div>

        {/* Expense Modal */}
        <AnimatePresence>
          {showExpenseModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowExpenseModal(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-[#f0f0f0] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row h-[450px]"
              >
                <button 
                  onClick={() => setShowExpenseModal(false)}
                  className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white text-slate-600 rounded-full transition-colors z-20"
                >
                  <X size={20} />
                </button>

                {/* Left side: Chart */}
                <div className="flex-1 p-8 flex items-center justify-center relative">
                  <div className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={expenseData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={0}
                          dataKey="value"
                        >
                          {expenseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    {/* Donut hole center text - optional but looks good */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">總計畫</p>
                        <p className="text-xl font-black text-slate-800">沖繩</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side: Details */}
                <div className="flex-1 bg-[#eeeeee] p-10 flex flex-col justify-center">
                  <div className="space-y-6">
                    {expenseData.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
                        <span className="text-slate-600 font-bold text-lg">{item.name} ({item.value}%)</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 pt-10 border-t border-slate-300">
                    <p className="text-3xl font-black text-slate-800 tracking-tight">
                      總計：約 $73,320
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        
        {/* 3. 旅遊計畫影片展示區 */}
        <div id="travel-video" className="mt-8">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Video size={14} />
            旅遊計畫影片展示
          </h3>
          <div className="aspect-video bg-black rounded-3xl overflow-hidden border border-slate-200 shadow-2xl relative group">
            <iframe 
              src="https://drive.google.com/file/d/1G9rNPUFIBc4FoftawrztScV9NdTiL4du/preview" 
              className="w-full h-full border-none"
              allow="autoplay"
              title="旅遊計畫影片"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
