export type UserRole = 'artist' | 'admin' | 'superadmin'

export interface User {
  id: string
  email: string
  full_name: string | null
  username: string | null
  avatar_url: string | null
  role: UserRole
  bio: string | null
  website: string | null
  social_links: Record<string, string> | null
  created_at: string
  updated_at: string
}

export interface Package {
  id: string
  name: string
  description: string | null
  price: number
  category: string
  features: string[]
  turnaround_days: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Campaign {
  id: string
  artist_id: string
  package_id: string
  title: string
  description: string | null
  release_date: string | null
  status: string
  progress_percentage: number
  created_at: string
  updated_at: string
}

export interface CampaignTask {
  id: string
  campaign_id: string
  assigned_to: string | null
  title: string
  description: string | null
  status: string
  due_date: string | null
  created_at: string
  updated_at: string
}

export interface CampaignUpdate {
  id: string
  campaign_id: string
  author_id: string
  content: string
  update_type: string
  created_at: string
}

export interface File {
  id: string
  campaign_id: string
  uploaded_by: string
  file_name: string
  file_url: string
  file_type: string | null
  file_size: number | null
  file_category: string
  created_at: string
}

export interface Message {
  id: string
  campaign_id: string
  sender_id: string
  content: string
  created_at: string
}
