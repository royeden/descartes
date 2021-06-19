// import { google }
// https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430
import axios, { AxiosResponse } from "axios";
import base64url from "base64url";
import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const storage = multer.memoryStorage();
const uploadMiddleware = multer({
  storage,
});

interface NextMulterRequest extends NextApiRequest {
  file: Express.Multer.File;
  body: {
    filename: string;
    lastModified: string;
    mime: string;
    reason: string;
    name: string;
  };
}

const apiRoute = nextConnect({
  onError(error: Error, req: NextApiRequest, res: NextApiResponse) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(uploadMiddleware.single("file"));

type Post = {
  file: Express.Multer.File;
  filename: string;
  mime: string;
  name: string;
  reason: string;
  lastModified: string;
};

async function post({
  file,
  mime,
  name,
  filename,
  reason,
  lastModified,
}: Post): Promise<AxiosResponse<any> & { base64: string; base64url: string }> {
  const response = await axios.post(
    // TODO replace with env url here
    process.env.GOOGLE_APP_URL as string,
    JSON.stringify({
      file: file.buffer.toString("base64"),
      filename,
      lastModified,
      mime,
      name,
      reason,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return {
    ...response,
    base64: file.buffer.toString("base64"),
    base64url: base64url(file.buffer.toString("base64")),
  };
}

apiRoute.post(async (req: NextMulterRequest, res: NextApiResponse) => {
  try {
    const { file } = req;
    const { filename, lastModified, mime, name, reason } = req.body;

    const response = await post({
      file,
      filename,
      lastModified,
      mime,
      name,
      reason,
    });
    // console.log(response.data);
    res.status(200).json({
      filename,
      response: response.data,
    });
  } catch (error) {
    console.log(error.message);

    res.status(400).json({ error });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
