import { useState } from 'react';
import { List, Pencil, Search, Trash2, X } from 'lucide-react';
import { Lang } from '../../data/affiliateContent';
import { MT5_LABELS, Mt5Symbol } from '../../data/mt5Data';
import { Mt5PriceText } from './Mt5PriceText';

interface QuotesTabProps {
  lang: Lang;
  symbols: Mt5Symbol[];
  onSelectTrade: (symbol: string) => void;
  onSelectChart: (symbol: string) => void;
  onDeleteSymbol: (symbol: string) => void;
}

export function QuotesTab({
  lang,
  symbols,
  onSelectTrade,
  onSelectChart,
  onDeleteSymbol,
}: QuotesTabProps) {
  const t = MT5_LABELS[lang].quotes;
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState<Mt5Symbol | null>(null);
  const [detailModal, setDetailModal] = useState<'details' | 'stats' | 'dom' | null>(null);

  const filtered = symbols.filter(
    (s) =>
      s.symbol.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-full pb-28 bg-black text-white">
      {/* Top Bar matching photo_2026-11-24_02-24-51 */}
      <div className="sticky top-0 z-20 bg-black/90 backdrop-blur-md px-4 pt-3 pb-2.5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setCompactMode((v) => !v)}
          className="w-10 h-10 rounded-full bg-[#1c1c1e] border border-white/10 flex items-center justify-center text-white cursor-pointer hover:bg-[#2c2c2e] transition-colors"
          aria-label="Toggle view"
        >
          <List size={18} />
        </button>

        <h1 className="text-[18px] font-bold tracking-tight m-0 text-white">
          {t.title}
        </h1>

        <div className="flex items-center bg-[#1c1c1e] border border-white/10 rounded-full p-1 gap-1">
          <button
            type="button"
            onClick={() => {
              setSearchOpen((v) => !v);
              setSearchQuery('');
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border-0 transition-colors ${
              searchOpen ? 'bg-[#0a84ff] text-white' : 'bg-transparent text-white hover:bg-white/10'
            }`}
            aria-label="Search"
          >
            <Search size={17} />
          </button>
          <button
            type="button"
            onClick={() => setEditMode((v) => !v)}
            className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border-0 transition-colors ${
              editMode ? 'bg-[#0a84ff] text-white' : 'bg-transparent text-white hover:bg-white/10'
            }`}
            aria-label="Edit watchlist"
          >
            <Pencil size={16} />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className="px-4 pb-2">
          <div className="flex items-center gap-2 bg-[#1c1c1e] rounded-xl px-3 py-2 border border-white/10">
            <Search size={16} className="text-[#8e8e93] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="bg-transparent border-0 text-white text-sm w-full min-h-0 p-0 focus:shadow-none focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-[#8e8e93] bg-transparent border-0 p-0 cursor-pointer"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Symbols Rows */}
      <div className="divide-y divide-[#1c1c1e] px-3">
        {filtered.map((item) => {
          const isPos = item.changePct > 0;
          const isNeg = item.changePct < 0;
          const changeColor = isPos
            ? '#0a84ff'
            : isNeg
              ? '#ff453a'
              : '#8e8e93';

          return (
            <div
              key={item.symbol}
              onClick={() => {
                if (!editMode) setSelectedSymbol(item);
              }}
              className="py-2.5 px-1 flex items-center justify-between gap-2 cursor-pointer active:bg-[#1c1c1e]/60 transition-colors"
            >
              {/* Symbol Info (Start side in RTL) */}
              <div className="flex flex-col items-start min-w-[115px] gap-0.5">
                {!compactMode && (
                  <span
                    dir="ltr"
                    className="text-[12px] font-medium num leading-tight"
                    style={{ color: changeColor }}
                  >
                    {item.changePts !== 0
                      ? `${item.changePts > 0 ? '+' : ''}${item.changePts} ${item.changePct > 0 ? '' : ''}${item.changePct.toFixed(2)}%`
                      : '\u00A0'}
                  </span>
                )}
                <span className="text-[16px] font-bold text-white tracking-tight leading-tight">
                  {item.symbol}
                </span>
                {!compactMode && (
                  <span
                    dir="ltr"
                    className="text-[12px] text-[#8e8e93] num flex items-center gap-1.5 leading-tight"
                  >
                    <span>{item.time}</span>
                    <span className="opacity-70 text-[11px]">⇵ {item.spread}</span>
                  </span>
                )}
              </div>

              {/* Ask / Bid Split (End side in RTL, LTR numbers) */}
              {editMode ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSymbol(item.symbol);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#ff453a]/15 text-[#ff453a] border border-[#ff453a]/30 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 size={14} />
                  <span>{t.actions.delete}</span>
                </button>
              ) : (
                <div dir="ltr" className="flex items-center gap-5 sm:gap-8">
                  <div className="flex flex-col items-end min-w-[92px]">
                    <Mt5PriceText
                      price={item.bid}
                      digits={item.digits}
                      direction={item.direction}
                    />
                    {!compactMode && (
                      <span className="text-[11px] text-[#8e8e93] num mt-1">
                        H: {item.high.toFixed(item.digits)}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col items-end min-w-[92px]">
                    <Mt5PriceText
                      price={item.ask}
                      digits={item.digits}
                      direction={item.direction}
                    />
                    {!compactMode && (
                      <span className="text-[11px] text-[#8e8e93] num mt-1">
                        L: {item.low.toFixed(item.digits)}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Centered Action Sheet Modal (exact match to video 00:13 - 00:16 & 00:25) */}
      {selectedSymbol && !detailModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedSymbol(null)}
        >
          <div
            className="w-full max-w-[330px] rounded-2xl overflow-hidden bg-[#1c1c1e]/95 border border-white/10 shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3.5 border-b border-white/10">
              <p className="text-[13px] font-medium text-[#98989f] m-0 leading-snug" dir="ltr">
                {selectedSymbol.symbol}: {selectedSymbol.description}
              </p>
            </div>

            <div className="divide-y divide-white/10 flex flex-col">
              <button
                type="button"
                onClick={() => {
                  const sym = selectedSymbol.symbol;
                  setSelectedSymbol(null);
                  onSelectTrade(sym);
                }}
                className="py-3.5 text-[16px] font-medium text-white bg-transparent border-0 cursor-pointer hover:bg-white/5"
              >
                {t.actions.trade}
              </button>
              <button
                type="button"
                onClick={() => {
                  const sym = selectedSymbol.symbol;
                  setSelectedSymbol(null);
                  onSelectChart(sym);
                }}
                className="py-3.5 text-[16px] font-medium text-white bg-transparent border-0 cursor-pointer hover:bg-white/5"
              >
                {t.actions.chart}
              </button>
              <button
                type="button"
                onClick={() => setDetailModal('details')}
                className="py-3.5 text-[16px] font-medium text-white bg-transparent border-0 cursor-pointer hover:bg-white/5"
              >
                {t.actions.details}
              </button>
              <button
                type="button"
                onClick={() => setDetailModal('stats')}
                className="py-3.5 text-[16px] font-medium text-white bg-transparent border-0 cursor-pointer hover:bg-white/5"
              >
                {t.actions.stats}
              </button>
              <button
                type="button"
                onClick={() => setDetailModal('dom')}
                className="py-3.5 text-[16px] font-medium text-white bg-transparent border-0 cursor-pointer hover:bg-white/5"
              >
                {t.actions.dom}
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteSymbol(selectedSymbol.symbol);
                  setSelectedSymbol(null);
                }}
                className="py-3.5 text-[16px] font-medium text-[#ff453a] bg-transparent border-0 cursor-pointer hover:bg-white/5"
              >
                {t.actions.delete}
              </button>
              <button
                type="button"
                onClick={() => setSelectedSymbol(null)}
                className="py-3.5 text-[16px] font-semibold text-white bg-transparent border-0 cursor-pointer hover:bg-white/5"
              >
                {t.actions.cancel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details / Stats / DOM sub-sheet */}
      {selectedSymbol && detailModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/75 backdrop-blur-sm"
          onClick={() => {
            setDetailModal(null);
            setSelectedSymbol(null);
          }}
        >
          <div
            className="w-full max-w-[360px] rounded-2xl bg-[#1c1c1e] border border-white/10 p-5 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <h3 className="text-base font-bold m-0">
                {selectedSymbol.symbol} · {t.actions[detailModal]}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setDetailModal(null);
                  setSelectedSymbol(null);
                }}
                className="text-[#8e8e93] bg-transparent border-0 p-1 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {detailModal === 'dom' ? (
              <div className="flex flex-col gap-1.5 text-sm num" dir="ltr">
                {[3, 2, 1].map((i) => (
                  <div key={`ask-${i}`} className="flex justify-between px-3 py-1.5 rounded bg-[#ff453a]/15 text-[#ff453a]">
                    <span>{(selectedSymbol.ask + i * Math.pow(10, -selectedSymbol.digits + 1)).toFixed(selectedSymbol.digits)}</span>
                    <span>{(i * 15).toFixed(2)}</span>
                  </div>
                ))}
                {[1, 2, 3].map((i) => (
                  <div key={`bid-${i}`} className="flex justify-between px-3 py-1.5 rounded bg-[#0a84ff]/15 text-[#0a84ff]">
                    <span>{(selectedSymbol.bid - i * Math.pow(10, -selectedSymbol.digits + 1)).toFixed(selectedSymbol.digits)}</span>
                    <span>{(i * 12).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#8e8e93]">{t.detailsFields.spread}</span>
                  <span className="num">{selectedSymbol.spread}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8e8e93]">{t.detailsFields.digits}</span>
                  <span className="num">{selectedSymbol.digits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8e8e93]">{t.detailsFields.contractSize}</span>
                  <span className="num">{selectedSymbol.contractSize.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8e8e93]">{t.detailsFields.high}</span>
                  <span className="num">{selectedSymbol.high.toFixed(selectedSymbol.digits)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8e8e93]">{t.detailsFields.low}</span>
                  <span className="num">{selectedSymbol.low.toFixed(selectedSymbol.digits)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
