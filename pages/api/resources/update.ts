import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import { ResourceResponse } from "./get";
import { Resource } from "./get-all";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResourceResponse>
): Promise<void> => {
  const { id, reason } = req.body;
  const resource = (
    await axios.post<Resource>(
      `${process.env.SERVER_URL as string}/resource/update/${id}`,
      {
        reason,
      }
    )
  ).data;
  res.status(200).json({ resource });
};
