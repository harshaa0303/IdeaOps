import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Briefcase, Calendar, Award, Users, Rocket, CircleCheck as CheckCircle, MessageCircle, UserPlus, Link as LinkIcon } from 'lucide-react';
import { Button, Badge } from '../components/ui';
import { users, ideas } from '../data/ideas';

export default function BuilderPage() {
  const { id } = useParams();
  const builder = users.find((u) => u.id === parseInt(id));
  const [following, setFollowing] = useState(false);

  if (!builder) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Builder not found
          </h1>
          <Link to="/community">
            <Button>Back to Community</Button>
          </Link>
        </div>
      </div>
    );
  }

  const availabilityColors = {
    available: 'success',
    busy: 'warning',
    unavailable: 'secondary',
  };

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
              src={builder.avatar}
              alt={builder.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-white/20 shadow-xl"
            />
            <div className="text-center md:text-left flex-1">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">
                  {builder.name}
                </h1>
                <Badge variant={availabilityColors[builder.availability]}>
                  {builder.availability === 'available' ? 'Available' : 'Busy'}
                </Badge>
              </div>
              <p className="text-white/90 mb-3">{builder.role}</p>
              <p className="text-white/70 max-w-lg">{builder.bio}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 text-white/80 text-sm">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {builder.location}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {builder.rating} rating
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  {builder.completedProjects} projects
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant={following ? 'primary' : 'secondary'}
                className="bg-white/20 hover:bg-white/30 border-0 text-white"
                onClick={() => setFollowing(!following)}
              >
                <UserPlus className="w-4 h-4" />
                {following ? 'Following' : 'Follow'}
              </Button>
              <Button variant="secondary" className="bg-white text-primary-600 hover:bg-slate-100 border-0">
                <MessageCircle className="w-4 h-4" />
                Message
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
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {builder.mvpBuilt}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                MVPs Built
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {builder.completedProjects}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Projects Completed
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {builder.projectsJoined}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Projects Joined
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {builder.reputation}
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
            >
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Skills & Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {builder.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-xl text-primary-700 dark:text-primary-300 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Portfolio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
            >
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Portfolio Links
              </h2>
              <div className="space-y-3">
                {['GitHub', 'LinkedIn', 'Personal Website'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <LinkIcon className="w-5 h-5 text-slate-400" />
                    <span className="text-slate-900 dark:text-white">{platform}</span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Completed Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
            >
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Completed Projects
              </h2>
              <div className="space-y-4">
                {ideas.slice(0, 4).map((idea) => (
                  <Link
                    key={idea.id}
                    to={`/idea/${idea.id}`}
                    className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-xl flex items-center justify-center">
                      <Rocket className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 dark:text-white truncate">
                        {idea.title}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {idea.category}
                      </p>
                    </div>
                    <Badge variant="success">Completed</Badge>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Invite Modal */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-6 text-white"
            >
              <h3 className="text-lg font-semibold mb-3">Want to collaborate?</h3>
              <p className="text-white/80 mb-4 text-sm">
                Invite {builder.name.split(' ')[0]} to join your project.
              </p>
              <Button className="w-full bg-white text-primary-600 hover:bg-slate-100">
                Invite to Project
              </Button>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
            >
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
                AVAILABILITY
              </h3>
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    builder.availability === 'available' ? 'bg-green-500' : 'bg-amber-500'
                  }`}
                />
                <span className="text-slate-900 dark:text-white font-medium">
                  {builder.availability === 'available'
                    ? 'Available for new projects'
                    : 'Currently busy'}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
