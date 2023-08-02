export const cleanupObject = (object: object) => {
  return Object.entries(object).reduce((acc, [key, value]) => {
    if (value) return { ...acc, [key]: value };
    return { ...acc };
  }, {});
};

export const urlToSearchParams = (url: string, object: object) =>
  `${url}?${new URLSearchParams(cleanupObject(object)).toString()}`;

export const formatNumberToText = (value: number, string: string) => {
  const text = `${value} ${string}`;
  return Number(value) <= 1 ? text : `${text}s`;
};
