import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="m-2 rounded-full bg-[var(--bg-primary)] dark:bg-black text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <DarkModeIcon className="w-8 h-8 text-white bg-black rounded-full m-2" />
      ) : (
        <LightModeIcon className="w-8 h-8 text-white bg-black rounded-full m-2" />
      )}
    </button>
  );
}