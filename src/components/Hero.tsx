import { useState, useRef, ChangeEvent } from "react";
import { motion } from "motion/react";
import { User, Edit3, Check, Star, Camera } from "lucide-react";

export default function Hero() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageStyle, setImageStyle] = useState({ scale: 1, x: 0, y: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState({
    name: "宋沅罄",
    title: "學生",
    description: "這是我的個人數位展示空間"
  });

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setImageStyle({ scale: 1, x: 0, y: 0 }); // Reset style on new upload
    }
  };

  return (
    <section id="hero-section" className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24 pb-16 bg-white">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden opacity-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-[120px]"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1.1 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          className="absolute -bottom-48 -right-48 w-[500px] h-[500px] bg-slate-100 rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-8 relative group">
        {/* Edit Toggle Button */}
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="absolute -top-8 right-8 flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 rounded-xl text-[10px] font-bold uppercase tracking-wider border border-slate-200 shadow-sm hover:border-indigo-300 transition-all z-20 group-hover:opacity-100 opacity-0 md:opacity-0"
        >
          {isEditing ? <><Check size={12} /> 儲存變更</> : <><Edit3 size={12} /> 編輯個人資料</>}
        </button>

        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-3xl"
          >
            {/* Avatar Section */}
            <div className="relative mb-8 inline-block mx-auto">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*"
              />
              <div 
                onClick={() => isEditing && !profileImage && fileInputRef.current?.click()}
                className={`w-24 h-24 bg-indigo-50 border-4 border-white shadow-lg rounded-full flex items-center justify-center text-indigo-400 overflow-hidden relative ${isEditing ? 'cursor-pointer group/avatar' : ''}`}
              >
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover origin-center"
                    style={{ 
                      transform: `scale(${imageStyle.scale}) translate(${imageStyle.x}%, ${imageStyle.y}%)`
                    }}
                  />
                ) : (
                  <User size={40} />
                )}
                
                {isEditing && (
                  <div 
                    onClick={(e) => {
                      if (profileImage) { e.stopPropagation(); fileInputRef.current?.click(); }
                    }}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center text-white"
                  >
                    <Camera size={24} />
                  </div>
                )}
              </div>
              
              {isEditing && profileImage && (
                <div className="absolute -right-48 top-1/2 -translate-y-1/2 w-40 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-50 flex flex-col gap-3 scale-90 md:scale-100">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[8px] font-bold text-slate-400 uppercase">
                      <span>縮放</span>
                      <span>{Math.round(imageStyle.scale * 100)}%</span>
                    </div>
                    <input 
                      type="range" min="1" max="3" step="0.1" 
                      value={imageStyle.scale}
                      onChange={(e) => setImageStyle({...imageStyle, scale: parseFloat(e.target.value)})}
                      className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[8px] font-bold text-slate-400 uppercase">
                      <span>水平位移</span>
                      <span>{imageStyle.x}%</span>
                    </div>
                    <input 
                      type="range" min="-50" max="50" step="1" 
                      value={imageStyle.x}
                      onChange={(e) => setImageStyle({...imageStyle, x: parseInt(e.target.value)})}
                      className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[8px] font-bold text-slate-400 uppercase">
                      <span>垂直位移</span>
                      <span>{imageStyle.y}%</span>
                    </div>
                    <input 
                      type="range" min="-50" max="50" step="1" 
                      value={imageStyle.y}
                      onChange={(e) => setImageStyle({...imageStyle, y: parseInt(e.target.value)})}
                      className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                </div>
              )}

              {isEditing && (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-1.5 rounded-full shadow-md z-10 cursor-pointer"
                >
                  <Camera size={14} />
                </div>
              )}
            </div>

            <div className="relative mb-4">
              {isEditing ? (
                <div className="relative">
                  <input
                    value={content.name}
                    onChange={(e) => setContent({ ...content, name: e.target.value })}
                    className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 text-center w-full bg-slate-50 border border-indigo-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    placeholder="輸入您的姓名"
                  />
                  <div className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[8px] px-2 py-0.5 rounded-full font-bold uppercase">姓名</div>
                </div>
              ) : (
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
                  {content.name}
                </h1>
              )}
            </div>

            <div className="relative mb-8">
              {isEditing ? (
                <div className="relative">
                  <input
                    value={content.title}
                    onChange={(e) => setContent({ ...content, title: e.target.value })}
                    className="text-lg md:text-xl font-bold text-indigo-600 text-center w-full bg-slate-50 border border-indigo-200 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    placeholder="輸入您的頭銜或簡介"
                  />
                  <div className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[8px] px-2 py-0.5 rounded-full font-bold uppercase">簡介</div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-lg md:text-xl font-bold text-indigo-600 uppercase tracking-widest">
                  <Star size={16} fill="currentColor" />
                  <span>{content.title}</span>
                  <Star size={16} fill="currentColor" />
                </div>
              )}
            </div>
            
            <div className="relative max-w-2xl mx-auto">
              {isEditing ? (
                <div className="relative">
                  <textarea
                    value={content.description}
                    onChange={(e) => setContent({ ...content, description: e.target.value })}
                    className="text-slate-500 text-base md:text-lg text-center w-full bg-slate-50 border border-indigo-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-100 min-h-[140px]"
                    rows={4}
                    placeholder="輸入完整的個人介紹..."
                  />
                  <div className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[8px] px-2 py-0.5 rounded-full font-bold uppercase">個人詳細介紹</div>
                </div>
              ) : (
                <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                  {content.description}
                </p>
              )}
            </div>

            <div className="mt-12 flex items-center justify-center gap-6">
              <div className="h-px bg-slate-100 flex-grow"></div>
              <div className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em] whitespace-nowrap">
                Personal Portfolio Space
              </div>
              <div className="h-px bg-slate-100 flex-grow"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
