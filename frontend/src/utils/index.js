import { formatRelative } from 'date-fns';
import { enUS, vi } from 'date-fns/locale';

export const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 2
});

export const formatDate = (dateString, locale) => {
  return formatRelative(new Date(dateString), new Date(), {
    locale: locale === 'vi' ? vi : enUS
  });
};
