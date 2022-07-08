import md5 from 'md5';

export function getGravatarImage(email: string): string {
  const hash = md5(email.toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?s=200`;
}
