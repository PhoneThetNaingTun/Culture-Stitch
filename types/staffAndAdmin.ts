import { User } from "@prisma/client";

export interface staffAndAdminsSlice {
  staffAndAdmins: User[];
  staffAndAdminLoading: boolean;
}
