import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, Mail, KeyRound, ArrowLeft, AlertTriangle } from 'lucide-react';
import { ADMIN_API } from '../../utils/api';

const AdminLogin = () => {
  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Forgot Password State
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Lockout / Unlock State
  const [isLockedMode, setIsLockedMode] = useState(false);
  const [unlockOtp, setUnlockOtp] = useState('');

  // Global State
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post(`${ADMIN_API}/login`, { username, password });
      localStorage.setItem('adminToken', data.token);
      if (data.role) {
        localStorage.setItem('adminRole', data.role);
      }
      localStorage.setItem('refreshToken', data.refreshToken);
      navigate('/admin/dashboard');
    } catch (err) {
      const responseData = err.response?.data;
      setError(responseData?.message || 'Login failed');
      if (responseData?.locked) {
        setIsLockedMode(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendUnlockOtp = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const { data } = await axios.post(`${ADMIN_API}/login-otp/send`, { username });
      setSuccess(data.message || 'Unlock OTP sent to your registered email.');
      setIsOtpMode(true); // Reusing isOtpMode for unlock OTP entry
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyUnlockOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post(`${ADMIN_API}/login-otp/verify`, { username, otp: unlockOtp });
      // Upon success, we get the login tokens
      localStorage.setItem('adminToken', data.token);
      if (data.role) {
        localStorage.setItem('adminRole', data.role);
      }
      localStorage.setItem('refreshToken', data.refreshToken);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.post(`${ADMIN_API}/forgot-password`, { email });
      setSuccess('OTP has been sent to your email.');
      setIsOtpMode(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post(`${ADMIN_API}/reset-password`, { email, otp, newPassword });
      setSuccess('Password reset successfully! You can now login.');
      setIsForgotMode(false);
      setIsOtpMode(false);
      setUsername('');
      setPassword('');
      setEmail('');
      setOtp('');
      setNewPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const resetAllModes = () => {
    setIsForgotMode(false);
    setIsLockedMode(false);
    setIsOtpMode(false);
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        
        {/* Render Unlock Mode if Locked */}
        {isLockedMode ? (
          <>
            <button 
              onClick={resetAllModes}
              className="flex items-center gap-1 text-gray-500 hover:text-gray-800 mb-4 transition-colors"
            >
              <ArrowLeft size={18} /> Back to Login
            </button>
            <div className="flex justify-center mb-4 text-red-500">
              <AlertTriangle size={48} />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">Account Locked</h2>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Your account has been locked due to multiple failed login attempts. To regain access, please verify your identity using an OTP sent to your registered email.
            </p>
            
            {error && <div className="bg-red-50 text-red-500 p-3 rounded mb-4 text-sm text-center border border-red-200">{error}</div>}
            {success && <div className="bg-green-50 text-green-600 p-3 rounded mb-4 text-sm text-center border border-green-200">{success}</div>}
            
            {!isOtpMode ? (
              <button 
                disabled={loading} 
                onClick={handleSendUnlockOtp} 
                className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 font-bold transition-colors shadow-md disabled:bg-red-400"
              >
                {loading ? 'Sending OTP...' : 'Send Unlock OTP to Email'}
              </button>
            ) : (
              <form onSubmit={handleVerifyUnlockOtp}>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium flex items-center gap-2">
                    <KeyRound size={16} /> Enter 6-Digit OTP
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-center font-bold tracking-widest transition-all" 
                    value={unlockOtp} 
                    onChange={(e) => setUnlockOtp(e.target.value)} 
                    required
                    maxLength="6"
                    placeholder="------"
                  />
                </div>
                <button disabled={loading} type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 font-bold transition-colors shadow-md disabled:bg-green-400">
                  {loading ? 'Verifying...' : 'Verify OTP & Login'}
                </button>
              </form>
            )}
          </>
        ) : !isForgotMode ? (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
            
            {error && <div className="bg-red-50 text-red-500 p-3 rounded mb-4 text-sm text-center border border-red-200">{error}</div>}
            {success && <div className="bg-green-50 text-green-600 p-3 rounded mb-4 text-sm text-center border border-green-200">{success}</div>}
            
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Username</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none pr-10 transition-all" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="flex justify-end mt-2">
                  <button 
                    type="button" 
                    onClick={() => { setIsForgotMode(true); setError(''); setSuccess(''); }}
                    className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
              <button disabled={loading} type="submit" className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 font-bold transition-colors shadow-md disabled:bg-orange-300 flex items-center justify-center gap-2">
                {loading ? 'Logging in...' : 'Login Securely'}
              </button>
            </form>
          </>
        ) : (
          <>
            <button 
              onClick={resetAllModes}
              className="flex items-center gap-1 text-gray-500 hover:text-gray-800 mb-4 transition-colors"
            >
              <ArrowLeft size={18} /> Back to Login
            </button>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Reset Password</h2>
            
            {error && <div className="bg-red-50 text-red-500 p-3 rounded mb-4 text-sm text-center border border-red-200">{error}</div>}
            {success && <div className="bg-green-50 text-green-600 p-3 rounded mb-4 text-sm text-center border border-green-200">{success}</div>}
            
            {!isOtpMode ? (
              <form onSubmit={handleSendOtp}>
                <p className="text-sm text-gray-600 mb-6">Enter your registered email address and we'll send you an OTP to reset your password.</p>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium flex items-center gap-2">
                    <Mail size={16} /> Email Address
                  </label>
                  <input 
                    type="email" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                    placeholder="admin@svastu.com"
                  />
                </div>
                <button disabled={loading} type="submit" className="w-full bg-gray-900 text-white p-3 rounded-lg hover:bg-gray-800 font-bold transition-colors shadow-md disabled:bg-gray-400">
                  {loading ? 'Sending...' : 'Send OTP'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 font-medium flex items-center gap-2">
                    <KeyRound size={16} /> Enter 6-Digit OTP
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-center font-bold tracking-widest transition-all" 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value)} 
                    required
                    maxLength="6"
                    placeholder="------"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">New Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none pr-10 transition-all" 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)} 
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <button disabled={loading} type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 font-bold transition-colors shadow-md disabled:bg-green-400">
                  {loading ? 'Verifying...' : 'Reset Password'}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
