import { Moon, Sun } from 'lucide-react';
import { CONTENT, Lang, Theme } from '../data/affiliateContent';

interface TopNavProps {
  lang: Lang;
  theme: Theme;
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onLogoClick: () => void;
}

export function TopNav({ lang, theme, onToggleLang, onToggleTheme, onLogoClick }: TopNavProps) {
  const t = CONTENT[lang];

  return (
    <header className="topnav">
      <div className="topnav-inner">
        <button
          type="button"
          onClick={onLogoClick}
          className="flex items-center gap-2.5 bg-transparent border-0 p-0 cursor-pointer shrink-0"
          aria-label="JoeX"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="joexGold" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={theme === 'dark' ? '#e6b98f' : '#a97244'} />
                <stop offset="50%" stopColor={theme === 'dark' ? '#cc9166' : '#8a5a33'} />
                <stop offset="100%" stopColor={theme === 'dark' ? '#8f5f3d' : '#603c20'} />
              </linearGradient>
            </defs>
            <rect x="2" y="2" width="36" height="36" rx="9" stroke="url(#joexGold)" strokeWidth="1.75" />
            <path
              d="M12 12L28 28M28 12L12 28"
              stroke="url(#joexGold)"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <circle cx="20" cy="20" r="3" fill="url(#joexGold)" />
          </svg>
          <span
            className="text-xl font-bold tracking-tight whitespace-nowrap shrink-0"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--text)',
            }}
          >
            Joe<span style={{ color: 'var(--gold-hi)' }}>X</span>
          </span>
        </button>

        <nav className="topnav-actions" aria-label="Controls">
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={theme === 'light' ? t.nav.themeToDark : t.nav.themeToLight}
            title={theme === 'light' ? t.nav.themeToDark : t.nav.themeToLight}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <button
            type="button"
            className="lang-toggle"
            onClick={onToggleLang}
            lang={lang === 'ar' ? 'en' : 'ar'}
          >
            {t.nav.langSwitch}
          </button>
        </nav>
      </div>
    </header>
  );
}
