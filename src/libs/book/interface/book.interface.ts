export interface IUser {
  _id: string;
  username: string;
  password: string;
  displayName: string;
  email?: string;
}

export interface IUserRequest extends Request {
  user: IUser;
  session: {
    returnTo?: string;
  };
  logout: () => void;
}
