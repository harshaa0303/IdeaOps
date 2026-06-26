import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Trophy,
  MessageCircle,
  Calendar,
  Flame,
  Award,
  Users,
  Target,
  Rocket,
} from 'lucide-react';
import { Button, Badge } from '../components/ui';
import { BuilderCard, IdeaCard } from '../components/features';
import { fetchIdeas, fetchUsers } from '../lib/supabase';

const challenges = [
  {
    id: 1,
    title: 'Monthly MVP Challenge',
    description: 'Build a complete MVP in 30 days',
    participants: 156,
    prize: '$500 + Premium Features',
    deadline: '2024-03-31',
    icon: Rocket,
  },
  {
    id: 2,
    title: 'Startup Sprint',
    description: '48 hours to validate an idea and find co-founders',
    participants: 89,
    prize: 'Mentorship + Networking',
    deadline: '2024-03-15',
    icon: Target,
  },
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('trending');
  const [trendingIdeas, setTrendingIdeas] = useState([]);
  const [topBuilders, setTopBuilders] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [ideasData, usersData] = await Promise.all([
          fetchIdeas(),
          fetchUsers(),
        ]);
        setTrendingIdeas(ideasData.slice(0, 5).sort((a, b) => b.votes - a.votes));
        setTopBuilders(usersData.slice(0, 6).sort((a, b) => b.reputation - a.reputation));
      } catch (err) {
        console.error('Failed to load community data:', err);
      }
    };
    load();
  }, []);

  const leaderboard = topBuilders
    .sort((a, b) => b.reputation - a.reputation)
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              Community
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Connect with builders, join challenges, and climb the leaderboard
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <div className="flex overflow-x-auto gap-2 pb-2">
              {['trending', 'discussions', 'challenges'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {tab === 'trending' && <TrendingUp className="w-4 h-4 inline mr-2" />}
                  {tab === 'discussions' && <MessageCircle className="w-4 h-4 inline mr-2" />}
                  {tab === 'challenges' && <Flame className="w-4 h-4 inline mr-2" />}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Trending Ideas */}
            {activeTab === 'trending' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trendingIdeas.map((idea, index) => (
                  <IdeaCard key={idea.id} idea={idea} index={index} />
                ))}
              </div>
            )}

            {/* Discussions */}
            {activeTab === 'discussions' && (
              <div className="space-y-4">
                {[
                  { title: 'Best practices for MVP development', replies: 45, views: 230 },
                  { title: 'How to find the right co-founder?', replies: 32, views: 180 },
                  { title: 'Tech stack recommendations for AI projects', replies: 28, views: 156 },
                  { title: 'Product Hunt launch strategies', replies: 56, views: 340 },
                ].map((discussion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-medium text-slate-900 dark:text-white mb-2">
                      {discussion.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {discussion.replies} replies
                      </span>
                      <span>{discussion.views} views</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Challenges */}
            {activeTab === 'challenges' && (
              <div className="space-y-6">
                {challenges.map((challenge, index) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-6 text-white">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                          <challenge.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{challenge.title}</h3>
                          <p className="text-white/80">{challenge.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-6">
                          <div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-white">
                              {challenge.participants}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              Participants
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                              Prize
                            </div>
                            <div className="text-primary-600 dark:text-primary-400 font-medium">
                              {challenge.prize}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            Ends {new Date(challenge.deadline).toLocaleDateString()}
                          </div>
                          <Button>Join Challenge</Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Leaderboard
                </h2>
              </div>
              <div className="space-y-3">
                {leaderboard.map((user, index) => (
                  <Link
                    key={user.id}
                    to={`/builder/${user.id}`}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      index === 0
                        ? 'bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20'
                        : index === 1
                        ? 'bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-700/30'
                        : index === 2
                        ? 'bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0
                          ? 'bg-amber-400 text-white'
                          : index === 1
                          ? 'bg-slate-400 text-white'
                          : index === 2
                          ? 'bg-orange-400 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {user.mvpBuilt} MVPs
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary-600 dark:text-primary-400">
                        {user.reputation}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">rep</div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Top Builders */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-primary-500" />
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Top Builders
                </h2>
              </div>
              <div className="space-y-4">
                {topBuilders.slice(0, 5).map((builder) => (
                  <Link
                    key={builder.id}
                    to={`/builder/${builder.id}`}
                    className="flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 p-2 rounded-lg transition-colors"
                  >
                    <img
                      src={builder.avatar}
                      alt={builder.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 dark:text-white truncate">
                        {builder.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {builder.role}
                      </p>
                    </div>
                    <Badge
                      variant={builder.availability === 'available' ? 'success' : 'warning'}
                    >
                      {builder.availability === 'available' ? 'Free' : 'Busy'}
                    </Badge>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
