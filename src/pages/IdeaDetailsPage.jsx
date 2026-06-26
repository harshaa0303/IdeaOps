import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUp, Users, Clock, Share2, Bookmark, MessageCircle, Calendar, Globe, Target, TrendingUp, Award, Zap, Brain, DollarSign, CircleCheck as CheckCircle, User, Send } from 'lucide-react';
import { Button, Badge } from '../components/ui';
import { CommentSection } from '../components/features';
import { fetchIdeaById, fetchUserById, fetchUsers, updateIdeaVotes, categories, statuses, difficultyLevels } from '../lib/supabase';

export default function IdeaDetailsPage() {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [owner, setOwner] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [votes, setVotes] = useState(0);
  const [saved, setSaved] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyRole, setApplyRole] = useState('');
  const [applyMessage, setApplyMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const ideaData = await fetchIdeaById(parseInt(id));
        setIdea(ideaData);
        setVotes(ideaData.votes || 0);

        const [ownerData, usersData] = await Promise.all([
          fetchUserById(ideaData.ownerId),
          fetchUsers(),
        ]);
        setOwner(ownerData);
        setApplicants(usersData.slice(0, 3));
      } catch (err) {
        console.error('Failed to load idea:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Loading idea...</p>
        </div>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Idea not found
          </h1>
          <Link to="/explore">
            <Button>Back to Explore</Button>
          </Link>
        </div>
      </div>
    );
  }

  const category = categories.find((c) => c.id === idea.category);
  const status = statuses.find((s) => s.id === idea.status);
  const difficulty = difficultyLevels.find((d) => d.id === idea.difficulty);

  const statusColors = {
    open: 'info',
    looking: 'warning',
    building: 'primary',
    launched: 'success',
  };

  const difficultyColors = {
    beginner: 'success',
    intermediate: 'warning',
    advanced: 'danger',
  };

  const aiScores = {
    innovation: 85,
    market: 78,
    revenue: 72,
    execution: 90,
  };

  const handleVote = async () => {
    const newVotes = votes + 1;
    setVotes(newVotes);
    try {
      await updateIdeaVotes(idea.id, newVotes);
    } catch (err) {
      console.error('Failed to update votes:', err);
      setVotes(newVotes - 1);
    }
  };
  const handleSave = () => setSaved(!saved);
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explore
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant={statusColors[idea.status]}>{status?.label}</Badge>
                <Badge variant="secondary">{category?.name}</Badge>
                <Badge variant={difficultyColors[idea.difficulty]}>
                  {difficulty?.label}
                </Badge>
              </div>

              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                {idea.title}
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                {idea.shortDescription}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Button onClick={handleVote} variant="primary">
                  <ArrowUp className="w-5 h-5" />
                  Upvote ({votes})
                </Button>
                <Button
                  onClick={() => setShowApplyModal(true)}
                  variant="secondary"
                  icon={<Send className="w-5 h-5" />}
                >
                  Apply to Build
                </Button>
                <Button
                  onClick={handleSave}
                  variant={saved ? 'primary' : 'ghost'}
                  icon={<Bookmark className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />}
                >
                  {saved ? 'Saved' : 'Save'}
                </Button>
                <Button onClick={handleShare} variant="ghost" icon={<Share2 className="w-5 h-5" />}>
                  Share
                </Button>
              </div>
            </div>

            {/* AI Score Widget */}
            <div className="lg:w-80 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl p-6 border border-primary-100 dark:border-primary-800">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <span className="font-semibold text-slate-900 dark:text-white">
                  AI Idea Score
                </span>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Innovation', score: aiScores.innovation, icon: Zap },
                  { label: 'Market Fit', score: aiScores.market, icon: Target },
                  { label: 'Revenue Potential', score: aiScores.revenue, icon: DollarSign },
                  { label: 'Execution Ease', score: aiScores.execution, icon: CheckCircle },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        {item.score}/100
                      </span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-primary-200 dark:border-primary-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Overall Score
                  </span>
                  <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {Math.round(
                      (aiScores.innovation +
                        aiScores.market +
                        aiScores.revenue +
                        aiScores.execution) /
                        4
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Problem Statement */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
            >
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary-500" />
                Problem Statement
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {idea.problemStatement}
              </p>
            </motion.section>

            {/* Proposed Solution */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
            >
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary-500" />
                Proposed Solution
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {idea.solution}
              </p>
            </motion.section>

            {/* Target Audience & Market */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary-500" />
                    Target Audience
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300">
                    {idea.targetAudience}
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary-500" />
                    Market Opportunity
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300">
                    {idea.marketOpportunity}
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Required Skills */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
            >
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary-500" />
                Required Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {idea.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-xl text-primary-700 dark:text-primary-300 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.section>

            {/* Comments Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
            >
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary-500" />
                Discussion ({idea.applicants} applicants)
              </h2>
              <CommentSection ideaId={idea.id} />
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Idea Owner */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
            >
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
                IDEA OWNER
              </h3>
              <Link to={`/builder/${owner?.id}`} className="flex items-center gap-3 group">
                <img
                  src={owner?.avatar}
                  alt={owner?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {owner?.name}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {owner?.role}
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Details Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
            >
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
                DETAILS
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Globe className="w-4 h-4" />
                    Category
                  </span>
                  <Badge variant="secondary">{category?.name}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <CheckCircle className="w-4 h-4" />
                    Status
                  </span>
                  <Badge variant={statusColors[idea.status]}>{status?.label}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Award className="w-4 h-4" />
                    Difficulty
                  </span>
                  <Badge variant={difficultyColors[idea.difficulty]}>
                    {difficulty?.label}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Clock className="w-4 h-4" />
                    MVP Timeline
                  </span>
                  <span className="text-slate-900 dark:text-white font-medium">
                    {idea.mvpTimeline}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Users className="w-4 h-4" />
                    Team Size
                  </span>
                  <span className="text-slate-900 dark:text-white font-medium">
                    {idea.teamNeeded} members
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Calendar className="w-4 h-4" />
                    Posted
                  </span>
                  <span className="text-slate-900 dark:text-white font-medium">
                    {new Date(idea.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Applicants Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
            >
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
                APPLICANTS ({idea.applicants})
              </h3>
              <div className="space-y-3">
                {applicants.slice(0, 3).map((user) => (
                  <Link
                    key={user.id}
                    to={`/builder/${user.id}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {user.role}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4">
                View All Applicants
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-2xl"
          >
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Apply to Join This Project
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  What role are you applying for?
                </label>
                <select
                  value={applyRole}
                  onChange={(e) => setApplyRole(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                >
                  <option value="">Select a role</option>
                  {idea.requiredSkills.map((skill) => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Why do you want to work on this project?
                </label>
                <textarea
                  value={applyMessage}
                  onChange={(e) => setApplyMessage(e.target.value)}
                  rows={4}
                  placeholder="Tell the project owner why you're interested and what you can contribute..."
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl resize-none"
                />
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setShowApplyModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowApplyModal(false)}>
                Submit Application
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
