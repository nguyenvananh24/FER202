/**
 * Format số tiền sang định dạng VND
 * Ví dụ: 2720000 → "2.720.000 ₫"
 */
export const formatCurrency = (amount) => {
  return Number(amount).toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
};

/**
 * Format ngày từ YYYY-MM-DD sang DD-MM-YYYY
 * Ví dụ: "2025-03-15" → "15-03-2025"
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}-${month}-${year}`;
};
