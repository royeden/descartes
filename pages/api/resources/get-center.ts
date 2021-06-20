import type { NextApiRequest, NextApiResponse } from "next";

import fetcher from "~api/fetcher";

export type Center = [number, number, number];

export type CenterResponse = {
  center: Center;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<CenterResponse>
): Promise<void> => {
  const center = await fetcher<CenterResponse>("/resource/get-center");
  res.status(200).json(center);
};
