import type { NextApiRequest, NextApiResponse } from "next";

import { Resource, ResourcesResponse } from "./get-all";

import fetcher from "~api/fetcher";

export type LimitedResourcesResponse = {
  choose: number;
  resources: Resource[];
  limit: number;
  total: number;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResourcesResponse>
): Promise<void> => {
  const response = await fetcher<ResourcesResponse>("/resource/limited");
  res.status(200).json({ ...response });
};
