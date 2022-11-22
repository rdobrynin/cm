export const jwtConstants = {
  secret: `.${process.env.AUTH_PRIVATE_KEY}.` || 'SECRETKEY',
  jwtExpiration: `.${process.env.AUTH_JWT_EXPIRAION}.` || '1h',
};
