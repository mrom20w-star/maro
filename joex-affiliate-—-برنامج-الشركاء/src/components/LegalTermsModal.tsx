import { X } from 'lucide-react';
import { CONTENT, Lang } from '../data/affiliateContent';

interface LegalTermsModalProps {
  lang: Lang;
  open: boolean;
  onClose: () => void;
}

export function LegalTermsModal({ lang, open, onClose }: LegalTermsModalProps) {
  if (!open) return null;
  const t = CONTENT[lang].terms;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-modal-title"
    >
      <div
        className="card w-full max-w-2xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 mb-5 pb-4 border-b border-[var(--line)]">
          <h2 id="terms-modal-title" className="text-xl md:text-2xl font-bold">
            {t.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-2)] hover:text-[var(--text)] cursor-pointer bg-transparent"
            aria-label={t.close}
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-5 text-[15px] leading-relaxed">
          {t.sections.map((section) => (
            <div key={section.heading} className="flex flex-col gap-2">
              <h3 className="text-base font-bold text-[var(--gold-hi)]">{section.heading}</h3>
              <ul className="m-0 ps-4 flex flex-col gap-1.5 text-[var(--text-2)] list-disc">
                {section.lines.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-[var(--line)] flex justify-end">
          <button type="button" className="btn btn-primary" onClick={onClose}>
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}
