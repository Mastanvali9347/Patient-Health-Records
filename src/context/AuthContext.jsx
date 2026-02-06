import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session (mock)
    const savedUser = localStorage.getItem('healthDashboardUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password, rememberMe = false) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = {
      id: 'u1',
      name: 'John Smith',
      email: email,
      phone: '+1 (555) 123-4567',
      avatar: 'JS',
      address: '123 Medical Center Drive, New York, NY 10001'
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    if (rememberMe) {
      localStorage.setItem('healthDashboardUser', JSON.stringify(mockUser));
    }
    setIsLoading(false);
    return { success: true };
  };

  const signup = async (userData) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    return { success: true, requiresOTP: true };
  };

  const verifyOTP = async (otp) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock verification - accept any 6-digit OTP
    if (otp.length === 6) {
      const mockUser = {
        id: 'u1',
        name: 'John Smith',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        avatar: 'JS'
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('healthDashboardUser', JSON.stringify(mockUser));
      setIsLoading(false);
      return { success: true };
    }
    setIsLoading(false);
    return { success: false, error: 'Invalid OTP' };
  };

  const resetPassword = async (email) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    return { success: true };
  };

  const updatePassword = async (newPassword) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    return { success: true };
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('healthDashboardUser', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('healthDashboardUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      login,
      signup,
      verifyOTP,
      resetPassword,
      updatePassword,
      updateProfile,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
