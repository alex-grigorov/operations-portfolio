/** Opens Telegram chat with the user (app or t.me web). */
export function telegramChatUrl(handle: string): string | null {
  const user = handle.replace(/^@/, "").trim();
  if (!user) return null;
  return `https://t.me/${encodeURIComponent(user)}`;
}

export function telegramDisplayHandle(handle: string): string {
  const user = handle.replace(/^@/, "").trim();
  return user ? `@${user}` : "";
}
