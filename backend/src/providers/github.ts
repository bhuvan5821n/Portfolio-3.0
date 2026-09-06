import { getEnv } from "../config/env.js";

export interface GitHubProvider {
  isConfigured(): boolean;
  getRepository(owner: string, repo: string): Promise<GitHubRepo | null>;
  getReadme(owner: string, repo: string): Promise<string | null>;
}

export type GitHubRepo = {
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  stargazersCount: number;
  forksCount: number;
  openIssuesCount: number;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  topics: string[];
  archived: boolean;
  disabled: boolean;
};

const GITHUB_API = "https://api.github.com";
const TIMEOUT_MS = 10000;

export class RealGitHubProvider implements GitHubProvider {
  private token: string;

  constructor() {
    this.token = getEnv().GITHUB_TOKEN ?? "";
  }

  isConfigured(): boolean {
    return !!this.token;
  }

  private async request<T>(url: string): Promise<T | null> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        return null;
      }

      return await response.json() as T;
    } catch {
      return null;
    } finally {
      clearTimeout(timeout);
    }
  }

  async getRepository(owner: string, repo: string): Promise<GitHubRepo | null> {
    const data = await this.request<any>(`${GITHUB_API}/repos/${owner}/${repo}`);
    if (!data) return null;

    return {
      name: data.name,
      fullName: data.full_name,
      description: data.description,
      htmlUrl: data.html_url,
      homepage: data.homepage,
      language: data.language,
      stargazersCount: data.stargazers_count,
      forksCount: data.forks_count,
      openIssuesCount: data.open_issues_count,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      pushedAt: data.pushed_at,
      topics: data.topics ?? [],
      archived: data.archived,
      disabled: data.disabled,
    };
  }

  async getReadme(owner: string, repo: string): Promise<string | null> {
    const response = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/readme`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: "application/vnd.github.raw",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    if (!response.ok) return null;
    return await response.text();
  }
}

let _provider: GitHubProvider | null = null;

export function getGitHubProvider(): GitHubProvider {
  if (_provider) return _provider;

  const env = getEnv();
  if (env.GITHUB_TOKEN) {
    _provider = new RealGitHubProvider();
  } else {
    _provider = {
      isConfigured: () => false,
      getRepository: async () => null,
      getReadme: async () => null,
    };
  }

  return _provider;
}
