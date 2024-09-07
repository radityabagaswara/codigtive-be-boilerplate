interface AuthServiceI {
  login(createAuthDto: CreateAuthDto): any;
  refreshToken(token: string): Promise<any>;
}
