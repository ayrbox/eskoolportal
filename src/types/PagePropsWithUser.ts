import type { User } from "next-auth";

export interface PagePropsWithUser {
  user: User;
}
