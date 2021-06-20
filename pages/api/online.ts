import type { NextApiRequest, NextApiResponse } from "next";

import fetcher from "~api/fetcher";

export type ServerStatus = {
  online: boolean;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    await fetcher("/online");
    res.status(200).json({ online: true });
  } catch (error) {
    res.status(200).json({ online: false });
  }
};
