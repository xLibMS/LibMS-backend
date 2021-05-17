export interface Token {
  token: string;
  expiresIn?: number;
}

export interface JwtTokens {
  accessToken: Token;
  refreshToken: Token;
}
