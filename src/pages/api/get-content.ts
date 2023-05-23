import type { NextApiRequest, NextApiResponse } from "next";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import { getContext } from "@/getSummary";

export type Article = NonNullable<
  ReturnType<typeof Readability.prototype.parse>
>;
const parseJsDomDocument = (doc: JSDOM): Article | null => {
  let reader = new Readability(doc.window.document);
  let article = reader.parse();

  return article;
};

const parseJsDomDocumentFromString = (html: string): Article | null => {
  const dom = new JSDOM(html);
  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  return article;
};

const getArticleFromUrl = async (url: string): Promise<Article | null> => {
  let jsdom = await JSDOM.fromURL(url);
  return parseJsDomDocument(jsdom);
};

const getArticleFromString = async (query: string): Promise<Article | null> => {
  console.log("query", query);
  const contextResponse = await getContext(query);
  console.log("contextResponse", contextResponse.context)
  const dom = new JSDOM(contextResponse.context);
  const reader = new Readability(dom.window.document);
  const article = reader.parse();
  //console.log("contextResponse.context", contextResponse.context)
  return article;
};

type Data = {
  article: Article | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = req.query.url as string;

  if (!url) {
    res.status(400).json({ article: null });
    return;
  }

  res.status(200).json({ article: await getArticleFromString(url) });
}
