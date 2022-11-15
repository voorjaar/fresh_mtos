import { extract } from "$std/encoding/front_matter.ts";

export interface Post {
  slug: string;
  title: string;
  publishedAt: Date;
  content: string;
}

const dirname = new URL(".", import.meta.url).pathname;

export async function loadPost(slug: string): Promise<Post | null> {
  let text: string;
  try {
    text = await Deno.readTextFile(`${dirname}../data/posts/${slug}.md`);
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return null;
    }
    throw err;
  }
  const { attrs, body } = extract(text);
  const params = attrs as Record<string, string>;
  const publishedAt = new Date(params.published_at);
  return {
    slug,
    title: params.title,
    publishedAt,
    content: body,
  };
}

export async function listPosts(): Promise<Post[]> {
  const promises = [];
  console.log(dirname);
  for await (const entry of Deno.readDir(`${dirname}../data/posts`)) {
    const slug = entry.name.replace(".md", "");
    promises.push(loadPost(slug));
  }
  const posts = await Promise.all(promises) as Post[];
  posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return posts;
}
