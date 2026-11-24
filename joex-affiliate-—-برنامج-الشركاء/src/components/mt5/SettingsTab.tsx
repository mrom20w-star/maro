import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Globe,
  KeyRound,
  LogOut,
  Mail,
  MessageCircle,
  Newspaper,
  Plus,
  Users,
} from 'lucide-react';
import { Lang } from '../../data/affiliateContent';
import { MT5_LABELS } from '../../data/mt5Data';

interface SettingsTabProps {
  lang: Lang;
  username: string;
  onToggleLang: () => void;
  onSignOut: () => void;
}

export function SettingsTab({ lang, username, onToggleLang, onSignOut }: SettingsTabProps) {
  const t = MT5_LABELS[lang].settings;
  const ArrowIcon = lang === 'ar' ? ChevronLeft : ChevronRight;
  const displayName = username && username !== 'joex_partner' ? username : 'Wissam Tharwat';

  return (
    <div className="flex flex-col min-h-full pb-28 bg-black text-white px-4 pt-3 gap-4">
      {/* Header */}
      <h1 className="text-[28px] font-bold tracking-tight m-0 text-white">
        {MT5_LABELS[lang].tabs.settings}
      </h1>

      {/* Account Card with Green DEMO Ribbon (video 00:09) */}
      <div className="relative overflow-hidden rounded-2xl bg-[#1c1c1e] border border-white/10 divide-y divide-white/10">
        <div
          className="absolute top-2.5 -start-7 -rotate-45 bg-[#28cd41] text-black text-[10px] font-extrabold px-8 py-0.5 tracking-wider pointer-events-none"
        >
          {t.demoBadge}
        </div>

        <div className="p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5 ps-3">
            <div className="w-11 h-11 rounded-full bg-[#2c2c2e] border border-white/10 flex items-center justify-center font-bold text-[#0a84ff] text-base">
              MT5
            </div>
            <div className="flex flex-col">
              <strong className="text-[17px] font-bold text-white leading-snug">
                {displayName}
              </strong>
              <span className="text-[13px] text-[#8e8e93]" dir="ltr">
                MetaQuotes Ltd.
              </span>
              <span className="text-[12px] text-[#8e8e93] num" dir="ltr">
                5057617550 - MetaQuotes-Demo
              </span>
              <span className="text-[12px] text-[#8e8e93]" dir="ltr">
                Access Point EU 3
              </span>
            </div>
          </div>
          <ArrowIcon size={18} className="text-[#8e8e93] shrink-0" />
        </div>

        <button
          type="button"
          className="w-full px-4 py-3 flex items-center justify-between bg-transparent border-0 text-white cursor-pointer hover:bg-white/5"
        >
          <span className="flex items-center gap-3 text-[15px] font-medium">
            <span className="w-7 h-7 rounded-lg bg-[#28cd41] text-white flex items-center justify-center">
              <Plus size={17} strokeWidth={2.5} />
            </span>
            <span>{t.newAccount}</span>
          </span>
          <ArrowIcon size={18} className="text-[#8e8e93]" />
        </button>
      </div>

      {/* Group 1: Mailbox, News, Tradays */}
      <div className="rounded-2xl bg-[#1c1c1e] border border-white/10 divide-y divide-white/10 overflow-hidden">
        <div className="px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-8 h-8 rounded-lg bg-[#0a84ff] text-white flex items-center justify-center shrink-0">
              <Mail size={17} />
            </span>
            <div className="flex flex-col min-w-0">
              <span className="text-[15px] font-medium text-white">{t.mailbox}</span>
              <span className="text-[12px] text-[#8e8e93] truncate">{t.mailboxSub}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-5 h-5 rounded-full bg-[#ff3b30] text-white text-[11px] font-bold flex items-center justify-center num">
              1
            </span>
            <ArrowIcon size={18} className="text-[#8e8e93]" />
          </div>
        </div>

        <div className="px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#ff9f0a] text-white flex items-center justify-center shrink-0">
              <Newspaper size={17} />
            </span>
            <span className="text-[15px] font-medium text-white">{t.news}</span>
          </div>
          <ArrowIcon size={18} className="text-[#8e8e93]" />
        </div>

        <div className="px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#2c2c2e] text-[#ff453a] flex items-center justify-center shrink-0">
              <CalendarDays size={17} />
            </span>
            <div className="flex flex-col">
              <span className="text-[15px] font-medium text-white">{t.tradays}</span>
              <span className="text-[12px] text-[#8e8e93]">{t.tradaysSub}</span>
            </div>
          </div>
          <ArrowIcon size={18} className="text-[#8e8e93]" />
        </div>
      </div>

      {/* Group 2: Chat, Community, Algo */}
      <div className="rounded-2xl bg-[#1c1c1e] border border-white/10 divide-y divide-white/10 overflow-hidden">
        <div className="px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#28cd41] text-white flex items-center justify-center shrink-0">
              <MessageCircle size={17} />
            </span>
            <div className="flex flex-col">
              <span className="text-[15px] font-medium text-white">{t.chat}</span>
              <span className="text-[12px] text-[#8e8e93]">{t.chatSub}</span>
            </div>
          </div>
          <ArrowIcon size={18} className="text-[#8e8e93]" />
        </div>

        <div className="px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#0a84ff] text-white flex items-center justify-center shrink-0">
              <Users size={17} />
            </span>
            <span className="text-[15px] font-medium text-white">{t.community}</span>
          </div>
          <ArrowIcon size={18} className="text-[#8e8e93]" />
        </div>

        <div className="px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#5e5ce6] text-white flex items-center justify-center shrink-0">
              <Cpu size={17} />
            </span>
            <span className="text-[15px] font-medium text-white">{t.algo}</span>
          </div>
          <ArrowIcon size={18} className="text-[#8e8e93]" />
        </div>
      </div>

      {/* Group 3: OTP & Interface Language */}
      <div className="rounded-2xl bg-[#1c1c1e] border border-white/10 divide-y divide-white/10 overflow-hidden">
        <div className="px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#28cd41] text-white flex items-center justify-center shrink-0">
              <KeyRound size={17} />
            </span>
            <div className="flex flex-col">
              <span className="text-[15px] font-medium text-white">{t.otp}</span>
              <span className="text-[12px] text-[#8e8e93]">{t.otpSub}</span>
            </div>
          </div>
          <ArrowIcon size={18} className="text-[#8e8e93]" />
        </div>

        <button
          type="button"
          onClick={onToggleLang}
          className="w-full px-4 py-3 flex items-center justify-between gap-3 bg-transparent border-0 text-start cursor-pointer hover:bg-white/5"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#0a84ff] text-white flex items-center justify-center shrink-0">
              <Globe size={17} />
            </span>
            <div className="flex flex-col">
              <span className="text-[15px] font-medium text-white">{t.interface}</span>
              <span className="text-[12px] text-[#8e8e93]">{t.interfaceVal}</span>
            </div>
          </div>
          <ArrowIcon size={18} className="text-[#8e8e93]" />
        </button>
      </div>

      {/* Sign Out Button */}
      <button
        type="button"
        onClick={onSignOut}
        className="w-full rounded-2xl bg-[#1c1c1e] border border-white/10 px-4 py-3.5 flex items-center justify-center gap-2 text-[#ff453a] font-semibold text-[15px] cursor-pointer hover:bg-[#2c2c2e]"
      >
        <LogOut size={17} />
        <span>{t.signOut}</span>
      </button>
    </div>
  );
}
