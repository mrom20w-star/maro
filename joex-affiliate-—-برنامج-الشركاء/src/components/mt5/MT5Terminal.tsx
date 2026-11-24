import { useEffect, useState } from 'react';
import { ArrowUpDown, CandlestickChart, History, Settings, TrendingUp } from 'lucide-react';
import { Lang } from '../../data/affiliateContent';
import {
  INITIAL_HISTORY,
  INITIAL_SYMBOLS,
  MT5_LABELS,
  Mt5HistoryDeal,
  Mt5Position,
  Mt5Symbol,
  Mt5Tab,
} from '../../data/mt5Data';
import { ChartTab } from './ChartTab';
import { HistoryTab } from './HistoryTab';
import { OrderExecutionView } from './OrderExecutionView';
import { QuotesTab } from './QuotesTab';
import { SettingsTab } from './SettingsTab';
import { TradeTab, calcPositionProfit } from './TradeTab';

interface MT5TerminalProps {
  lang: Lang;
  username: string;
  onToggleLang: () => void;
  onSignOut: () => void;
}

export function MT5Terminal({
  lang,
  username,
  onToggleLang,
  onSignOut,
}: MT5TerminalProps) {
  const t = MT5_LABELS[lang].tabs;
  const [activeTab, setActiveTab] = useState<Mt5Tab>('quotes');
  const [symbols, setSymbols] = useState<Mt5Symbol[]>(INITIAL_SYMBOLS);
  const [chartSymbol, setChartSymbol] = useState<string>('GOLD');
  const [orderSymbol, setOrderSymbol] = useState<string | null>(null);
  const [positions, setPositions] = useState<Mt5Position[]>([]);
  const [deals, setDeals] = useState<Mt5HistoryDeal[]>(INITIAL_HISTORY);

  // Live micro-tick price simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setSymbols((prev) =>
        prev.map((s) => {
          if (s.symbol === 'AUDHUF' || s.symbol === 'GOLD') return s;
          if (Math.random() > 0.45) return s;

          const pip = Math.pow(10, -s.digits);
          const deltaSteps = Math.floor(Math.random() * 5) - 2;
          if (deltaSteps === 0) return { ...s, direction: 'flat' };

          const nextBid = Number((s.bid + deltaSteps * pip).toFixed(s.digits));
          const spreadVal = s.spread * pip;
          const nextAsk = Number((nextBid + spreadVal).toFixed(s.digits));
          const dir = deltaSteps > 0 ? 'up' : 'down';

          const now = new Date();
          const hh = String(now.getHours()).padStart(2, '0');
          const mm = String(now.getMinutes()).padStart(2, '0');
          const ss = String(now.getSeconds()).padStart(2, '0');

          return {
            ...s,
            bid: nextBid,
            ask: nextAsk,
            high: Math.max(s.high, nextBid),
            low: Math.min(s.low, nextBid),
            direction: dir,
            time: `${hh}:${mm}:${ss}`,
          };
        })
      );
    }, 1300);

    return () => clearInterval(interval);
  }, []);

  const balance = deals.reduce((acc, d) => acc + d.profit + d.swap + d.commission, 0);

  const handleExecuteOrder = (order: {
    symbol: string;
    side: 'buy' | 'sell';
    volume: number;
    sl: number | null;
    tp: number | null;
  }) => {
    const sym = symbols.find((s) => s.symbol === order.symbol);
    if (!sym) return;

    const openPrice = order.side === 'buy' ? sym.ask : sym.bid;
    const now = new Date();
    const openTime = `2026.11.24 ${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const newPos: Mt5Position = {
      id: `pos-${Date.now()}`,
      symbol: order.symbol,
      side: order.side,
      volume: order.volume,
      openPrice,
      sl: order.sl,
      tp: order.tp,
      openTime,
    };

    setPositions((prev) => [newPos, ...prev]);
    setOrderSymbol(null);
    setActiveTab('trade');
  };

  const handleClosePosition = (posId: string) => {
    const pos = positions.find((p) => p.id === posId);
    if (!pos) return;
    const sym = symbols.find((s) => s.symbol === pos.symbol);
    const closePrice = sym ? (pos.side === 'buy' ? sym.bid : sym.ask) : pos.openPrice;
    const profit = calcPositionProfit(pos, sym);

    const now = new Date();
    const closeTime = `2026.11.24 ${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const newDeal: Mt5HistoryDeal = {
      id: `deal-${Date.now()}`,
      type: 'deal',
      symbol: pos.symbol,
      side: pos.side,
      volume: pos.volume,
      openPrice: pos.openPrice,
      closePrice,
      time: closeTime,
      profit,
      swap: 0,
      commission: 0,
    };

    setPositions((prev) => prev.filter((p) => p.id !== posId));
    setDeals((prev) => [...prev, newDeal]);
  };

  const handleDeleteSymbol = (symName: string) => {
    setSymbols((prev) => prev.filter((s) => s.symbol !== symName));
  };

  if (orderSymbol) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-[680px] mx-auto">
          <OrderExecutionView
            lang={lang}
            symbols={symbols}
            initialSymbol={orderSymbol}
            onBack={() => setOrderSymbol(null)}
            onExecuteOrder={handleExecuteOrder}
          />
        </div>
      </div>
    );
  }

  const navItems: { id: Mt5Tab; label: string; icon: typeof ArrowUpDown }[] = [
    { id: 'quotes', label: t.quotes, icon: ArrowUpDown },
    { id: 'chart', label: t.chart, icon: CandlestickChart },
    { id: 'trade', label: t.trade, icon: TrendingUp },
    { id: 'history', label: t.history, icon: History },
    { id: 'settings', label: t.settings, icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative">
      <div className="max-w-[780px] mx-auto min-h-screen">
        {activeTab === 'quotes' && (
          <QuotesTab
            lang={lang}
            symbols={symbols}
            onSelectTrade={(sym) => setOrderSymbol(sym)}
            onSelectChart={(sym) => {
              setChartSymbol(sym);
              setActiveTab('chart');
            }}
            onDeleteSymbol={handleDeleteSymbol}
          />
        )}

        {activeTab === 'chart' && (
          <ChartTab
            lang={lang}
            symbols={symbols}
            activeSymbol={chartSymbol}
            onChangeSymbol={setChartSymbol}
            onOpenTrade={(sym) => setOrderSymbol(sym)}
          />
        )}

        {activeTab === 'trade' && (
          <TradeTab
            lang={lang}
            balance={balance}
            positions={positions}
            symbols={symbols}
            onOpenNewOrder={() => setOrderSymbol(symbols[0]?.symbol || 'AUDCAD')}
            onClosePosition={handleClosePosition}
          />
        )}

        {activeTab === 'history' && <HistoryTab lang={lang} deals={deals} />}

        {activeTab === 'settings' && (
          <SettingsTab
            lang={lang}
            username={username}
            onToggleLang={onToggleLang}
            onSignOut={onSignOut}
          />
        )}
      </div>

      {/* Floating Frosted-Glass Bottom Pill Dock matching screenshots & video */}
      <nav
        aria-label="Trading Terminal Navigation"
        className="fixed bottom-3 inset-x-0 z-40 px-3 flex justify-center pointer-events-none"
      >
        <div
          className="pointer-events-auto w-full max-w-[540px] rounded-[28px] px-2 py-1.5 grid grid-cols-5 items-center border border-white/15 shadow-2xl"
          style={{
            background: 'rgba(28, 28, 30, 0.84)',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-[22px] border-0 cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-white/10 text-[#0a84ff]'
                    : 'bg-transparent text-[#c7c7cc] hover:text-white'
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.2 : 1.75} />
                <span className="text-[11px] font-semibold whitespace-nowrap leading-tight">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
