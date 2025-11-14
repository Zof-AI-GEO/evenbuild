import { getAllPosts } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://evenbuild.com";
  const posts = getAllPosts();

  // Build llms.txt content following the spec from https://llmstxt.org/
  const content = `# EvenBuild

> Automate Your Software Testing using ZofAI

## About

EvenBuild is a comprehensive resource for quality assurance and software testing professionals. We provide insights, best practices, and guides on automated testing, QA strategies, and modern testing tools.

## Site

- Home: ${baseUrl}
- Blog: ${baseUrl}/posts

## Blog Posts

We publish articles on:
- Quality Assurance best practices
- Automation testing strategies
- QA tools and workflows
- Common testing pitfalls and solutions
- AI-powered testing with ZofAI

### Recent Posts

${posts
  .slice(0, 10)
  .map((post) => `- [${post.title}](${baseUrl}/posts/${post.slug})`)
  .join("\n")}

### All Posts

${posts
  .map((post) => `- [${post.title}](${baseUrl}/posts/${post.slug})`)
  .join("\n")}

## Contact

For inquiries about EvenBuild or ZofAI, please visit our website.

---

Last updated: ${new Date().toISOString().split("T")[0]}
Total posts: ${posts.length}
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
