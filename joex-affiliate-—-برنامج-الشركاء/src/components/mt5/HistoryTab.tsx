import { useState } from 'react';
import { Calendar, ArrowUpDown } from 'lucide-react';
import { Lang } from '../../data/affiliateContent';
import { MT5_LABELS, Mt5HistoryDeal } from '../../data/mt5Data';

interface HistoryTabProps {
  lang: Lang;
  deals: Mt5HistoryDeal[];
}

export function HistoryTab({ lang, deals }: HistoryTabProps) {
  const t = MT5_LABELS[lang].history;
  const [segment, setSegment] = useState<'positions' | 'orders' | 'deals'>('positions');
  const [sortAsc, setSortAsc] = useState(false);

  const visibleDeals = sortAsc ? [...deals].reverse() : deals;

  const depositTotal = deals
    .filter((d) => d.type === 'balance')
    .reduce((acc, d) => acc + d.profit, 0);

  const profitTotal = deals
    .filter((d) => d.type === 'deal')
    .reduce((acc, d) => acc + d.profit, 0);

  const swapTotal = deals.reduce((acc, d) => acc + d.swap, 0);
  const commissionTotal = deals.reduce((acc, d) => acc + d.commission, 0);
  const finalBalance = depositTotal + profitTotal + swapTotal + commissionTotal;

  const formatMoney = (val: number) =>
    val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="flex flex-col min-h-full pb-28 bg-black text-white">
      {/* Top Bar with 3-Segment Control matching video 00:05 - 00:07 */}
      <div className="sticky top-0 z-20 bg-black/90 backdrop-blur-md px-4 pt-3 pb-2.5 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setSortAsc((v) => !v)}
          className="w-9 h-9 rounded-full bg-[#1c1c1e] border border-white/10 flex items-center justify-center text-white cursor-pointer hover:bg-[#2c2c2e]"
          aria-label="Sort"
        >
          <ArrowUpDown size={16} />
        </button>

        <div className="flex items-center bg-[#1c1c1e] p-1 rounded-full border border-white/10">
          {(['positions', 'orders', 'deals'] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSegment(key)}
              className={`px-3.5 py-1 rounded-full text-[13px] font-semibold border-0 cursor-pointer transition-colors ${
                segment === key
                  ? 'bg-[#3a3a3c] text-white'
                  : 'bg-transparent text-[#8e8e93] hover:text-white'
              }`}
            >
              {t.segments[key]}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setSortAsc((v) => !v)}
          className="w-9 h-9 rounded-full bg-[#1c1c1e] border border-white/10 flex items-center justify-center text-white cursor-pointer hover:bg-[#2c2c2e]"
          aria-label="Period"
        >
          <Calendar size={16} />
        </button>
      </div>

      {/* Deals List */}
      <div className="divide-y divide-[#1c1c1e] px-4">
        {visibleDeals.map((deal) => {
          if (deal.type === 'balance') {
            return (
              <div key={deal.id} className="py-2.5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold text-white">{deal.symbol}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span dir="ltr" className="text-[15px] font-bold num text-[#0a84ff]">
                    {formatMoney(deal.profit)}
                  </span>
                  <span dir="ltr" className="text-[12px] text-[#8e8e93] num">
                    {deal.time}
                  </span>
                </div>
              </div>
            );
          }

          const isWin = deal.profit >= 0;

          return (
            <div key={deal.id} className="py-2.5 flex items-center justify-between gap-2">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-[15px] font-bold text-white">{deal.symbol}</span>
                  <span
                    dir="ltr"
                    className="text-[14px] font-semibold"
                    style={{ color: deal.side === 'buy' ? '#0a84ff' : '#ff453a' }}
                  >
                    {deal.side} {deal.volume}
                  </span>
                </div>
                <span dir="ltr" className="text-[12px] text-[#8e8e93] num">
                  {deal.openPrice?.toFixed(5)} → {deal.closePrice?.toFixed(5)}
                </span>
              </div>

              <div className="flex flex-col items-end">
                <span
                  dir="ltr"
                  className="text-[15px] font-bold num"
                  style={{ color: isWin ? '#0a84ff' : '#ff453a' }}
                >
                  {formatMoney(deal.profit)}
                </span>
                <span dir="ltr" className="text-[12px] text-[#8e8e93] num">
                  {deal.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Summary matching video 00:05 */}
      <div className="mt-2 px-4 py-3 border-t border-[#1c1c1e] flex flex-col gap-1.5 text-[15px]">
        <div className="flex justify-between">
          <span className="text-white font-semibold">{t.deposit}</span>
          <span dir="ltr" className="font-bold num text-white">
            {formatMoney(depositTotal)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-white font-semibold">{t.profit}</span>
          <span dir="ltr" className="font-bold num text-white">
            {formatMoney(profitTotal)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-white font-semibold">{t.swap}</span>
          <span dir="ltr" className="font-bold num text-white">
            {formatMoney(swapTotal)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-white font-semibold">{t.commission}</span>
          <span dir="ltr" className="font-bold num text-white">
            {formatMoney(commissionTotal)}
          </span>
        </div>
        <div className="flex justify-between pt-1">
          <span className="text-white font-bold">{t.balance}</span>
          <span dir="ltr" className="font-bold num text-white">
            {formatMoney(finalBalance)}
          </span>
        </div>
      </div>
    </div>
  );
}
