import { Country } from '../types';

export const generateWhatsAppUrl = (
  phoneNumber: string,
  selectedCountry: Country,
  message: string = '',
  useWeb: boolean = false
) => {
  const cleanDialCode = selectedCountry.dialCode.replace('+', '');
  const fullPhoneNumber = `${cleanDialCode}${phoneNumber.trim()}`;
  
  if (useWeb) {
    return `https://web.whatsapp.com/send?phone=${fullPhoneNumber}${
      message ? `&text=${encodeURIComponent(message)}` : ''
    }`;
  }

  const baseUrl = `https://wa.me/${fullPhoneNumber}`;
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
};

export const validatePhoneNumber = (number: string): boolean => {
  return /^\d+$/.test(number);
};