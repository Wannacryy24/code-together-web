import React, { useEffect, useState, useContext } from 'react';
import { supabase } from '../../components/Supabase/SupabaseClient';
import { AuthContext } from '../../ContextAPI/AuthUser';
import './Sessions.css';
import RrwebPlayerComponent from '../../components/Player/RrwebPlayer';
import { v4 as uuidv4 } from 'uuid';
import { TrashIcon, ShareIcon } from '@heroicons/react/24/outline';
import DotLoading from '../../components/DotLoading/DotLoading'
import ShareSessionModal from '../../components/ShareSessionModal/ShareSessionModal';

export default function Sessions() {
  const [recordingData, setRecordingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRecording, setShowRecording] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const { AuthUserData } = useContext(AuthContext);
  const [shareUrl, setShareUrl] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);


  const userId = AuthUserData?.id;

  useEffect(() => {
    const fetchRecordings = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('recordings')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching recordings:', error.message);
      } else {
        setRecordingData(data);
      }
      setLoading(false);
    };

    if (userId) {
      fetchRecordings();
    }
  }, [userId]);

  const handleDelete = async (recordingId) => {
    const { data, error } = await supabase
      .from('recordings')
      .delete()
      .eq('recording_id', recordingId);

    if (error) {
      console.error('Error deleting recording:', error.message);
    } else {
      console.log('Recording deleted:', data);
      setRecordingData(prev => prev.filter(rec => rec.recording_id !== recordingId));
    }
  };


  const handleShare = async (recordingId) => {
    const shareToken = uuidv4();

    const { data, error } = await supabase
      .from('recordings')
      .update({ shared_token: shareToken })
      .eq('recording_id', recordingId)
      .select();

    if (error) {
      console.error('Error generating share token:', error.message);
    } else {
      const shareURL = `${window.location.origin}/shared/${shareToken}`;
      setShareUrl(shareURL);
      setIsShareModalOpen(true);
    }
  };






  const ShowSingleRecording = (recEvent) => {
    setSelectedEvents(recEvent);
    setShowRecording(true);
  };

  return showRecording ? (
    <RrwebPlayerComponent events={selectedEvents} />
  ) : (
    <>

      <div className="sessions-container">
        <div className='redording-heading'><h2 className="sessions-title"> <span className='light-green-span'> Your Recording </span> <span className='dark-green-span'> Sessions</span></h2></div>

        {loading ? (
          <DotLoading />
        ) : recordingData.length === 0 ? (
          <p className="no-recordings-text">No recordings found.</p>
        ) : (

          <div className="recordings-list">
            {recordingData.map((rec, index) => (
              <div key={rec.recording_id} className="recording-card" onClick={() => ShowSingleRecording(rec.events)}>
                <div className='single-session-left'>
                  <img
                    src={rec.screenshot}
                    alt="Recording Screenshot"
                    className="recording-screenshot"
                  />
                </div>
                <div className='single-session-right'>
                  <div className="recording-info">
                    <p className='dull-green-color'> {new Date(rec.created_at).toLocaleDateString()}</p>
                    <p className='dull-green-color'> {new Date(rec.created_at).toLocaleTimeString()}</p>
                  </div>
                  <div className='document-name-div'>
                    {<h1 className='light-green-color'>{rec.name ? (rec.name) : (`Untitled Document ${index + 1}`)}</h1>}
                  </div>
                  <div className='recording-card-btn-div'>
                    <button
                      className="outline-button2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(rec.recording_id);
                      }}
                    >
                      Delete
                    </button>

                    <button
                      className="outline-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(rec.recording_id);
                      }}
                    >
                      Share
                    </button>
                  </div>
                </div>
              </div>

            ))}
          </div>
        )}
      </div>
      {isShareModalOpen && (
        <ShareSessionModal
          roomUrl={shareUrl}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
    </>
  );
}