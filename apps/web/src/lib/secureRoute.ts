import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import type { User } from "next-auth";
import { getSession } from "next-auth/react";

declare module "http" {
  interface IncomingMessage {
    user?: User;
  }
}

export type authenticatePageOptions = {
  redirectTo: string;
};

type SecureRoute = (
  handler: NextApiHandler
) => (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export const secureRoute: SecureRoute =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).send("Unauthenticated");
    }

    req.user = session.user as User;
    return handler(req, res);
  };
