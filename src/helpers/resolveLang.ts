/**
 * It takes two arguments, one for each language, and returns the argument that matches the current
 * locale
 * @param {string} locale - The locale of the user.
 * @param {any} arArg - The argument to be returned if the locale is 'ar'
 * @param {any} enArg - The English version of the string
 * @returns A function that takes two arguments and returns one of them based on the locale.
 */
export const resolveLang = (
  locale: string,
  arArg: any,
  enArg: any,
  fallback?: boolean
) => {
  const isAr = locale === 'ar';
  if (fallback) {
    if (!enArg) {
      return arArg;
    } else if (!arArg) {
      return enArg;
    }
  }
  return isAr ? arArg : enArg;
};
