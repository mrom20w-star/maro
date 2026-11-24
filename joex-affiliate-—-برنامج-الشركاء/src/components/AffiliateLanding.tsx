import { FormEvent, useState } from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import { CONTENT, COUNTRIES, Lang, TRAFFIC_SOURCES } from '../data/affiliateContent';

export interface SubmittedApplication {
  firstName: string;
  lastName: string;
  country: string;
  binanceId: string;
  trafficSource: string;
  sourceUrl: string;
  phone: string;
  telegramUsername: string;
  username: string;
}

interface AffiliateLandingProps {
  lang: Lang;
  onOpenLogin: () => void;
  onOpenTerms: () => void;
  onApplicationSubmitted: (data: SubmittedApplication) => void;
  submittedApp: SubmittedApplication | null;
  onResetApplication: () => void;
  onOpenDashboardPreview: () => void;
}

const BenefitIcon = ({ id }: { id: string }) => {
  switch (id) {
    case 'commission':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3v18M8 7.5A2.5 2.5 0 0 1 10.5 5h3a2.5 2.5 0 0 1 0 5h-3a2.5 2.5 0 0 0 0 5h3A2.5 2.5 0 0 0 16 12.5" />
        </svg>
      );
    case 'lifetime':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 12a9 9 0 0 1 15.5-6.2M21 12a9 9 0 0 1-15.5 6.2" />
          <path d="M18 4v4h-4M6 20v-4h4" />
        </svg>
      );
    case 'payouts':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="6" width="18" height="13" rx="3" />
          <path d="M16 12.5h2M3 10h15a3 3 0 0 1 3 3" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 19V5M4 19h16" />
          <path d="M8 16v-5M12 16V8M16 16v-3" />
        </svg>
      );
  }
};

