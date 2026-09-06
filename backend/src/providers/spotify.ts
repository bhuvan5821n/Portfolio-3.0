import { getEnv } from "../config/env.js";

export interface SpotifyProvider {
  isConfigured(): boolean;
  getArtist(artistId: string): Promise<SpotifyArtist | null>;
  getArtistAlbums(artistId: string): Promise<SpotifyAlbum[] | null>;
}

export type SpotifyArtist = {
  id: string;
  name: string;
  genres: string[];
  images: { url: string; width: number; height: number }[];
  externalUrls: { spotify: string };
  followers: number;
  popularity: number;
};

export type SpotifyAlbum = {
  id: string;
  name: string;
  releaseDate: string;
  totalTracks: number;
  images: { url: string; width: number; height: number }[];
  externalUrls: { spotify: string };
};

const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API = "https://api.spotify.com/v1";
const TIMEOUT_MS = 10000;

export class RealSpotifyProvider implements SpotifyProvider {
  private clientId: string;
  private clientSecret: string;
  private accessToken: string | null = null;
  private tokenExpiresAt = 0;

  constructor() {
    this.clientId = getEnv().SPOTIFY_CLIENT_ID ?? "";
    this.clientSecret = getEnv().SPOTIFY_CLIENT_SECRET ?? "";
  }

  isConfigured(): boolean {
    return !!(this.clientId && this.clientSecret);
  }

  private async getToken(): Promise<string | null> {
    if (this.accessToken && Date.now() < this.tokenExpiresAt) {
      return this.accessToken;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(SPOTIFY_AUTH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64")}`,
        },
        body: "grant_type=client_credentials",
        signal: controller.signal,
      });

      if (!response.ok) return null;

      const data = await response.json() as { access_token: string; expires_in: number };
      this.accessToken = data.access_token;
      this.tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000;
      return this.accessToken;
    } catch {
      return null;
    } finally {
      clearTimeout(timeout);
    }
  }

  private async request<T>(url: string): Promise<T | null> {
    const token = await this.getToken();
    if (!token) return null;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        signal: controller.signal,
      });

      if (!response.ok) return null;
      return await response.json() as T;
    } catch {
      return null;
    } finally {
      clearTimeout(timeout);
    }
  }

  async getArtist(artistId: string): Promise<SpotifyArtist | null> {
    const data = await this.request<any>(`${SPOTIFY_API}/artists/${artistId}`);
    if (!data) return null;

    return {
      id: data.id,
      name: data.name,
      genres: data.genres ?? [],
      images: data.images ?? [],
      externalUrls: data.external_urls ?? { spotify: "" },
      followers: data.followers?.total ?? 0,
      popularity: data.popularity ?? 0,
    };
  }

  async getArtistAlbums(artistId: string): Promise<SpotifyAlbum[] | null> {
    const data = await this.request<any>(`${SPOTIFY_API}/artists/${artistId}/albums?include_groups=album,single&limit=20`);
    if (!data?.items) return null;

    return data.items.map((album: any) => ({
      id: album.id,
      name: album.name,
      releaseDate: album.release_date,
      totalTracks: album.total_tracks,
      images: album.images ?? [],
      externalUrls: album.external_urls ?? { spotify: "" },
    }));
  }
}

let _provider: SpotifyProvider | null = null;

export function getSpotifyProvider(): SpotifyProvider {
  if (_provider) return _provider;

  const env = getEnv();
  if (env.SPOTIFY_CLIENT_ID && env.SPOTIFY_CLIENT_SECRET) {
    _provider = new RealSpotifyProvider();
  } else {
    _provider = {
      isConfigured: () => false,
      getArtist: async () => null,
      getArtistAlbums: async () => null,
    };
  }

  return _provider;
}
