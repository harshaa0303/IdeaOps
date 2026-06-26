import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Star, Briefcase, Calendar, FileText, FolderOpen, Bookmark, Activity, Award, Users, Rocket, Settings, CreditCard as Edit2 } from 'lucide-react';
import { Button, Badge } from '../components/ui';
import { IdeaCard } from '../components/features';
import { fetchCurrentUser, fetchIdeas, fetchIdeasByOwner } from '../lib/supabase';

const tabs = [
  { id: 'ideas', label: 'My Ideas', icon: Lightbulb },
  { id: 'projects', label: 'My Projects', icon: FolderOpen },
  { id: 'saved', label: 'Saved Ideas', icon: Bookmark },
  { id: 'activity', label: 'Activity', icon: Activity },
];

import { Lightbulb } from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('ideas');
  const [user, setUser] = useState(null);
  const [userIdeas, setUserIdeas] = useState([]);
  const [allIdeas, setAllIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const userData = await fetchCurrentUser();
        setUser(userData);

        if (userData) {
          const [ownedIdeas, ideasData] = await Promise.all([
            fetchIdeasByOwner(userData.id),
            fetchIdeas(),
          ]);
          setUserIdeas(ownedIdeas);
          setAllIdeas(ideasData);
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Please sign in</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-primary-600 to-accent-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center gap-6"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-white/20 shadow-xl"
            />
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">
                {user.name}
              </h1>
              <p className="text-white/90 mb-3">{user.role}</p>
              <p className="text-white/70 max-w-lg">{user.bio}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 text-white/80 text-sm">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {user.location}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {user.rating} rating
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined Jan 2024
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Link to="/settings">
                <Button variant="secondary" className="bg-white/20 hover:bg-white/30 border-0 text-white">
                  <Settings className="w-4 h-4" />
                  Settings
                </Button>
              </Link>
              <Button variant="secondary" className="bg-white text-primary-600 hover:bg-slate-100 border-0">
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg p-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 text-primary-500 mb-2">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {user.ideasSubmitted}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Ideas Submitted
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 text-accent-500 mb-2">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {user.projectsJoined}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Projects Joined
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 text-green-500 mb-2">
                <Rocket className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {user.mvpBuilt}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                MVPs Built
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 text-amber-500 mb-2">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {user.reputation}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Reputation Score
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'ideas' && userIdeas.map((idea, index) => (
            <IdeaCard key={idea.id} idea={idea} index={index} />
          ))}
          {activeTab === 'projects' && allIdeas.slice(0, 6).map((idea, index) => (
            <IdeaCard key={idea.id} idea={idea} index={index} />
          ))}
          {activeTab === 'saved' && allIdeas.slice(6, 12).map((idea, index) => (
            <IdeaCard key={idea.id} idea={idea} index={index} />
          ))}
          {activeTab === 'activity' && (
            <div className="col-span-full text-center py-12">
              <Activity className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500 dark:text-slate-400">Activity history coming soon</p>
            </div>
          )}
        </div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Skills & Expertise
          </h2>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-xl text-primary-700 dark:text-primary-300 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
