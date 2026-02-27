export const genKey = (...value: (string | number)[]) => {
  return value.join('-');
};
