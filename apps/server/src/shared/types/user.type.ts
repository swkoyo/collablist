import { User } from '@collablist/database';

export type SerializedUser = Omit<User, 'password'>;