export function AffiliateLanding({
  lang,
  onOpenLogin,
  onOpenTerms,
  onApplicationSubmitted,
  submittedApp,
  onResetApplication,
  onOpenDashboardPreview,
}: AffiliateLandingProps) {
  const t = CONTENT[lang];

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('EG');
  const [binanceId, setBinanceId] = useState('');
  const [trafficSource, setTrafficSource] = useState('youtube');
  const [sourceUrl, setSourceUrl] = useState('');
  const [phone, setPhone] = useState('');
  const [telegramUsername, setTelegramUsername] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [humanVerified, setHumanVerified] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    const fe = t.form.errors;

    if (!firstName.trim()) errs.first_name = fe.required;
    if (!lastName.trim()) errs.last_name = fe.required;
    if (!binanceId.trim() || !/^\d{5,32}$/.test(binanceId.trim())) {
      errs.binance_id = binanceId.trim() ? fe.invalid : fe.required;
    }

    const cleanUrl = sourceUrl.trim();
    if (!cleanUrl) {
      errs.source_url = fe.required;
    } else if (!/^https?:\/\/.+\..+/i.test(cleanUrl)) {
      errs.source_url = fe.url;
    }

    const cleanPhone = phone.trim();
    if (!cleanPhone) {
      errs.phone = fe.required;
    } else if (cleanPhone.replace(/\D/g, '').length < 7) {
      errs.phone = fe.invalid;
    }

    const cleanTg = telegramUsername.trim().replace(/^@/, '');
    if (!cleanTg) {
      errs.telegram_username = fe.required;
    } else if (!/^[a-zA-Z0-9_]{5,32}$/.test(cleanTg)) {
      errs.telegram_username = fe.telegram;
    }

    const cleanUser = username.trim();
    if (!cleanUser) {
      errs.username = fe.required;
    } else if (!/^[a-zA-Z0-9]{3,32}$/.test(cleanUser)) {
      errs.username = fe.username;
    }

    if (password.length < 8) {
      errs.password = fe.passwordShort;
    } else if (password !== password2) {
      errs.password2 = fe.passwordMatch;
    }

    if (!termsAccepted) {
      errs.terms = fe.terms;
    }

    if (!humanVerified) {
      setFormError(fe.human);
    } else {
      setFormError('');
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0 || !humanVerified) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onApplicationSubmitted({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        country,
        binanceId: binanceId.trim(),
        trafficSource,
        sourceUrl: cleanUrl,
        phone: cleanPhone,
        telegramUsername: cleanTg,
        username: cleanUser,
      });
    }, 450);
  };

  return (
    <main className="affiliate aff-landing">
      {/* Hero */}
      <section className="aff-hero">
        <div className="container">
          <span className="aff-hero-kicker">{t.hero.badge}</span>
          <h1 className="aff-hero-title">{t.hero.title}</h1>
          <p className="aff-hero-sub">{t.hero.sub}</p>
          <p className="aff-rate-note">{t.hero.rateNote}</p>
          <div className="aff-hero-cta">
            <a className="btn btn-primary btn-glow" href="#apply">
              {t.hero.ctaApply}
            </a>
            <button type="button" className="btn btn-secondary" onClick={onOpenLogin}>
              {t.hero.ctaLogin}
            </button>
          </div>
          <ul className="aff-chips">
            {t.hero.chips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why the programme is worth your time */}
      <section id="benefits" className="container section">
        <h2 className="section-title">{t.why.title}</h2>
        <p className="section-sub">{t.why.sub}</p>
        <div className="aff-cards">
          {t.why.cards.map((card) => (
            <article key={card.id} className="card aff-card">
              <span className="aff-card-icon">
                <BenefitIcon id={card.id} />
              </span>
              <h3>{card.title}</h3>
              <p className="card-text">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="container section">
        <h2 className="section-title">{t.how.title}</h2>
        <ol className="aff-steps">
          {t.how.steps.map((step, index) => (
            <li key={index}>
              <span className="aff-step-n" aria-hidden="true">
                {index + 1}
              </span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Day-one kit */}
      <section id="kit" className="container section">
        <div className="card aff-kit">
          <div className="aff-kit-copy">
            <h2 className="section-title">{t.kit.title}</h2>
            <p className="section-sub">{t.kit.sub}</p>
          </div>
          <ul className="aff-kit-list">
            {t.kit.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Apply form */}
      <section className="container narrow section" id="apply">
        <h2 className="section-title">{t.form.title}</h2>
        <p className="section-sub">{t.form.sub}</p>

        {submittedApp ? (
          <div className="card aff-applied">
            <div className="aff-check" aria-hidden="true">
              ✓
            </div>
            <h3 className="text-xl font-bold">{t.form.success.title}</h3>
            <p className="card-text max-w-md">{t.form.success.message}</p>
            <div className="text-sm text-[var(--text-2)] flex flex-wrap justify-center gap-3">
              <span>@{submittedApp.telegramUsername}</span>
              <span aria-hidden="true">·</span>
              <span className="num">{submittedApp.username}</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              <button type="button" className="btn btn-primary" onClick={onOpenDashboardPreview}>
                {t.form.success.openPreview}
              </button>
              <button type="button" className="btn btn-secondary" onClick={onResetApplication}>
                {t.form.success.another}
              </button>
            </div>
          </div>
        ) : (
          <form className="card trial-form" onSubmit={handleSubmit} noValidate>
            <div className="fields">
              <div className="aff-two">
                <label className={`field ${errors.first_name ? 'has-error' : ''}`}>
                  <span className="field-label">{t.form.firstName}</span>
                  <input
                    name="first_name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (errors.first_name) setErrors((prev) => ({ ...prev, first_name: '' }));
                    }}
                    maxLength={40}
                    autoComplete="given-name"
                    required
                  />
                  {errors.first_name && <small className="field-error">{errors.first_name}</small>}
                </label>

                <label className={`field ${errors.last_name ? 'has-error' : ''}`}>
                  <span className="field-label">{t.form.lastName}</span>
                  <input
                    name="last_name"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (errors.last_name) setErrors((prev) => ({ ...prev, last_name: '' }));
                    }}
                    maxLength={40}
                    autoComplete="family-name"
                    required
                  />
                  {errors.last_name && <small className="field-error">{errors.last_name}</small>}
                </label>
              </div>

              <label className="field">
                <span className="field-label">{t.form.country}</span>
                <select name="country" value={country} onChange={(e) => setCountry(e.target.value)}>
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {lang === 'ar' ? c.ar : c.en}
                    </option>
                  ))}
                </select>
              </label>

              <label className={`field ${errors.binance_id ? 'has-error' : ''}`}>
                <span className="field-label">{t.form.binanceId}</span>
                <input
                  name="binance_id"
                  dir="ltr"
                  inputMode="numeric"
                  maxLength={32}
                  value={binanceId}
                  onChange={(e) => {
                    setBinanceId(e.target.value);
                    if (errors.binance_id) setErrors((prev) => ({ ...prev, binance_id: '' }));
                  }}
                  placeholder="123456789"
                  required
                />
                <small className="field-hint">{t.form.binanceHint}</small>
                {errors.binance_id && <small className="field-error">{errors.binance_id}</small>}
              </label>

              <div className="aff-two">
                <label className="field">
                  <span className="field-label">{t.form.trafficSource}</span>
                  <select
                    name="traffic_source"
                    value={trafficSource}
                    onChange={(e) => setTrafficSource(e.target.value)}
                  >
                    {TRAFFIC_SOURCES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {lang === 'ar' ? s.ar : s.en}
                      </option>
                    ))}
                  </select>
                </label>

                <label className={`field ${errors.source_url ? 'has-error' : ''}`}>
                  <span className="field-label">{t.form.sourceUrl}</span>
                  <input
                    name="source_url"
                    dir="ltr"
                    type="url"
                    placeholder="https://"
                    maxLength={200}
                    value={sourceUrl}
                    onChange={(e) => {
                      setSourceUrl(e.target.value);
                      if (errors.source_url) setErrors((prev) => ({ ...prev, source_url: '' }));
                    }}
                    required
                  />
                  {errors.source_url && <small className="field-error">{errors.source_url}</small>}
                </label>
              </div>

              <div className="aff-two">
                <label className={`field ${errors.phone ? 'has-error' : ''}`}>
                  <span className="field-label">{t.form.phone}</span>
                  <input
                    name="phone"
                    dir="ltr"
                    type="tel"
                    inputMode="tel"
                    placeholder="+20"
                    maxLength={20}
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                    }}
                    required
                  />
                  {errors.phone && <small className="field-error">{errors.phone}</small>}
                </label>

                <label className={`field ${errors.telegram_username ? 'has-error' : ''}`}>
                  <span className="field-label">{t.form.telegram}</span>
                  <input
                    name="telegram_username"
                    dir="ltr"
                    autoComplete="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    value={telegramUsername}
                    onChange={(e) => {
                      setTelegramUsername(e.target.value);
                      if (errors.telegram_username) {
                        setErrors((prev) => ({ ...prev, telegram_username: '' }));
                      }
                    }}
                    required
                  />
                  <small className="field-hint">{t.form.telegramHint}</small>
                  {errors.telegram_username && (
                    <small className="field-error">{errors.telegram_username}</small>
                  )}
                </label>
              </div>

              <hr className="rule" />

              <label className={`field ${errors.username ? 'has-error' : ''}`}>
                <span className="field-label">{t.form.username}</span>
                <input
                  name="username"
                  dir="ltr"
                  autoComplete="username"
                  autoCapitalize="none"
                  spellCheck={false}
                  minLength={3}
                  maxLength={32}
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errors.username) setErrors((prev) => ({ ...prev, username: '' }));
                  }}
                  required
                />
                <small className="field-hint">{t.form.usernameHint}</small>
                {errors.username && <small className="field-error">{errors.username}</small>}
              </label>

              <div className="aff-two">
                <label className={`field ${errors.password ? 'has-error' : ''}`}>
                  <span className="field-label">{t.form.password}</span>
                  <input
                    name="password"
                    type="password"
                    dir="ltr"
                    autoComplete="new-password"
                    minLength={8}
                    maxLength={72}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                    }}
                    required
                  />
                  <small className="field-hint">{t.form.passwordHint}</small>
                  {errors.password && <small className="field-error">{errors.password}</small>}
                </label>

                <label className={`field ${errors.password2 ? 'has-error' : ''}`}>
                  <span className="field-label">{t.form.confirmPassword}</span>
                  <input
                    name="password2"
                    type="password"
                    dir="ltr"
                    autoComplete="new-password"
                    minLength={8}
                    maxLength={72}
                    value={password2}
                    onChange={(e) => {
                      setPassword2(e.target.value);
                      if (errors.password2) setErrors((prev) => ({ ...prev, password2: '' }));
                    }}
                    required
                  />
                  {errors.password2 && <small className="field-error">{errors.password2}</small>}
                </label>
              </div>
            </div>

            <div className="submit-block">
              <label className="aff-terms">
                <input
                  type="checkbox"
                  name="terms"
                  checked={termsAccepted}
                  onChange={(e) => {
                    setTermsAccepted(e.target.checked);
                    if (errors.terms) setErrors((prev) => ({ ...prev, terms: '' }));
                  }}
                />
                <span>
                  {t.form.termsPrefix}{' '}
                  <button type="button" onClick={onOpenTerms}>
                    {t.form.termsLink}
                  </button>
                </span>
              </label>
              {errors.terms && <small className="field-error">{errors.terms}</small>}

              {/* Interactive human verification widget matching Turnstile placement */}
              <div className="flex justify-center my-1">
                <button
                  type="button"
                  onClick={() => {
                    setHumanVerified(true);
                    setFormError('');
                  }}
                  className="flex items-center justify-between gap-4 px-4 py-3 rounded-lg border border-[var(--line)] bg-[var(--bg)] min-w-[270px] cursor-pointer transition-colors hover:border-[var(--gold)]"
                >
                  <span className="flex items-center gap-3 text-sm font-medium text-[var(--text)]">
                    <span
                      className={`w-5 h-5 rounded flex items-center justify-center border ${
                        humanVerified
                          ? 'bg-[var(--gain)] border-[var(--gain)] text-[var(--gain-deep)]'
                          : 'border-[var(--line-strong)] bg-transparent'
                      }`}
                    >
                      {humanVerified && <Check size={14} strokeWidth={3} />}
                    </span>
                    <span>{humanVerified ? t.form.humanVerified : t.form.humanCheck}</span>
                  </span>
                  <ShieldCheck size={18} className="text-[var(--gold-hi)] shrink-0" />
                </button>
              </div>

              {formError && (
                <p className="form-error" role="alert">
                  {formError}
                </p>
              )}

              <button
                className="btn btn-primary btn-block"
                type="submit"
                disabled={submitting}
              >
                {submitting ? t.form.submitting : t.form.submit}
              </button>

              <p className="center small m-0">
                <button type="button" className="trial-link" onClick={onOpenLogin}>
                  {t.form.alreadyApproved}
                </button>
              </p>
            </div>
          </form>
        )}
      </section>

      {/* FAQ */}
      <section id="faq" className="container narrow section">
        <h2 className="section-title">{t.faq.title}</h2>
        <div className="aff-faq">
          {t.faq.items.map((item) => (
            <details key={item.q} className="card aff-faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
        <p className="center aff-final">
          <a className="btn btn-primary btn-glow" href="#apply">
            {t.faq.finalCta}
          </a>
        </p>
      </section>
    </main>
  );
}
