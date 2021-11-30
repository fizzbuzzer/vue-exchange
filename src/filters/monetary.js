export default function monetary(value) {
  if (value === undefined || Number.isNaN(value) || !Number.isFinite(value)) {
    return '';
  }
  return value.toFixed(2);
}
