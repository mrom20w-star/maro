import { useState } from 'react';
import { ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { Lang } from '../../data/affiliateContent';
import { MT5_LABELS, Mt5Symbol } from '../../data/mt5Data';
import { Mt5PriceText } from './Mt5PriceText';

interface OrderExecutionViewProps {
  lang: Lang;
  symbols: Mt5Symbol[];
  initialSymbol: string;
  onBack: () => void;
  onExecuteOrder: (order: {
    symbol: string;
    side: 'buy' | 'sell';
    volume: number;
    sl: number | null;
    tp: number | null;
  }) => void;
}

export function OrderExecutionView({
  lang,
  symbols,
  initialSymbol,
  onBack,
  onExecuteOrder,
}: OrderExecutionViewProps) {
  const t = MT5_LABELS[lang].order;
  const [selectedSym, setSelectedSym] = useState(initialSymbol);
  const [volume, setVolume] = useState(30.0);
  const [sl, setSl] = useState<string>('');
  const [tp, setTp] = useState<string>('');
  const [banner, setBanner] = useState('');

  const symObj = symbols.find((s) => s.symbol === selectedSym) || symbols[0];

  const adjustVolume = (delta: number) => {
    setVolume((prev) => {
      const next = Math.max(0.01, Math.min(100, Number((prev + delta).toFixed(2))));
      return next;
    });
  };

  const adjustLevel = (current: string, deltaSteps: number, setter: (val: string) => void) => {
    const step = Math.pow(10, -(symObj.digits - 1));
    const base = current ? parseFloat(current) : symObj.bid;
    const next = Math.max(0, base + deltaSteps * step);
    setter(next.toFixed(symObj.digits));
  };

  const placeOrder = (side: 'buy' | 'sell') => {
    setBanner(t.executed);
    onExecuteOrder({
      symbol: symObj.symbol,
      side,
      volume,
      sl: sl ? parseFloat(sl) : null,
      tp: tp ? parseFloat(tp) : null,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col pb-12">
      {/* Top Bar matching video 00:17 - 00:19 */}
      <div className="px-4 pt-3 pb-3 flex items-center justify-between border-b border-[#1c1c1e]">
        <div className="w-9" />
        <div className="text-center flex flex-col items-center">
          <div className="flex items-center gap-1">
            <select
              value={symObj.symbol}
              onChange={(e) => {
                setSelectedSym(e.target.value);
                setSl('');
                setTp('');
              }}
              className="bg-transparent border-0 text-white font-bold text-[17px] p-0 min-h-0 w-auto focus:shadow-none cursor-pointer text-center"
            >
              {symbols.map((s) => (
                <option key={s.symbol} value={s.symbol} className="bg-[#1c1c1e] text-white">
                  {s.symbol}
                </option>
              ))}
            </select>
          </div>
          <span className="text-[11px] text-[#8e8e93]" dir="ltr">
            {symObj.description}
          </span>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-[#1c1c1e] border border-white/10 flex items-center justify-center text-white cursor-pointer"
          aria-label="Back"
        >
          {lang === 'ar' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {banner && (
        <div className="bg-[#16c784]/20 border-b border-[#16c784]/40 text-[#9fe9c4] text-center py-2 text-sm font-semibold">
          {banner}
        </div>
      )}

      {/* Execution Type */}
      <div className="divide-y divide-[#1c1c1e] px-4">
        <div className="py-3.5 text-center font-semibold text-[16px] text-white">
          {t.marketExecution}
        </div>

        {/* Volume Stepper (-10, -1, 30.00, +1, +10) */}
        <div dir="ltr" className="py-3.5 flex items-center justify-between text-[15px] font-semibold num">
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => adjustVolume(-10)}
              className="text-[#0a84ff] bg-transparent border-0 cursor-pointer p-1"
            >
              -10
            </button>
            <button
              type="button"
              onClick={() => adjustVolume(-1)}
              className="text-[#0a84ff] bg-transparent border-0 cursor-pointer p-1"
            >
              -1
            </button>
          </div>

          <span className="text-[18px] font-bold text-white">{volume.toFixed(2)}</span>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => adjustVolume(1)}
              className="text-[#0a84ff] bg-transparent border-0 cursor-pointer p-1"
            >
              +1
            </button>
            <button
              type="button"
              onClick={() => adjustVolume(10)}
              className="text-[#0a84ff] bg-transparent border-0 cursor-pointer p-1"
            >
              +10
            </button>
          </div>
        </div>

        {/* Stop Loss */}
        <div className="py-3.5 flex items-center justify-between">
          <span className="text-[15px] text-white">{t.stopLoss}</span>
          <div dir="ltr" className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => adjustLevel(sl, -10, setSl)}
              className="text-[#0a84ff] bg-transparent border-0 cursor-pointer p-1"
            >
              <Minus size={18} />
            </button>
            <input
              type="text"
              value={sl}
              onChange={(e) => setSl(e.target.value)}
              placeholder={t.notSet}
              className="w-28 text-center bg-transparent border-0 text-[#8e8e93] focus:text-white text-[14px] p-0 min-h-0 focus:shadow-none"
            />
            <button
              type="button"
              onClick={() => adjustLevel(sl, 10, setSl)}
              className="text-[#0a84ff] bg-transparent border-0 cursor-pointer p-1"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* Take Profit */}
        <div className="py-3.5 flex items-center justify-between">
          <span className="text-[15px] text-white">{t.takeProfit}</span>
          <div dir="ltr" className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => adjustLevel(tp, -10, setTp)}
              className="text-[#0a84ff] bg-transparent border-0 cursor-pointer p-1"
            >
              <Minus size={18} />
            </button>
            <input
              type="text"
              value={tp}
              onChange={(e) => setTp(e.target.value)}
              placeholder={t.notSet}
              className="w-28 text-center bg-transparent border-0 text-[#8e8e93] focus:text-white text-[14px] p-0 min-h-0 focus:shadow-none"
            />
            <button
              type="button"
              onClick={() => adjustLevel(tp, 10, setTp)}
              className="text-[#0a84ff] bg-transparent border-0 cursor-pointer p-1"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* Fill Policy */}
        <div className="py-3.5 flex items-center justify-between text-[15px]">
          <span className="text-white">{t.fillPolicy}</span>
          <span className="text-[#c7c7cc]">{t.fillOrKill}</span>
        </div>
      </div>

      {/* Live Bid / Ask Display */}
      <div dir="ltr" className="py-7 px-6 grid grid-cols-2 gap-4 place-items-center">
        <Mt5PriceText
          price={symObj.bid}
          digits={symObj.digits}
          direction={symObj.direction}
          size="lg"
        />
        <Mt5PriceText
          price={symObj.ask}
          digits={symObj.digits}
          direction={symObj.direction}
          size="lg"
        />
      </div>

      {/* Sell by Market / Buy by Market Buttons */}
      <div dir="ltr" className="px-4 grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => placeOrder('sell')}
          className="h-12 rounded-xl bg-[#ff3b30] hover:bg-[#ff453a] text-white font-bold text-[15px] border-0 cursor-pointer transition-colors"
        >
          {t.sell}
        </button>
        <button
          type="button"
          onClick={() => placeOrder('buy')}
          className="h-12 rounded-xl bg-[#0a84ff] hover:bg-[#3399ff] text-white font-bold text-[15px] border-0 cursor-pointer transition-colors"
        >
          {t.buy}
        </button>
      </div>

      <p className="text-center text-[12px] text-[#8e8e93] px-6 mt-4 mb-0">
        {t.disclaimer}
      </p>
    </div>
  );
}
