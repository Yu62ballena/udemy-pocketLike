"use server";

import { JSDOM } from "jsdom";

export interface ArticleData {
  url: string;
  siteName: string;
  title: string;
  description: string;
  updatedAt: string;
  thumbnail: string;
  content: string;
}

export async function extractUrlData(formData: FormData): Promise<ArticleData> {
  const url = formData.get("url") as string;

  if (!url) {
    throw new Error("URLが指定されていません");
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // メタデータを取得
    const getMetaContent = (property: string): string => {
      const selectors = [
        `meta[property="${property}"]`,
        `meta[name="${property}"]`,
        `meta[property="og:${property}"]`,
        `meta[name="og:${property}"]`,
        `meta[property="twitter:${property}"]`,
        `meta[name="twitter:${property}"]`,
      ];

      for (const selector of selectors) {
        const element = document.querySelector(selector);
        if (element) {
          return element.getAttribute("content") || "";
        }
      }
      return "";
    };

    // 記事本文を取得（一般的なセレクターを試行）
    const getContent = (): string => {
      const contentSelectors = [
        "article",
        ".post-content",
        ".entry-content",
        ".content",
        ".post",
        "main",
        ".article-body",
      ];

      for (const selector of contentSelectors) {
        const element = document.querySelector(selector);
        if (element) {
          // スクリプトタグとスタイルタグを削除
          const scripts = element.querySelectorAll(
            "script, style, nav, header, footer, aside"
          );
          scripts.forEach((el) => el.remove());

          return element.textContent?.trim().slice(0, 1000) || ""; // 最初の1000文字
        }
      }

      // フォールバック: body全体から取得
      const body = document.querySelector("body");
      if (body) {
        const scripts = body.querySelectorAll(
          "script, style, nav, header, footer, aside"
        );
        scripts.forEach((el) => el.remove());
        return body.textContent?.trim().slice(0, 1000) || "";
      }

      return "";
    };

    const articleData: ArticleData = {
      url,
      siteName:
        getMetaContent("site_name") ||
        getMetaContent("og:site_name") ||
        document.querySelector("title")?.textContent?.split(" | ")[1] ||
        new URL(url).hostname,
      title:
        getMetaContent("title") ||
        getMetaContent("og:title") ||
        document.querySelector("h1")?.textContent ||
        document.querySelector("title")?.textContent ||
        "タイトルなし",
      description:
        getMetaContent("description") ||
        getMetaContent("og:description") ||
        getMetaContent("twitter:description") ||
        "",
      updatedAt:
        getMetaContent("article:modified_time") ||
        getMetaContent("article:published_time") ||
        document.querySelector("time")?.getAttribute("datetime") ||
        new Date().toISOString(),
      thumbnail:
        getMetaContent("image") ||
        getMetaContent("og:image") ||
        getMetaContent("twitter:image") ||
        "",
      content: getContent(),
    };

    return articleData;
  } catch (error) {
    console.error("URL解析エラー:", error);
    throw new Error(
      `URL解析に失敗しました: ${
        error instanceof Error ? error.message : "不明なエラー"
      }`
    );
  }
}
