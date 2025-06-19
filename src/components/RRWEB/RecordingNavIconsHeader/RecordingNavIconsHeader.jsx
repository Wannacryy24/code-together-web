import { useEffect, useState, useContext, useRef } from 'react';
import { RrwebContext } from '../../../ContextAPI/RrwebContext';
import { startRecording, stopRecording, clearRecording } from '../rrwebFunctions';
import { AuthContext } from '../../../ContextAPI/AuthUser';
import {v4 as uuidv4} from 'uuid';
import { supabase } from '../../Supabase/SupabaseClient';
import './RecordingNav.css'

export default function RecordingNavIconsHeader() {
  const { recording, setRecording, stopFnRef} = useContext(RrwebContext);
  const { setShowReplayModal } = useContext(RrwebContext);
  const [hasRecording, setHasRecording] = useState(false);
  const [userId, setUserId] = useState(null);  // <-- state to hold userId
  const {AuthUserData} = useContext(AuthContext);
  const recordingIdRef = useRef(null);

  // Fetch user ID on mount (or AuthUserData change)
  useEffect(() => {
    const fetchUserId = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error('Error getting user:', error.message);
        setUserId(null);
      } else {
        setUserId(user?.id || null);
      }
    };

    fetchUserId();
  }, [AuthUserData]);

  useEffect(() => {
    const stored = localStorage.getItem('rrweb-recording');
    setHasRecording(!!stored);
  }, [recording]);

  const handleRecord = () => {
    console.log('recording started');
    
    const recordingId = uuidv4();
    recordingIdRef.current = recordingId;
    startRecording(stopFnRef);
    setRecording(true);
    setHasRecording(false);
  };

  const handleStop = () => {
    if (!userId) {
      console.error('User ID not available, cannot save recording');
      return;
    }
    stopRecording(stopFnRef, userId, recordingIdRef.current);
    setRecording(false);
    setHasRecording(true);
  };

  const handleReplay = () => {
    setShowReplayModal(true);
  };

  return (
    <div className='no-record-by-rrweb'>
      {!recording ? (
        <>
        <button onClick={handleRecord} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          <img src="/image.png" alt="Start Recording" style={{ height: '40px' }} />
        </button>
        </>
      ) : (
        <button onClick={handleStop} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          <img src="/stop.png" alt="Stop Recording" style={{ height: '40px' }} />
        </button>
      )}
      {/* {hasRecording && (
        <button onClick={handleReplay} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          <img src="/play.png" alt="Replay Recording" style={{ height: '30px' }} />
        </button>
      )} */}
    </div>
  );
}