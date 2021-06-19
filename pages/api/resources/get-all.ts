import type { NextApiRequest, NextApiResponse } from "next";

import fetcher from "~api/fetcher";

export type Reason = {
  content: string;
  resource_id: number;
  timestamp: string;
};

export type Resource = {
  author: string;
  created_at: string;
  extension: string;
  filename: string;
  last_modified: string;
  name: string;
  reason: Reason;
  resource_id: number;
  original_size: number;
  size: number;
  updated_at: number;
  uri: string;
  x: number | null;
  y: number | null;
  z: number | null;
};

export type ResourcesResponse = {
  resources: Resource[];
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResourcesResponse>
): Promise<void> => {
  const resources = await fetcher<Resource[]>("/resource/all");
  res.status(200).json({ resources });
};
