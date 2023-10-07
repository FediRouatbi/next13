export function generateRandom4Digits(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}
