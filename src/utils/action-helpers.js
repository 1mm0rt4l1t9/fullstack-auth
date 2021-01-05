export const createAction = (type, payload) => {
  return payload === undefined ? { type } : { type, payload };
};