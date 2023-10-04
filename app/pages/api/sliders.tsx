// pages/api/posts.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch data" });
  }
}
