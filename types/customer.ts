import { User } from "@prisma/client";

export interface customerSice {
  customers: User[];
  customerLoading: boolean;
}
