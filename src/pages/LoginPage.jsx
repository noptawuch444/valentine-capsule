import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Lock, ArrowRight, AlertCircle } from 'lucide-react';

export const LoginPage = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'love123') {
            sessionStorage.setItem('adminAuth', 'true');
            navigate('/admin');
        } else {
            setError(true);
            setPassword('');
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="w-full max-w-md relative z-10">
                <div className="bg-[#1e293b]/50 backdrop-blur-2xl border border-white/5 p-12 rounded-[40px] shadow-2xl space-y-8 text-center">
                    <div className="flex justify-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-red-500 rounded-3xl flex items-center justify-center shadow-lg shadow-pink-500/20 rotate-3 hover:rotate-0 transition-transform duration-500">
                            <Heart className="text-white fill-white w-10 h-10" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-black text-white tracking-tight">Secret Entry</h1>
                        <p className="text-slate-400 font-medium">Please enter your magic code to continue</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-5 flex items-center text-slate-500 group-focus-within:text-pink-500 transition-colors">
                                <Lock size={20} />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Unlock Code..."
                                className={`w-full bg-[#0f172a]/50 border ${error ? 'border-red-500 animate-shake' : 'border-white/10'} focus:border-pink-500/50 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-slate-600 outline-none transition-all focus:ring-4 focus:ring-pink-500/5`}
                                autoFocus
                            />
                        </div>

                        {error && (
                            <div className="flex items-center justify-center gap-2 text-red-400 text-sm font-bold animate-fade-in">
                                <AlertCircle size={16} />
                                <span>รหัสผ่านไม่ถูกต้อง ลองใหม่อีกครั้งครับ</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-white text-slate-900 font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-pink-500 hover:text-white transition-all duration-300 group shadow-lg active:scale-95"
                        >
                            <span>Open Dashboard</span>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="pt-4">
                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">Valentine Capsule System v1.0</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
