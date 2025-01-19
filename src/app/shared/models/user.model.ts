import { Role } from '../enums/role.enum';

export interface UserModel {
  id: number;
  name: string;
  email: string;
  password: string;
  token: string;
  role: Role;
}
