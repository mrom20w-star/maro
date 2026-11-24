export type Mt5Tab = 'quotes' | 'chart' | 'trade' | 'history' | 'settings';
export type Mt5Timeframe = 'M1' | 'M5' | 'M15' | 'M30' | 'H1' | 'H4' | 'D1';

export interface Mt5Symbol {
  symbol: string;
  description: string;
  bid: number;
  ask: number;
  high: number;
  low: number;
  digits: number;
  spread: number;
  changePts: number;
  changePct: number;
  time: string;
  direction: 'up' | 'down' | 'flat';
  contractSize: number;
}

export interface Mt5Position {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  volume: number;
  openPrice: number;
  sl: number | null;
  tp: number | null;
  openTime: string;
}

export interface Mt5HistoryDeal {
  id: string;
  type: 'deal' | 'balance';
  symbol: string;
  side?: 'buy' | 'sell';
  volume?: number;
  openPrice?: number;
  closePrice?: number;
  time: string;
  profit: number;
  swap: number;
  commission: number;
}

export interface Mt5Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export const INITIAL_SYMBOLS: Mt5Symbol[] = [
  {
    symbol: 'AUDCAD',
    description: 'Australian Dollar vs Canadian Dollar',
    bid: 0.94965,
    ask: 0.94969,
    high: 0.9568,
    low: 0.94792,
    digits: 5,
    spread: 4,
    changePts: -486,
    changePct: -0.51,
    time: '23:59:43',
    direction: 'up',
    contractSize: 100000,
  },
  {
    symbol: 'AUDCHF',
    description: 'Australian Dollar vs Swiss Franc',
    bid: 0.55615,
    ask: 0.55617,
    high: 0.56285,
    low: 0.55461,
    digits: 5,
    spread: 2,
    changePts: -583,
    changePct: -1.04,
    time: '23:59:43',
    direction: 'down',
    contractSize: 100000,
  },
  {
    symbol: 'AUDDKK',
    description: 'Australian Dollar vs Danish Krone',
    bid: 4.50653,
    ask: 4.51405,
    high: 4.54297,
    low: 4.50403,
    digits: 5,
    spread: 752,
    changePts: -2812,
    changePct: -0.62,
    time: '21:58:59',
    direction: 'down',
    contractSize: 100000,
  },
  {
    symbol: 'AUDHKD',
    description: 'Australian Dollar vs Hong Kong Dollar',
    bid: 5.35442,
    ask: 5.35479,
    high: 5.37915,
    low: 5.34586,
    digits: 5,
    spread: 37,
    changePts: -1642,
    changePct: -0.31,
    time: '14:48:39',
    direction: 'down',
    contractSize: 100000,
  },
  {
    symbol: 'AUDHUF',
    description: 'Australian Dollar vs Hungarian Forint',
    bid: 8965.94312,
    ask: 8965.94312,
    high: 8965.94312,
    low: 0.00008,
    digits: 5,
    spread: 0,
    changePts: 874519512,
    changePct: 3961.62,
    time: '11:57:01',
    direction: 'flat',
    contractSize: 100000,
  },
  {
    symbol: 'AUDJPY',
    description: 'Australian Dollar vs Japanese Yen',
    bid: 104.885,
    ask: 104.887,
    high: 106.427,
    low: 104.721,
    digits: 3,
    spread: 2,
    changePts: -1417,
    changePct: -1.33,
    time: '23:59:56',
    direction: 'down',
    contractSize: 100000,
  },
  {
    symbol: 'AUDNOK',
    description: 'Australian Dollar vs Norwegian Krone',
    bid: 6.45056,
    ask: 6.45253,
    high: 6.45056,
    low: 6.45056,
    digits: 5,
    spread: 197,
    changePts: 0,
    changePct: 0.0,
    time: '17:25:49',
    direction: 'flat',
    contractSize: 100000,
  },
  {
    symbol: 'AUDNZD',
    description: 'Australian Dollar vs New Zealand Dollar',
    bid: 1.21007,
    ask: 1.21009,
    high: 1.21527,
    low: 1.20868,
    digits: 5,
    spread: 2,
    changePts: -380,
    changePct: -0.31,
    time: '23:59:34',
    direction: 'up',
    contractSize: 100000,
  },
  {
    symbol: 'AUDPLN',
    description: 'Australian Dollar vs Polish Zloty',
    bid: 2.68704,
    ask: 2.69556,
    high: 2.70636,
    low: 2.67891,
    digits: 5,
    spread: 852,
    changePts: -125,
    changePct: -0.05,
    time: '21:58:59',
    direction: 'down',
    contractSize: 100000,
  },
  {
    symbol: 'AUDSEK',
    description: 'Australian Dollar vs Swedish Krona',
    bid: 6.7775,
    ask: 6.78249,
    high: 6.80939,
    low: 6.76619,
    digits: 5,
    spread: 499,
    changePts: -931,
    changePct: -0.14,
    time: '21:58:59',
    direction: 'down',
    contractSize: 100000,
  },
  {
    symbol: 'GOLD',
    description: 'Barrick Gold Corporation (BC), 15 min delayed',
    bid: 36.48,
    ask: 36.50,
    high: 38.70,
    low: 35.06,
    digits: 2,
    spread: 2,
    changePts: -104,
    changePct: -2.8,
    time: '22:00:00',
    direction: 'down',
    contractSize: 100,
  },
  {
    symbol: 'EURUSD',
    description: 'Euro vs US Dollar',
    bid: 1.08421,
    ask: 1.08424,
    high: 1.0879,
    low: 1.08115,
    digits: 5,
    spread: 3,
    changePts: 142,
    changePct: 0.13,
    time: '23:59:58',
    direction: 'up',
    contractSize: 100000,
  },
];

