/** Formats a number as an Indian Rupee amount, e.g. 59999 -> "₹59,999". */
export function formatCurrency(amount: number): string {
  const rounded = Math.round(amount);
  const formatted = rounded.toLocaleString('en-IN');
  return `\u20B9${formatted}`;
}
