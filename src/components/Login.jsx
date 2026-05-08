import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = ({ onBack, onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful login/register
    const userData = {
      name: isRegister ? name : (email.split('@')[0] || 'User'),
      email: email,
      role: email === 'admin@dapurkembar.com' ? 'admin' : 'user'
    };
    onLoginSuccess(userData);
  };

  return (
    <div className="min-h-screen bg-[#F7EFE2] flex flex-col md:flex-row">
      {/* Mobile Back Button */}
      <button 
        onClick={onBack}
        className="md:hidden absolute top-5 left-5 z-10 w-10 h-10 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center text-[#1C1A17] hover:bg-white/80 transition-all"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Image Section (Hidden on mobile, takes half screen on desktop) */}
      <div className="hidden md:flex md:w-1/2 relative bg-[#ad2a2a]/10 overflow-hidden">
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 z-10 w-11 h-11 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200" 
          alt="Dapur Kembar Pastry" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-12">
          <div>
            <h2 className="font-['Cormorant_Garamond'] text-white text-4xl font-semibold italic mb-2">
              Kualitas Premium
            </h2>
            <p className="font-['DM_Sans'] text-white/80 text-sm tracking-wide">
              Masuk untuk kelola pesanan dan nikmati kemudahan bertransaksi di Dapur Kembar.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 min-h-screen relative">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl shadow-[#1C1A17]/5 border border-white">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-[#ad2a2a] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#ad2a2a]/20">
              <span className="text-white font-bold text-sm font-['DM_Sans'] tracking-wide">DK</span>
            </div>
            <h1 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1C1A17] mb-1">
              {isRegister ? 'Daftar Akun' : 'Selamat Datang'}
            </h1>
            <p className="font-['DM_Sans'] text-[#8A8278] text-xs uppercase tracking-widest">
              {isRegister ? 'Lengkapi Data Diri Anda' : 'Silakan Masuk ke Akun Anda'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field (Only for Register) */}
            {isRegister && (
              <div className="space-y-1.5 animate-fade-in">
                <label className="font-['DM_Sans'] text-[11px] font-bold text-[#8A8278] uppercase tracking-wider ml-1">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    required={isRegister}
                    className="w-full px-4 py-3.5 bg-white border border-[#1C1A17]/10 rounded-xl text-[13px] font-['DM_Sans'] font-medium text-[#1C1A17] placeholder:text-[#8A8278] focus:border-[#ad2a2a]/50 focus:outline-none focus:ring-3 focus:ring-[#ad2a2a]/10 transition-all"
                  />
                </div>
              </div>
            )}
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="font-['DM_Sans'] text-[11px] font-bold text-[#8A8278] uppercase tracking-wider ml-1">
                Email atau No. HP
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8278]" strokeWidth={1.8} />
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email / no. hp"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#1C1A17]/10 rounded-xl text-[13px] font-['DM_Sans'] font-medium text-[#1C1A17] placeholder:text-[#8A8278] focus:border-[#ad2a2a]/50 focus:outline-none focus:ring-3 focus:ring-[#ad2a2a]/10 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="font-['DM_Sans'] text-[11px] font-bold text-[#8A8278] uppercase tracking-wider ml-1">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8278]" strokeWidth={1.8} />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                  required
                  className="w-full pl-11 pr-12 py-3.5 bg-white border border-[#1C1A17]/10 rounded-xl text-[13px] font-['DM_Sans'] font-medium text-[#1C1A17] placeholder:text-[#8A8278] focus:border-[#ad2a2a]/50 focus:outline-none focus:ring-3 focus:ring-[#ad2a2a]/10 transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A8278] hover:text-[#1C1A17] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {!isRegister && (
                <div className="flex justify-end pt-1">
                  <a href="#" className="font-['DM_Sans'] text-[11px] font-semibold text-[#ad2a2a] hover:underline underline-offset-2">
                    Lupa kata sandi?
                  </a>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full py-4 bg-[#1C1A17] hover:bg-[#3D3A35] text-white font-['DM_Sans'] font-semibold text-[13px] rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg shadow-[#1C1A17]/20 tracking-wide mt-2"
            >
              {isRegister ? 'Daftar Sekarang' : 'Masuk'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center border-t border-[#1C1A17]/5 pt-6">
            <p className="font-['DM_Sans'] text-[12px] text-[#8A8278]">
              {isRegister ? 'Sudah punya akun? ' : 'Belum punya akun? '}
              <button 
                onClick={() => setIsRegister(!isRegister)}
                className="font-bold text-[#ad2a2a] hover:underline underline-offset-2"
              >
                {isRegister ? 'Masuk di sini' : 'Daftar Sekarang'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