export const INITIAL_HISTORY: Mt5HistoryDeal[] = [
  {
    id: 'bal-1',
    type: 'balance',
    symbol: 'Balance',
    time: '2026.10.26 06:24:54',
    profit: 100000.0,
    swap: 0,
    commission: 0,
  },
  {
    id: 'deal-1',
    type: 'deal',
    symbol: 'AUDCAD',
    side: 'buy',
    volume: 7,
    openPrice: 0.9865,
    closePrice: 0.98655,
    time: '2026.10.29 02:17:37',
    profit: -25.01,
    swap: 0,
    commission: 0,
  },
  {
    id: 'deal-2',
    type: 'deal',
    symbol: 'AUDCAD',
    side: 'buy',
    volume: 7,
    openPrice: 0.98647,
    closePrice: 0.98646,
    time: '2026.10.29 02:20:48',
    profit: 5.0,
    swap: 0,
    commission: 0,
  },
  {
    id: 'deal-3',
    type: 'deal',
    symbol: 'AUDCAD',
    side: 'buy',
    volume: 7,
    openPrice: 0.98665,
    closePrice: 0.98659,
    time: '2026.10.29 02:23:16',
    profit: 30.01,
    swap: 0,
    commission: 0,
  },
  {
    id: 'deal-4',
    type: 'deal',
    symbol: 'AUDCAD',
    side: 'buy',
    volume: 30,
    openPrice: 0.98668,
    closePrice: 0.98682,
    time: '2026.10.29 02:28:21',
    profit: -300.06,
    swap: 0,
    commission: 0,
  },
  {
    id: 'deal-5',
    type: 'deal',
    symbol: 'AUDCAD',
    side: 'buy',
    volume: 30,
    openPrice: 0.98663,
    closePrice: 0.98676,
    time: '2026.10.29 02:30:36',
    profit: -278.61,
    swap: 0,
    commission: 0,
  },
  {
    id: 'deal-6',
    type: 'deal',
    symbol: 'AUDCAD',
    side: 'buy',
    volume: 30,
    openPrice: 0.98659,
    closePrice: 0.98669,
    time: '2026.10.29 02:31:04',
    profit: -214.32,
    swap: 0,
    commission: 0,
  },
  {
    id: 'deal-7',
    type: 'deal',
    symbol: 'AUDCAD',
    side: 'buy',
    volume: 30,
    openPrice: 0.98653,
    closePrice: 0.98656,
    time: '2026.10.29 02:32:03',
    profit: -64.3,
    swap: 0,
    commission: 0,
  },
  {
    id: 'deal-8',
    type: 'deal',
    symbol: 'AUDCAD',
    side: 'buy',
    volume: 30,
    openPrice: 0.9866,
    closePrice: 0.98666,
    time: '2026.10.29 02:32:34',
    profit: -128.59,
    swap: 0,
    commission: 0,
  },
  {
    id: 'deal-9',
    type: 'deal',
    symbol: 'AUDCAD',
    side: 'sell',
    volume: 30,
    openPrice: 0.98668,
    closePrice: 0.98667,
    time: '2026.10.29 02:34:05',
    profit: -21.43,
    swap: 0,
    commission: 0,
  },
  {
    id: 'deal-10',
    type: 'deal',
    symbol: 'AUDCAD',
    side: 'buy',
    volume: 30,
    openPrice: 0.9866,
    closePrice: 0.98673,
    time: '2026.10.29 02:34:16',
    profit: -278.64,
    swap: 0,
    commission: 0,
  },
  {
    id: 'deal-11',
    type: 'deal',
    symbol: 'AUDCAD',
    side: 'buy',
    volume: 30,
    openPrice: 0.9866,
    closePrice: 0.98667,
    time: '2026.10.29 02:34:44',
    profit: -150.04,
    swap: 0,
    commission: 0,
  },
];

