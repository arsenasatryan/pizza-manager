export const randomIdGenerator = () => {
  const chars = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];
  return [...Array(10)].map(() => chars[Math.random() * chars.length | 0]).join('');
}
