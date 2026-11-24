import { Plus, TrendingUp } from 'lucide-react';
import { Lang } from '../../data/affiliateContent';
import { MT5_LABELS, Mt5Position, Mt5Symbol } from '../../data/mt5Data';

interface TradeTabProps {
  lang: Lang;
  balance: number;
  positions: Mt5Position[];
  symbols: Mt5Symbol[];
  onOpenNewOrder: () => void;
  onClosePosition: (id: string) => void;
}

export function calcPositionProfit(pos: Mt5Position, sym?: Mt5Symbol): number {
  if (!sym) return 0;
  const currentPrice = pos.side === 'buy' ? sym.bid : sym.ask;
  const diff = pos.side === 'buy' ? currentPrice - pos.openPrice : pos.openPrice - currentPrice;
  const pipFactor = sym.digits === 3 ? 100 : sym.digits === 2 ? 10 : 10000;
  return Number((diff * pipFactor * pos.volume * 7.2).toFixed(2));
}

export function TradeTab({
  lang,
  balance,
  positions,
  symbols,
  onOpenNewOrder,
  onClosePosition,
}: TradeTabProps) {
  const t = MT5_LABELS[lang].trade;

  const totalFloating = positions.reduce((sum, pos) => {
    const sym = symbols.find((s) => s.symbol === pos.symbol);
    return sum + calcPositionProfit(pos, sym);
  }, 0);

  const equity = balance + totalFloating;
  const usedMargin = positions.reduce((sum, pos) => sum + pos.volume * 200, 0);
  const freeMargin = equity - usedMargin;

  const formatMoney = (val: number) =>
    val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="flex flex-col min-h-[calc(100vh-88px)] pb-28 bg-black text-white">
      {/* Top Bar matching video 00:02 - 00:04 */}
      <div className="px-4 pt-3 pb-2.5 flex items-center justify-between">
        <div className="w-9" />
        <div className="text-center">
          {positions.length > 0 ? (
            <span
              dir="ltr"
              className="text-[18px] font-bold num"
              style={{ color: totalFloating >= 0 ? '#0a84ff' : '#ff453a' }}
            >
              {totalFloating >= 0 ? '+' : ''}
              {formatMoney(totalFloating)} USD
            </span>
          ) : (
            <span className="text-[18px] font-bold text-white num">USD</span>
          )}
        </div>
        <button
          type="button"
          onClick={onOpenNewOrder}
          className="w-9 h-9 rounded-full bg-[#1c1c1e] border border-white/10 flex items-center justify-center text-white hover:bg-[#2c2c2e] cursor-pointer"
          aria-label="New Order"
        >
          <Plus size={19} />
        </button>
      </div>

      {/* Account Summary Block */}
      <div className="px-4 py-3 flex flex-col gap-1.5 border-b border-[#1c1c1e] text-[15px]">
        <div className="flex items-center justify-between">
          <span className="text-white font-semibold">{t.balance}</span>
          <span dir="ltr" className="font-bold num text-white">
            {formatMoney(balance)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white font-semibold">{t.equity}</span>
          <span dir="ltr" className="font-bold num text-white">
            {formatMoney(equity)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white font-semibold">{t.freeMargin}</span>
          <span dir="ltr" className="font-bold num text-white">
            {formatMoney(freeMargin)}
          </span>
        </div>
        {usedMargin > 0 && (
          <div className="flex items-center justify-between text-[#8e8e93] text-[14px]">
            <span>{t.margin}</span>
            <span dir="ltr" className="num">
              {formatMoney(usedMargin)}
            </span>
          </div>
        )}
      </div>

      {/* Positions List or Minimal Centered Trend Icon */}
      {positions.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20 opacity-90">
          <TrendingUp size={74} strokeWidth={2.4} className="text-white" />
        </div>
      ) : (
        <div className="divide-y divide-[#1c1c1e] px-4">
          {positions.map((pos) => {
            const sym = symbols.find((s) => s.symbol === pos.symbol);
            const current = sym ? (pos.side === 'buy' ? sym.bid : sym.ask) : pos.openPrice;
            const profit = calcPositionProfit(pos, sym);
            const digits = sym?.digits ?? 5;

            return (
              <div
                key={pos.id}
                className="py-3 flex items-center justify-between gap-3"
              >
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[15px] text-white">{pos.symbol}</span>
                    <span
                      dir="ltr"
                      className="text-[14px] font-semibold"
                      style={{ color: pos.side === 'buy' ? '#0a84ff' : '#ff453a' }}
                    >
                      {pos.side} {pos.volume}
                    </span>
                  </div>
                  <span dir="ltr" className="text-[12px] text-[#8e8e93] num">
                    {pos.openPrice.toFixed(digits)} → {current.toFixed(digits)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    dir="ltr"
                    className="text-[15px] font-bold num"
                    style={{ color: profit >= 0 ? '#0a84ff' : '#ff453a' }}
                  >
                    {profit.toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() => onClosePosition(pos.id)}
                    className="px-2.5 py-1 rounded-lg bg-[#1c1c1e] border border-white/15 text-[12px] text-white hover:bg-[#ff453a] hover:border-[#ff453a] cursor-pointer transition-colors"
                  >
                    {t.closePosition}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
