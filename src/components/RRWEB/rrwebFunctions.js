import html2canvas from 'html2canvas'
import { record } from 'rrweb';
import { Replayer } from 'rrweb';
import 'rrweb-player/dist/style.css';
let recordedEvents = [];
let currentReplayer = null; // Track global replayer instance


import { supabase } from '../Supabase/SupabaseClient';
// Start recording and store events
export const startRecording = (stopFnRef) => {
  recordedEvents = [];

  const stopFn = record({
    blockClass: 'no-record-by-rrweb',
    emit(event) {
      recordedEvents.push(event);
    },
  });

  stopFnRef.current = stopFn;
};

// Stop and save events to localStorage
export const stopRecording = async (stopFnRef, userId, recordingId) => {
  console.log('recording Id',recordingId);
  console.log('userId',userId);

  if (stopFnRef.current) {
    stopFnRef.current(); // Stop recording
    stopFnRef.current = null;

    if (recordedEvents.length > 0) {
      // screenshot Capture hoga
      const canvas = await html2canvas(document.body);
      const screenshotDataUrl = canvas.toDataURL('image/png');

      // Optional: Save to localStorage for backup
      localStorage.setItem('rrweb-recording', JSON.stringify(recordedEvents));

      const timestampz = Date.now();

      // Save to Supabase
      const { data, error } = await supabase.from('recordings').insert([
        {
          recording_id: recordingId,
          user_id: userId,            // Pass user ID from auth
          events: recordedEvents,     // Save full list as JSON
          screenshot: screenshotDataUrl,
          created_at: new Date().toISOString()
        }
      ]);

      if (error) {
        console.error("Error saving to Supabase:", error.message);
      } else {
        console.log("Recording saved to Supabase:", data);
      }
    }
  }
};

// Safely replay the recording
export const replayRecording = (container) => {
  const storedEvents = localStorage.getItem('rrweb-recording');

  if (!storedEvents || !container.current) {
    console.warn('No recording found or invalid container');
    return;
  }

  const events = JSON.parse(storedEvents);

  if (!events.length) {
    console.warn('No events to replay');
    return;
  }

  // Clear old content and destroy any existing replayer
  container.current.innerHTML = '';

  if (currentReplayer && typeof currentReplayer.pause === 'function') {
    try {
      currentReplayer.pause(); // Stop if playing
      currentReplayer = null;
    } catch (e) {
      console.warn('Error destroying old replayer:', e);
    }
  }

  try {
    currentReplayer = new Replayer(events, {
      root: container.current,
      frameSandbox: 'allow-same-origin allow-scripts',
    });

    currentReplayer.play();
  } catch (error) {
    console.error('Failed to create replayer:', error);
  }
};

// Clear recording from localStorage
export const clearRecording = () => {
  localStorage.removeItem('rrweb-recording');
};
