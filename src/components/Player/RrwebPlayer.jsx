import React, { useEffect, useRef } from 'react';
import 'rrweb-player/dist/style.css';
import './RrwebPlayerStyle.css'
import rrwebPlayer from 'rrweb-player';

export default function RrwebPlayerComponent({ events }) {
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current && events?.length) {
      // Clear previous content to avoid duplicate players
      playerRef.current.innerHTML = '';

      // Create new rrweb player
      new rrwebPlayer({
        target: playerRef.current,
        props: {
          events,
          autoPlay: false,  
        },
      });
    }
  }, [events]);

  return <div ref={playerRef} className='new-web-player-custom-div'/>;
}
