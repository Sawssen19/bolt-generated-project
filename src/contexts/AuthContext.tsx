import { createContext, useContext, useEffect, useState } from 'react';
    import { User } from '@supabase/supabase-js';
    import { supabase } from '../lib/supabase';

    interface AuthContextType {
      user: User | null;
      isAdmin: boolean;
      loading: boolean;
    }

    const AuthContext = createContext<AuthContextType>({
      user: null,
      isAdmin: false,
      loading: true,
    });

    export function AuthProvider({ children }: { children: React.ReactNode }) {
      const [user, setUser] = useState<User | null>(null);
      const [isAdmin, setIsAdmin] = useState(false);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        // Get initial session and set isAdmin
        supabase.auth.getSession().then(({ data: { session } }) => {
          setUser(session?.user ?? null);
          setIsAdmin(session?.user?.user_metadata?.role === 'admin' ?? false);
          setLoading(false);
        });

        // Listen for auth changes and set isAdmin
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null);
          setIsAdmin(session?.user?.user_metadata?.role === 'admin' ?? false);
          setLoading(false);
        });

        return () => {
          subscription.unsubscribe();
        };
      }, []);

      return (
        <AuthContext.Provider value={{ user, isAdmin, loading }}>
          {children}
        </AuthContext.Provider>
      );
    }

    export const useAuth = () => useContext(AuthContext);
