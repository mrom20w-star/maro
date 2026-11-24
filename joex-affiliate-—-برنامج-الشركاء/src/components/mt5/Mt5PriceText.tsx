interface Mt5PriceTextProps {
  price: number;
  digits: number;
  direction: 'up' | 'down' | 'flat';
  size?: 'md' | 'lg';
}

export function Mt5PriceText({ price, digits, direction, size = 'md' }: Mt5PriceTextProps) {
  const formatted = price.toFixed(digits);
  const color =
    direction === 'up'
      ? '#0a84ff'
      : direction === 'down'
        ? '#ff453a'
        : '#ffffff';

  // Split into prefix, 2 emphasized pip digits, and 1 superscript pipette digit (when digits >= 3)
  let prefix = formatted;
  let mid = '';
  let sup = '';

  if (digits >= 3 && formatted.length >= 4) {
    prefix = formatted.slice(0, -3);
    mid = formatted.slice(-3, -1);
    sup = formatted.slice(-1);
  } else if (digits === 2 && formatted.length >= 3) {
    prefix = formatted.slice(0, -2);
    mid = formatted.slice(-2);
  }

  const baseClass = size === 'lg' ? 'text-[19px]' : 'text-[15px]';
  const midClass = size === 'lg' ? 'text-[27px]' : 'text-[22px]';
  const supClass = size === 'lg' ? 'text-[14px]' : 'text-[12px]';

  return (
    <span
      dir="ltr"
      className="inline-flex items-baseline font-medium leading-none tracking-tight num select-none"
      style={{ color }}
    >
      <span className={baseClass}>{prefix}</span>
      {mid && <span className={`${midClass} font-semibold`}>{mid}</span>}
      {sup && (
        <sup className={`${supClass} font-semibold -top-[0.48em] relative ms-[0.5px]`}>
          {sup}
        </sup>
      )}
    </span>
  );
}
