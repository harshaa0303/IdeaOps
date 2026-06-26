import { supabase } from '../supabaseClient';

// ============ IDEAS ============

export async function fetchIdeas() {
  const { data, error } = await supabase
    .from('ideas')
    .select('*')
    .order('votes', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function fetchIdeaById(id) {
  const { data, error } = await supabase
    .from('ideas')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function fetchIdeasByOwner(ownerId) {
  const { data, error } = await supabase
    .from('ideas')
    .select('*')
    .eq('ownerId', ownerId)
    .order('createdAt', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function insertIdea(idea) {
  const { data, error } = await supabase
    .from('ideas')
    .insert([idea])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateIdeaVotes(id, votes) {
  const { data, error } = await supabase
    .from('ideas')
    .update({ votes })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ============ USERS ============

export async function fetchUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('reputation', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function fetchUserById(id) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function fetchCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();
  if (error) throw error;
  return data;
}

// ============ NOTIFICATIONS ============

export async function fetchNotifications() {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .order('timestamp', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function markNotificationsRead() {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('read', false);
  if (error) throw error;
}

// ============ COMMENTS ============

export async function fetchCommentsByIdea(ideaId) {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('ideaId', ideaId)
    .order('timestamp', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function insertComment(comment) {
  const { data, error } = await supabase
    .from('comments')
    .insert([comment])
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ============ SUCCESS STORIES ============

export async function fetchSuccessStories() {
  const { data, error } = await supabase
    .from('success_stories')
    .select('*')
    .order('launchedDate', { ascending: false });
  if (error) throw error;
  return data || [];
}

// ============ COMMUNITY STATS ============

export async function fetchCommunityStats() {
  const [ideasResult, usersResult, launchedResult] = await Promise.all([
    supabase.from('ideas').select('id', { count: 'exact', head: true }),
    supabase.from('users').select('id', { count: 'exact', head: true }),
    supabase.from('ideas').select('id', { count: 'exact', head: true }).eq('status', 'launched'),
  ]);

  return {
    ideasSubmitted: ideasResult.count || 0,
    builders: usersResult.count || 0,
    mvpsBuilt: launchedResult.count || 0,
    productsLaunched: launchedResult.count || 0,
  };
}

// ============ STATIC CONFIG DATA ============
// These are UI-level constants that don't need a DB table.
// Keep them here so pages have a single source of truth.

export const categories = [
  { id: 'ai', name: 'AI', icon: 'Brain' },
  { id: 'saas', name: 'SaaS', icon: 'Cloud' },
  { id: 'fintech', name: 'FinTech', icon: 'DollarSign' },
  { id: 'edtech', name: 'EdTech', icon: 'GraduationCap' },
  { id: 'healthtech', name: 'HealthTech', icon: 'Heart' },
  { id: 'mobile', name: 'Mobile Apps', icon: 'Smartphone' },
  { id: 'web', name: 'Web Apps', icon: 'Globe' },
  { id: 'ecommerce', name: 'E-Commerce', icon: 'ShoppingCart' },
];

export const statuses = [
  { id: 'open', label: 'Open', color: 'blue' },
  { id: 'looking', label: 'Looking for Builders', color: 'amber' },
  { id: 'building', label: 'Building', color: 'purple' },
  { id: 'launched', label: 'Launched', color: 'green' },
];

export const difficultyLevels = [
  { id: 'beginner', label: 'Beginner', color: 'green' },
  { id: 'intermediate', label: 'Intermediate', color: 'amber' },
  { id: 'advanced', label: 'Advanced', color: 'red' },
];

export const skills = [
  'React', 'Node.js', 'Python', 'TypeScript', 'Swift', 'Kotlin',
  'Design', 'UI/UX', 'Product Management', 'Marketing', 'Data Science',
  'Machine Learning', 'DevOps', 'Cloud Architecture', 'Mobile Development',
  'Backend', 'Frontend', 'Full Stack', 'AI/ML', 'Blockchain'
];
