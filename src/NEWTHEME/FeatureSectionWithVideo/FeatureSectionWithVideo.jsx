import React from 'react';
import './FeatureSectionWithVideo.css';
import { CodeBracketIcon, UserGroupIcon, PaintBrushIcon, CursorArrowRaysIcon } from '@heroicons/react/24/outline';
import {
  PlayCircleIcon,
  UserIcon,
  BriefcaseIcon,
  CommandLineIcon,
  DocumentDuplicateIcon,
  MicrophoneIcon,
  FolderOpenIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    icon: <CodeBracketIcon className="h-8 w-8 text-green-400" />,
    title: 'Real-Time Sync',
    desc: 'See every keystroke, cursor movement, and selection — instantly and smoothly.',
  },
  {
    icon: <UserGroupIcon className="h-8 w-8 text-green-400" />,
    title: 'Secure Sharing',
    desc: 'Invite collaborators with full control over access and editing permissions.',
  },
  {
    icon: <PaintBrushIcon className="h-8 w-8 text-green-400" />,
    title: 'Theming & Languages',
    desc: 'Choose your favorite theme and code in JavaScript, Python, C++, and more.',
  },
  {
    icon: <CursorArrowRaysIcon className="h-8 w-8 text-green-400" />,
    title: 'Live Cursor Sharing',
    desc: 'See exactly where your teammate is working with real-time cursor and selection indicators.',
  },
  {
    icon: <PlayCircleIcon className="h-8 w-8 text-green-400" />,
    title: 'Session Replay',
    desc: 'Record and replay entire coding sessions to review or share later.',
  },
  {
    icon: <BriefcaseIcon className="h-8 w-8 text-green-400" />,
    title: 'Interview Mode',
    desc: 'Run coding interviews with time limits, question switching, and playback.',
  },
  {
    icon: <CommandLineIcon className="h-8 w-8 text-green-400" />,
    title: 'Built-in Terminal',
    desc: 'Execute commands in a shared terminal — great for real-world testing.',
  },
  {
    icon: <MicrophoneIcon className="h-8 w-8 text-green-400" />,
    title: 'Voice Collaboration',
    desc: 'Talk while you code with seamless in-app voice chat.',
    comingSoon: true,
  },
];

export default function FeatureSectionWithVideo() {
  return (
    <>
      <h1 className='features-h1'>Features</h1>
      <div className="feature-layout">
        <div className="feature-left">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-texts">
                <h4>{feature.title}</h4>
                {feature.comingSoon && <span className="coming-soon-badge">Coming Soon</span>}
                <p>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="feature-right">
          <video className="fixed-video" autoPlay muted loop src="Videos/m2.mp4" />
        </div>
      </div>
    </>
  );
}
