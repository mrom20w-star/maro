import { FormEvent, useState } from 'react';
import { CONTENT, Lang } from '../data/affiliateContent';

interface AffiliateLoginProps {
  lang: Lang;
  defaultUsername?: string;
  onSuccess: (username: string) => void;
  onBackToApply: () => void;
}

export function AffiliateLogin({
  lang,
  defaultUsername = '',
  onSuccess,
  onBackToApply,
}: AffiliateLoginProps) {
  const t = CONTENT[lang].login;
  const [username, setUsername] = useState(defaultUsername);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim() || password.length < 8) {
      setError(t.invalid);
      return;
    }
    setError('');
    onSuccess(username.trim());
  };

  return (
    <main className="affiliate container narrow py-12 md:py-20 relative z-10">
      <form className="card aff-login" onSubmit={handleSubmit} noValidate>
        <h1 className="card-title">{t.title}</h1>
        <div className="fields">
          <label className="field">
            <span className="field-label">{t.username}</span>
            <input
              name="username"
              dir="ltr"
              autoComplete="username"
              autoCapitalize="none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className="field">
            <span className="field-label">{t.password}</span>
            <input
              name="password"
              type="password"
              dir="ltr"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="submit-block mt-5">
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="btn btn-primary btn-block" type="submit">
            {t.submit}
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-block"
            onClick={() => onSuccess(defaultUsername || 'joex_partner')}
          >
            {t.demoFill}
          </button>
          <p className="center small m-0">
            <button type="button" className="trial-link" onClick={onBackToApply}>
              {t.noAccount}
            </button>
          </p>
        </div>
      </form>
    </main>
  );
}
