interface UserServiceI {
  createUser(user: UserI): Promise<string>;
}
