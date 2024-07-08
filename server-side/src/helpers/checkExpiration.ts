export const checkExpiration = (createdAt: number, maxTime: number): boolean => {
  const currentTime: number = new Date().getTime();
  if ((currentTime - createdAt) / 60000 > maxTime) {
    return true;
  }
  return false;
};
