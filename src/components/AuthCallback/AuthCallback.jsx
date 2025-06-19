// src/routes/AuthCallback.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../Supabase/SupabaseClient';
import trackEvents from '../../Utils/mixPanelTrackEvents'

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error('Auth error:', error);
      } else if (data.session) {
        const redirected_path = localStorage.getItem('redirected_Path')  || "/" ;
        navigate(redirected_path); // 👈 Go to homepage
        trackEvents('User Logged In',{
          user_Id:data.session.user.id,
          redirected_from: redirected_path,
        })
      }
    });
  }, [navigate]);

  return <p>Signing you in...</p>;
};

export default AuthCallback;