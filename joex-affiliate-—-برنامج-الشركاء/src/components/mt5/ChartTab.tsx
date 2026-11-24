import { useMemo, useState } from 'react';
import { Clock, Crosshair, Layers, Shapes } from 'lucide-react';
import { Lang } from '../../data/affiliateContent';
import { generateCandles, MT5_LABELS, Mt5Symbol, Mt5Timeframe } from '../../data/mt5Data';

interface ChartTabProps {
  lang: Lang;
  symbols: Mt5Symbol[];
  activeSymbol: string;
  onChangeSymbol: (symbol: string) => void;
  onOpenTrade: (symbol: string) => void;
}

const TIMEFRAMES: Mt5Timeframe[] = ['M1', 'M5', 'M15', 'M30', 'H1', 'H4', 'D1'];

export function ChartTab({
  lang,
  symbols,
  activeSymbol,
  onChangeSymbol,
  onOpenTrade,
}: ChartTabProps) {
  const t = MT5_LABELS[lang].quotes;
  const [timeframe, setTimeframe] = useState<Mt5Timeframe>('H1');
  const [showTfMenu, setShowTfMenu] = useState(false);
  const [showSymbolMenu, setShowSymbolMenu] = useState(false);
  const [crosshairActive, setCrosshairActive] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [showEma, setShowEma] = useState(false);

  const symbolObj = useMemo(
    () => symbols.find((s) => s.symbol === activeSymbol) || symbols[0],
    [symbols, activeSymbol]
  );

  const candles = useMemo(
    () =>
      generateCandles(
        symbolObj.symbol,
        symbolObj.bid,
        symbolObj.digits,
        timeframe,
        64
      ),
    [symbolObj.symbol, symbolObj.bid, symbolObj.digits, timeframe]
  );

  // Price bounds
  const { minPrice, maxPrice, priceSteps } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    for (const c of candles) {
      if (c.low < min) min = c.low;
      if (c.high > max) max = c.high;
    }
    const pad = (max - min) * 0.1 || 0.01;
    const lo = min - pad;
    const hi = max + pad;
    const steps: number[] = [];
    const rows = 10;
    for (let i = 0; i <= rows; i++) {
      steps.push(hi - ((hi - lo) * i) / rows);
    }
    return { minPrice: lo, maxPrice: hi, priceSteps: steps };
  }, [candles]);

  const width = 900;
  const height = 540;
  const chartRight = 812;
  const chartBottom = 500;
  const chartTop = 18;
  const plotHeight = chartBottom - chartTop;

  const yForPrice = (p: number) =>
    chartTop + ((maxPrice - p) / (maxPrice - minPrice)) * plotHeight;

  const currentPrice = symbolObj.bid;
  const currentY = Math.min(chartBottom, Math.max(chartTop, yForPrice(currentPrice)));
  const lastCandle = candles[candles.length - 1];
  const isBullCurrent = lastCandle.close >= lastCandle.open;

  const emaPoints = useMemo(() => {
    let ema = candles[0].close;
    const k = 2 / (12 + 1);
    return candles
      .map((c, idx) => {
        ema = c.close * k + ema * (1 - k);
        const x = (idx + 0.5) * (chartRight / candles.length);
        const y = yForPrice(ema);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  }, [candles, maxPrice, minPrice]);

  const hoveredCandle = hoverIndex !== null ? candles[hoverIndex] : null;

  return (
    <div className="flex flex-col h-[calc(100vh-88px)] min-h-[520px] bg-black text-white select-none">
      {/* Top MT5 Chart Toolbar matching photo_2026-11-24_02-24-37 */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between border-b border-[#1c1c1e] relative z-30">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onOpenTrade(symbolObj.symbol)}
            className="w-8 h-8 rounded-lg bg-[#1c1c1e] border border-white/10 flex items-center justify-center text-[#ff453a] hover:bg-[#2c2c2e] cursor-pointer"
            title={t.actions.trade}
            aria-label={t.actions.trade}
          >
            <Layers size={16} />
          </button>
          <button
            type="button"
            onClick={() => setShowTfMenu((v) => !v)}
            className="w-8 h-8 rounded-lg bg-[#1c1c1e] border border-white/10 flex items-center justify-center text-[#0a84ff] hover:bg-[#2c2c2e] cursor-pointer"
            title="Timeframes"
            aria-label="Timeframes"
          >
            <Clock size={16} />
          </button>
        </div>

        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setShowSymbolMenu((v) => !v)}
            className="bg-transparent border-0 text-white hover:text-[#0a84ff] cursor-pointer p-1"
            title="Objects / Symbols"
            aria-label="Symbols"
          >
            <Shapes size={18} />
          </button>
          <button
            type="button"
            onClick={() => setShowEma((v) => !v)}
            className={`bg-transparent border-0 cursor-pointer p-1 font-serif italic text-[19px] leading-none ${
              showEma ? 'text-[#0a84ff]' : 'text-white'
            }`}
            title="Indicators (EMA 12)"
            aria-label="Indicators"
          >
            ƒ
          </button>
          <button
            type="button"
            onClick={() => {
              setCrosshairActive((v) => !v);
              setHoverIndex(null);
            }}
            className={`bg-transparent border-0 cursor-pointer p-1 ${
              crosshairActive ? 'text-[#0a84ff]' : 'text-white'
            }`}
            title="Crosshair"
            aria-label="Crosshair"
          >
            <Crosshair size={18} />
          </button>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowTfMenu((v) => !v)}
            className="bg-transparent border-0 text-white font-bold text-[15px] cursor-pointer px-2 py-1 rounded hover:bg-white/10 num"
          >
            {timeframe}
          </button>

          {showTfMenu && (
            <div className="absolute top-10 end-0 bg-[#1c1c1e] border border-white/15 rounded-xl p-1.5 flex flex-col gap-0.5 shadow-2xl min-w-[76px] z-40">
              {TIMEFRAMES.map((tf) => (
                <button
                  key={tf}
                  type="button"
                  onClick={() => {
                    setTimeframe(tf);
                    setShowTfMenu(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-center border-0 cursor-pointer num ${
                    tf === timeframe
                      ? 'bg-[#0a84ff] text-white'
                      : 'bg-transparent text-white hover:bg-white/10'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Symbol Switcher Dropdown */}
      {showSymbolMenu && (
        <div className="bg-[#1c1c1e] border-b border-white/10 px-4 py-2 flex flex-wrap gap-2 z-20">
          {symbols.map((s) => (
            <button
              key={s.symbol}
              type="button"
              onClick={() => {
                onChangeSymbol(s.symbol);
                setShowSymbolMenu(false);
              }}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold border cursor-pointer ${
                s.symbol === symbolObj.symbol
                  ? 'bg-[#0a84ff] border-[#0a84ff] text-white'
                  : 'bg-black border-white/15 text-[#98989f] hover:text-white'
              }`}
            >
              {s.symbol}
            </button>
          ))}
        </div>
      )}

      {/* Candlestick Plot Area */}
      <div className="relative flex-1 w-full overflow-hidden">
        {/* Top-left Symbol Info Overlay */}
        <div
          dir="ltr"
          className="absolute top-2.5 left-3 z-10 pointer-events-auto flex flex-col items-start text-left"
        >
          <button
            type="button"
            onClick={() => setShowSymbolMenu((v) => !v)}
            className="bg-transparent border-0 p-0 text-white font-semibold text-[13px] cursor-pointer flex items-center gap-1"
          >
            <span>{symbolObj.symbol}</span>
            <span className="text-[10px] opacity-75">▾</span>
            <span className="num">{timeframe}</span>
          </button>
          <span className="text-[11px] text-[#c7c7cc] leading-tight">
            {symbolObj.description}
          </span>
          <span className="text-[11px] text-[#8e8e93] leading-tight">
            {hoveredCandle
              ? `O:${hoveredCandle.open.toFixed(symbolObj.digits)} H:${hoveredCandle.high.toFixed(symbolObj.digits)} L:${hoveredCandle.low.toFixed(symbolObj.digits)} C:${hoveredCandle.close.toFixed(symbolObj.digits)}`
              : t.marketClosed}
          </span>
        </div>

        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          className="w-full h-full block"
          onMouseMove={(e) => {
            if (!crosshairActive) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const relX = ((e.clientX - rect.left) / rect.width) * width;
            const idx = Math.floor((relX / chartRight) * candles.length);
            if (idx >= 0 && idx < candles.length) setHoverIndex(idx);
          }}
          onMouseLeave={() => setHoverIndex(null)}
        >
          {/* Dashed Grid Lines */}
          {priceSteps.map((p, idx) => {
            const y = yForPrice(p);
            return (
              <g key={idx}>
                <line
                  x1={0}
                  y1={y}
                  x2={chartRight}
                  y2={y}
                  stroke="rgba(255,255,255,0.12)"
                  strokeDasharray="2 4"
                  strokeWidth="1"
                />
                <text
                  x={chartRight + 8}
                  y={y + 4}
                  fill="#98989f"
                  fontSize="12"
                  fontFamily="var(--font-lat)"
                >
                  {p.toFixed(symbolObj.digits)}
                </text>
              </g>
            );
          })}

          {/* Vertical Time Grid */}
          {[8, 24, 40, 56].map((idx) => {
            const c = candles[idx];
            if (!c) return null;
            const x = (idx + 0.5) * (chartRight / candles.length);
            return (
              <g key={idx}>
                <line
                  x1={x}
                  y1={chartTop}
                  x2={x}
                  y2={chartBottom}
                  stroke="rgba(255,255,255,0.1)"
                  strokeDasharray="2 4"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={chartBottom + 22}
                  fill="#98989f"
                  fontSize="11.5"
                  textAnchor="middle"
                  fontFamily="var(--font-lat)"
                >
                  {c.time}
                </text>
              </g>
            );
          })}

          {/* Optional EMA 12 Indicator */}
          {showEma && (
            <polyline
              fill="none"
              stroke="#0a84ff"
              strokeWidth="1.6"
              points={emaPoints}
            />
          )}

          {/* Candlesticks */}
          {candles.map((c, idx) => {
            const slotW = chartRight / candles.length;
            const cx = idx * slotW + slotW * 0.5;
            const bodyW = Math.max(4, slotW * 0.56);
            const isBull = c.close >= c.open;
            const color = isBull ? '#26a69a' : '#ef5350';
            const yHigh = yForPrice(c.high);
            const yLow = yForPrice(c.low);
            const yOpen = yForPrice(c.open);
            const yClose = yForPrice(c.close);
            const top = Math.min(yOpen, yClose);
            const bodyH = Math.max(1.5, Math.abs(yOpen - yClose));

            return (
              <g key={idx}>
                <line
                  x1={cx}
                  y1={yHigh}
                  x2={cx}
                  y2={yLow}
                  stroke={color}
                  strokeWidth="1.25"
                />
                <rect
                  x={cx - bodyW / 2}
                  y={top}
                  width={bodyW}
                  height={bodyH}
                  fill={color}
                />
              </g>
            );
          })}

          {/* Current Price Line & Highlighted Axis Tag */}
          <line
            x1={0}
            y1={currentY}
            x2={chartRight}
            y2={currentY}
            stroke={isBullCurrent ? '#26a69a' : '#8e8e93'}
            strokeDasharray="3 3"
            strokeWidth="1"
          />
          <rect
            x={chartRight + 2}
            y={currentY - 10}
            width={82}
            height={20}
            rx={3}
            fill={isBullCurrent ? '#26a69a' : '#0a84ff'}
          />
          <text
            x={chartRight + 43}
            y={currentY + 4}
            fill="#ffffff"
            fontSize="12"
            fontWeight="700"
            textAnchor="middle"
            fontFamily="var(--font-lat)"
          >
            {currentPrice.toFixed(symbolObj.digits)}
          </text>

          {/* Interactive Crosshair */}
          {crosshairActive && hoverIndex !== null && hoveredCandle && (
            <g>
              <line
                x1={(hoverIndex + 0.5) * (chartRight / candles.length)}
                y1={chartTop}
                x2={(hoverIndex + 0.5) * (chartRight / candles.length)}
                y2={chartBottom}
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="1"
              />
              <line
                x1={0}
                y1={yForPrice(hoveredCandle.close)}
                x2={chartRight}
                y2={yForPrice(hoveredCandle.close)}
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="1"
              />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
