type AuthType = 'JWT' | 'INTERNAL';
type AuthReturn = {
  authType: AuthType;
  payload?: Record<string, string | number>;
};
