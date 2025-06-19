import React, { useContext } from 'react';
import { ToggleUiThemeContext } from '../../ContextAPI/ToggleUITheme';
import { Sun, Moon, TreePine, Cpu, PaintBucket, Flower } from 'lucide-react';
import './ToggleThemes.css'
import trackEvents from '../../Utils/mixPanelTrackEvents';
import { useLocation } from 'react-router-dom';

const themeIconMap = {
  default: { icon: PaintBucket, color: '#60b54b' },
  cyberpunk: { icon: Cpu, color: '#ff007f' },
  forest: { icon: TreePine, color: '#228B22' },
  'solar-light': { icon: Sun, color: '#FFA500' },
  lavender: { icon: Flower, color: '#DDA0DD' },
  'contrast-dark': { icon: Moon, color: '#FFFFFF' },
};

export default function ThemeToggleButton() {
  const { activeTheme, setActiveTheme, themes } = useContext(ToggleUiThemeContext);
  const location = useLocation();
  const toggleTheme = () => {
    trackEvents('Theme toggled' , {
      source:'header',
      path:location.pathname
    })
    const currentIndex = themes.indexOf(activeTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];

    setActiveTheme(nextTheme);

    if (nextTheme === 'default') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.removeItem('theme');
    } else {
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
    }
  };

  const { icon: Icon, color } = themeIconMap[activeTheme] || {};

  return (
    <button
      onClick={toggleTheme}
      className='toggle-theme-btn'
    >
      {activeTheme.charAt(0).toUpperCase() + activeTheme.slice(1)}
      {Icon && <Icon size={20} color={color} />}
    </button>
  );
}