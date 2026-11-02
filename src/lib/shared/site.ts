export const SITE_URL = 'https://santhossunthar.github.io';

export function absoluteUrl(pathname = '/') {
  return new URL(pathname, SITE_URL).toString();
}
