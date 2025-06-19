import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../components/Supabase/SupabaseClient';
import RrwebPlayerComponent from '../../components/Player/RrwebPlayer';

export default function SharedRecording() {
  const { token } = useParams();
  const [recording, setRecording] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(()=>{
    console.log('In ShareRecording');
    
  },[])
useEffect(() => {
    console.log(token);
  const fetchSharedRecording = async () => {
    const { data, error } = await supabase
      .from('recordings')
      .select('*')
      .eq('shared_token', token)
      .single();

    if (error || !data) {
      console.error('Error fetching shared recording:', error?.message || 'No data');
      setRecording(null);
    } else {
      setRecording(data);
      console.log(recording);
    }
    setLoading(false);
  };

  if (token) fetchSharedRecording();
}, [token]);


  if (loading) return <p>Loading...</p>;
  if (!recording) return <p>Invalid or expired link.</p>;

  return <RrwebPlayerComponent events={recording.events} />;
}