// Deterministic realistic candlestick series matching the GOLD H1 & FX screenshots
export function generateCandles(
  symbol: string,
  basePrice: number,
  digits: number,
  timeframe: Mt5Timeframe,
  count = 72
): Mt5Candle[] {
  const tfMultiplier: Record<Mt5Timeframe, number> = {
    M1: 0.15,
    M5: 0.3,
    M15: 0.5,
    M30: 0.75,
    H1: 1,
    H4: 1.8,
    D1: 3.1,
  };
  const scale = tfMultiplier[timeframe];

  // Seed from symbol name
  let seed = 0;
  for (let i = 0; i < symbol.length; i++) {
    seed = (seed * 31 + symbol.charCodeAt(i)) % 99991;
  }
  seed += timeframe.charCodeAt(0) * 17;

  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  // For GOLD, craft the signature swing-down-then-rally-then-pullback shape seen in the photo
  const stepVol =
    symbol === 'GOLD'
      ? 0.28 * scale
      : basePrice * 0.0014 * scale;

  const candles: Mt5Candle[] = [];
  let price =
    symbol === 'GOLD'
      ? 38.25
      : basePrice * (1 + (rand() - 0.5) * 0.012);

  const now = new Date('2026-11-20T22:00:00Z');
  const minsPerBar: Record<Mt5Timeframe, number> = {
    M1: 1,
    M5: 5,
    M15: 15,
    M30: 30,
    H1: 60,
    H4: 240,
    D1: 1440,
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  for (let i = 0; i < count; i++) {
    const t = new Date(now.getTime() - (count - 1 - i) * minsPerBar[timeframe] * 60000);
    const label = `${t.getUTCDate()} ${months[t.getUTCMonth()]} ${String(t.getUTCHours()).padStart(2, '0')}:00`;

    let drift = (rand() - 0.5) * stepVol * 2.2;
    if (symbol === 'GOLD') {
      if (i < 16) drift -= 0.08 * scale;
      else if (i < 38) drift -= 0.09 * scale;
      else if (i < 58) drift += 0.13 * scale;
      else drift -= 0.09 * scale;
    }

    const open = price;
    let close = open + drift;
    if (i === count - 1) {
      close = basePrice;
    }
    const wickUp = rand() * stepVol * 1.1;
    const wickDn = rand() * stepVol * 1.1;
    const high = Math.max(open, close) + wickUp;
    const low = Math.min(open, close) - wickDn;

    candles.push({
      time: label,
      open: Number(open.toFixed(digits)),
      high: Number(high.toFixed(digits)),
      low: Number(low.toFixed(digits)),
      close: Number(close.toFixed(digits)),
    });
    price = close;
  }

  return candles;
}

export const MT5_LABELS = {
  ar: {
    tabs: {
      quotes: 'الأسعار',
      chart: 'رسم بياني',
      trade: 'تداول',
      history: 'التاريخ',
      settings: 'إعدادات',
    },
    quotes: {
      title: 'الأسعار',
      searchPlaceholder: 'بحث عن رمز...',
      done: 'تم',
      marketClosed: 'السوق مغلق',
      actions: {
        trade: 'تداول',
        chart: 'رسم بياني',
        details: 'التفاصيل',
        stats: 'الإحصائيات',
        dom: 'عمق السوق',
        delete: 'حذف',
        cancel: 'إلغاء',
      },
      detailsFields: {
        spread: 'السبريد',
        digits: 'الأرقام العشرية',
        contractSize: 'حجم العقد',
        high: 'أعلى سعر',
        low: 'أدنى سعر',
      },
    },
    order: {
      title: 'تنفيذ السوق',
      marketExecution: 'تنفيذ السوق',
      stopLoss: 'إيقاف الخسارة',
      takeProfit: 'جني الأرباح',
      notSet: 'لم يتم تعيين',
      fillPolicy: 'سياسة التنفيذ',
      fillOrKill: 'كل شيئ أو لا شيئ',
      disclaimer: 'تنبيه: سيتم تنفيذ الصفقة بشروط السوق، وفرق السعر قد يكون كبيرًا!',
      sell: 'Sell by Market',
      buy: 'Buy by Market',
      executed: 'تم تنفيذ الأمر بنجاح',
    },
    trade: {
      balance: 'رصيد الحساب:',
      equity: 'رأس المال المتوفر:',
      freeMargin: 'هامش الحرية:',
      margin: 'الهامش:',
      marginLevel: 'مستوى الهامش:',
      closePosition: 'إغلاق الصفقة',
      noPositions: 'لا توجد صفقات مفتوحة حاليًا',
    },
    history: {
      segments: {
        positions: 'مراكز',
        orders: 'أوامر',
        deals: 'صفقات',
      },
      deposit: 'الإيداع',
      profit: 'الأرباح',
      swap: 'مقايضة',
      commission: 'عمولة',
      balance: 'الرصيد',
    },
    settings: {
      newAccount: 'حساب جديد',
      mailbox: 'صندوق البريد',
      mailboxSub: 'لقد سجلت حسابًا جديدًا — MetaQuotes ...',
      news: 'أخبار السوق',
      tradays: 'Tradays',
      tradaysSub: 'التقويم الاقتصادي',
      chat: 'الدردشة والرسائل',
      chatSub: 'تسجيل الدخول إلى MQL5.community',
      community: 'مجتمع المتداولين',
      algo: 'MQL5 Algo Trading',
      otp: 'OTP',
      otpSub: 'مستخرج كلمة المرور لمرة واحدة',
      interface: 'الواجهة',
      interfaceVal: 'العربية',
      signOut: 'تسجيل الخروج والعودة للموقع',
      demoBadge: 'DEMO',
    },
  },
  en: {
    tabs: {
      quotes: 'Quotes',
      chart: 'Chart',
      trade: 'Trade',
      history: 'History',
      settings: 'Settings',
    },
    quotes: {
      title: 'Quotes',
      searchPlaceholder: 'Search symbol...',
      done: 'Done',
      marketClosed: 'Market closed',
      actions: {
        trade: 'Trade',
        chart: 'Chart',
        details: 'Details',
        stats: 'Statistics',
        dom: 'Depth of Market',
        delete: 'Delete',
        cancel: 'Cancel',
      },
      detailsFields: {
        spread: 'Spread',
        digits: 'Digits',
        contractSize: 'Contract Size',
        high: 'High',
        low: 'Low',
      },
    },
    order: {
      title: 'Market Execution',
      marketExecution: 'Market Execution',
      stopLoss: 'Stop Loss',
      takeProfit: 'Take Profit',
      notSet: 'Not set',
      fillPolicy: 'Fill Policy',
      fillOrKill: 'Fill or Kill',
      disclaimer: 'Warning: Order will be executed at market conditions; spread may be wide!',
      sell: 'Sell by Market',
      buy: 'Buy by Market',
      executed: 'Order executed',
    },
    trade: {
      balance: 'Balance:',
      equity: 'Equity:',
      freeMargin: 'Free Margin:',
      margin: 'Margin:',
      marginLevel: 'Margin Level:',
      closePosition: 'Close Position',
      noPositions: 'No open positions',
    },
    history: {
      segments: {
        positions: 'Positions',
        orders: 'Orders',
        deals: 'Deals',
      },
      deposit: 'Deposit',
      profit: 'Profit',
      swap: 'Swap',
      commission: 'Commission',
      balance: 'Balance',
    },
    settings: {
      newAccount: 'New Account',
      mailbox: 'Mailbox',
      mailboxSub: 'You have registered a new account — MetaQuotes ...',
      news: 'Market News',
      tradays: 'Tradays',
      tradaysSub: 'Economic Calendar',
      chat: 'Chat and Messages',
      chatSub: 'Sign in to MQL5.community',
      community: 'Traders Community',
      algo: 'MQL5 Algo Trading',
      otp: 'OTP',
      otpSub: 'One-Time Password generator',
      interface: 'Interface',
      interfaceVal: 'English',
      signOut: 'Sign Out & Return to Site',
      demoBadge: 'DEMO',
    },
  },
} as const;
