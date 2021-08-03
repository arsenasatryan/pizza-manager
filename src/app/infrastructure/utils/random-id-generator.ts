export const randomIdGenerator = () => {
  const chars = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];
  return [...Array(10)].map(i => chars[Math.random() * chars.length | 0]).join('');
}
