import React, { useState } from 'react';
import { ArrowLeft, Lock, Eye, EyeOff, ShieldCheck, User } from 'lucide-react';

// ─── Admin Credentials ───────────────────────────────────────────────────────
const ADMIN_CREDENTIALS = { username: 'admin', password: 'dapurkembar123' };

const Login = ({ onBack, onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate a small async delay
    setTimeout(() => {
      setLoading(false);
      if (
        username.trim() === ADMIN_CREDENTIALS.username &&
        password === ADMIN_CREDENTIALS.password
      ) {
        onLoginSuccess({ name: 'Administrator', username, role: 'admin' });
      } else {
        setError('Username atau password salah. Silakan coba lagi.');
        triggerShake();
      }
    }, 600);
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

      {/* Image Section */}
      <div className="hidden md:flex md:w-1/2 relative bg-[#ad2a2a]/10 overflow-hidden">
        <button
          onClick={onBack}
          className="absolute top-8 left-8 z-10 w-11 h-11 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200"
          alt="Dapur Kembar"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-[#e8a87c]" />
              <span className="text-[#e8a87c] text-xs font-bold uppercase tracking-widest font-['DM_Sans']">Admin Portal</span>
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-white text-4xl font-semibold italic mb-2">
              Dapur Kembar
            </h2>
            <p className="font-['DM_Sans'] text-white/80 text-sm tracking-wide">
              Panel khusus admin untuk mengelola menu dan pesanan pelanggan.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 min-h-screen relative">
        <div
          className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl shadow-[#1C1A17]/5 border border-white"
          style={shake ? { animation: 'shake 0.4s ease' } : {}}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ad2a2a] to-[#7a1d1d] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#ad2a2a]/30">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <h1 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1C1A17] mb-1">
              Admin Login
            </h1>
            <p className="font-['DM_Sans'] text-[#8A8278] text-xs uppercase tracking-widest">
              Masuk ke Panel Administrator
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              <p className="text-xs font-semibold text-red-700 font-['DM_Sans']">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-1.5">
              <label className="font-['DM_Sans'] text-[11px] font-bold text-[#8A8278] uppercase tracking-wider ml-1">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8278]" strokeWidth={1.8} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(''); }}
                  placeholder="Masukkan username admin"
                  required
                  autoComplete="username"
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#1C1A17]/10 rounded-xl text-[13px] font-['DM_Sans'] font-medium text-[#1C1A17] placeholder:text-[#8A8278] focus:border-[#ad2a2a]/50 focus:outline-none focus:ring-2 focus:ring-[#ad2a2a]/10 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="font-['DM_Sans'] text-[11px] font-bold text-[#8A8278] uppercase tracking-wider ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8278]" strokeWidth={1.8} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="Masukkan password"
                  required
                  autoComplete="current-password"
                  className="w-full pl-11 pr-12 py-3.5 bg-white border border-[#1C1A17]/10 rounded-xl text-[13px] font-['DM_Sans'] font-medium text-[#1C1A17] placeholder:text-[#8A8278] focus:border-[#ad2a2a]/50 focus:outline-none focus:ring-2 focus:ring-[#ad2a2a]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A8278] hover:text-[#1C1A17] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#ad2a2a] to-[#7a1d1d] hover:from-[#c03232] hover:to-[#8a2222] text-white font-['DM_Sans'] font-semibold text-[13px] rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg shadow-[#ad2a2a]/25 tracking-wide mt-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Memverifikasi...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Masuk ke Dashboard
                </>
              )}
            </button>
          </form>

        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
};

export default Login;
