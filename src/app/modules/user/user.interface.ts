export enum TRole{
    USER = 'user',
    ADMIN = 'admin'
};
export type TUser = {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  role: TRole;
  isDeleted: boolean;
};
