import { authorize, logout, fetchRoles, fetchUsers, register, updateUserRole, removeUser } from './operations';

export const server = { logout, register, authorize, fetchRoles, fetchUsers, updateUserRole, removeUser };
