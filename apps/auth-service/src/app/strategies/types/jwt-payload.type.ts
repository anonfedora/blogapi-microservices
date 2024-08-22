import { UserDocument } from 'apps/auth-service/src/users/schemas/user.schema';

export type JwtPayloadType = {
  sub: UserDocument['id'];
  username: UserDocument['username'];
};
