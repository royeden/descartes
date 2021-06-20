import type { NextApiRequest, NextApiResponse } from "next";

import { Resource } from "./get-all";

import fetcher from "~api/fetcher";

export type ResourceResponse = {
  resource: Resource | null;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResourceResponse>
): Promise<void> => {
  const id = req.body.id;
  if (id) {
    const resource = await fetcher<Resource>(`/resource/${id}`);
    res.status(200).json({ resource });
  } else res.status(421).json({ resource: null });
};
