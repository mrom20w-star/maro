import { useEffect, useState } from 'react';
import { AffiliateLanding, SubmittedApplication } from './components/AffiliateLanding';
import { AffiliateLogin } from './components/AffiliateLogin';
import { LegalTermsModal } from './components/LegalTermsModal';
import { MT5Terminal } from './components/mt5/MT5Terminal';
import { TopNav } from './components/TopNav';
import { CONTENT, Lang, Theme } from './data/affiliateContent';

type View = 'landing' | 'login' | 'terminal';

export default function App() {
  const [lang, setLang] = useState<Lang>('ar');
  const [theme, setTheme] = useState<Theme>('light');
  const [view, setView] = useState<View>('landing');
  const [termsOpen, setTermsOpen] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<SubmittedApplication | null>(null);
  const [activeUsername, setActiveUsername] = useState<string>('');

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    const effectiveTheme = view === 'terminal' ? 'dark' : theme;
    html.setAttribute('data-theme', effectiveTheme);
    document.title = CONTENT[lang].pageTitle;

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute(
        'content',
        view === 'terminal' ? '#000000' : theme === 'dark' ? '#08080a' : '#f7f5f2'
      );
    }
  }, [lang, theme, view]);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleOpenLogin = () => {
    setView('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToApply = () => {
    setView('landing');
    setTimeout(() => {
      document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  if (view === 'terminal') {
    return (
      <MT5Terminal
        lang={lang}
        username={activeUsername || submittedApp?.username || 'Wissam Tharwat'}
        onToggleLang={handleToggleLang}
        onSignOut={handleBackToLanding}
      />
    );
  }

  return (
    <>
      <TopNav
        lang={lang}
        theme={theme}
        onToggleLang={handleToggleLang}
        onToggleTheme={handleToggleTheme}
        onLogoClick={handleBackToLanding}
      />

      {view === 'landing' && (
        <AffiliateLanding
          lang={lang}
          onOpenLogin={handleOpenLogin}
          onOpenTerms={() => setTermsOpen(true)}
          onApplicationSubmitted={(data) => {
            setSubmittedApp(data);
            setActiveUsername(data.username);
          }}
          submittedApp={submittedApp}
          onResetApplication={() => setSubmittedApp(null)}
          onOpenDashboardPreview={() => {
            setView('terminal');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {view === 'login' && (
        <AffiliateLogin
          lang={lang}
          defaultUsername={submittedApp?.username || ''}
          onSuccess={(user) => {
            setActiveUsername(user);
            setView('terminal');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onBackToApply={handleBackToApply}
        />
      )}

      <LegalTermsModal lang={lang} open={termsOpen} onClose={() => setTermsOpen(false)} />

      <a
        className="float-tg"
        href="https://t.me/joex_trd"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={CONTENT[lang].floatTg}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            fill="currentColor"
            d="M21.9 4.3 18.7 19.4c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6.2 13.1l-4.8-1.5c-1-.3-1.1-1 .2-1.5L20.6 2.8c.9-.3 1.6.2 1.3 1.5Z"
          />
        </svg>
        <span className="float-tg-label">{CONTENT[lang].floatTg}</span>
      </a>
    </>
  );
}
