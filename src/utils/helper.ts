export const convertNumber = (value: string) => {
  return Number(value.replaceAll(',', ''));
};
