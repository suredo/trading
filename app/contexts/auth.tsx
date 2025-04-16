import React, { createContext, useState, useEffect, useContext } from 'react';
import supabase from '~/supabase';

// Create a new context
export const AuthContext = createContext<{
  user: any; // Or a more specific type if you have one
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}>({
  user: null,
  signIn: async () => { },
  signOut: async () => { },
  isLoading: false,
  error: null,
});

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null); // Start with null, not undefined
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to sign in
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null); // Clear previous errors
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message || 'Failed to sign in');
        setUser(null);
      } else {
        setUser(data.user);
        //  No need to setItem here, the onAuthStateChange listener will handle it
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to sign out
  const signOut = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) {
        setError(signOutError.message || 'Failed to sign out');
      }
      setUser(null); // Clear user state
      // localStorage.removeItem('supabase.auth.token'); // Remove token -  handled by supabase
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Listen for authentication state changes (runs on mount and when auth state changes)
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsLoading(true); // set loading to true initially
        if (event === 'SIGNED_IN') {
          setUser(session?.user || null);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        } else if (event === 'INITIAL_SESSION') {
          setUser(session?.user || null);
        }
        setIsLoading(false);
      }
    );

    // Cleanup function:  Remove the listener to prevent memory leaks.
    return () => {
      authListener?.subscription?.unsubscribe(); // Use optional chaining
    };
  }, []);


  // Provide the context value
  const contextValue = {
    user,
    signIn,
    signOut,
    isLoading,
    error,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}