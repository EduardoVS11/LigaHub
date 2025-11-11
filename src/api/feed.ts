import { api } from './http'

export interface FeedAuthor {
  id: string
  username: string
  avatarUrl?: string | null
  role?: string
}

export interface FeedPost {
  id: string
  authorId: string
  author: FeedAuthor
  body: string
  imageBase64?: string | null
  imageMime?: string | null
  imageFilename?: string | null
  createdAt: string
}

export const FeedAPI = {
  list: () => api<FeedPost[]>('/api/feed'),

  /**
   * Create a new feed post. Optionally include imageBase64 (no data URL prefix) and image metadata.
   */
  create: (payload: { body: string; imageBase64?: string | null; imageMime?: string | null; imageFilename?: string | null }) =>
    api<FeedPost>('/api/feed', { method: 'POST', body: JSON.stringify(payload) }),
}

export default FeedAPI
