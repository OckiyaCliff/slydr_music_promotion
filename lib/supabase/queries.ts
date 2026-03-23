import { supabase } from './client'
import type { Package, Campaign, User } from '@/lib/types/database'

// Package queries
export async function getPackages() {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data as Package[]
}

export async function getPackageById(id: string) {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(error.message)
  return data as Package
}

// Admin package queries
export async function getAllPackages() {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data as Package[]
}

export async function createPackage(pkg: Omit<Package, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('packages')
    .insert([pkg])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as Package
}

export async function updatePackage(id: string, updates: Partial<Package>) {
  const { data, error } = await supabase
    .from('packages')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as Package
}

export async function deletePackage(id: string) {
  const { error } = await supabase
    .from('packages')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
}

// Campaign queries
export async function getCampaignsByArtist(artistId: string) {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*, packages(*)')
    .eq('artist_id', artistId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data as any[]
}

export async function getCampaignById(id: string) {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*, packages(*), users(*)')
    .eq('id', id)
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function createCampaign(campaign: Omit<Campaign, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('campaigns')
    .insert([campaign])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as Campaign
}

// User queries
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw new Error(error.message)
  return data as User
}

export async function updateUserProfile(userId: string, updates: Partial<User>) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as User
}
