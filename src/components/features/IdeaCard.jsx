import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUp, Users, Clock, Star } from 'lucide-react';
import { Badge } from '../ui';
import { categories, statuses, difficultyLevels } from '../../lib/supabase';

export default function IdeaCard({ idea, index = 0 }) {
  const category = categories.find(c => c.id === idea.category);
  const status = statuses.find(s => s.id === idea.status);
  const difficulty = difficultyLevels.find(d => d.id === idea.difficulty);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link to={`/idea/${idea.id}`}>
        <div className="card group h-full">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <Badge variant={statusColors[idea.status]}>
                {status?.label}
              </Badge>
              <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                <ArrowUp className="w-4 h-4" />
                <span className="text-sm font-medium">{idea.votes}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
              {idea.title}
            </h3>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
              {idea.shortDescription}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="secondary">
                {category?.name}
              </Badge>
              <Badge variant={difficultyColors[idea.difficulty]}>
                {difficulty?.label}
              </Badge>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {idea.requiredSkills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md text-xs text-slate-600 dark:text-slate-300"
                >
                  {skill}
                </span>
              ))}
              {idea.requiredSkills.length > 3 && (
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md text-xs text-slate-600 dark:text-slate-300">
                  +{idea.requiredSkills.length - 3}
                </span>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Users className="w-4 h-4" />
                <span>{idea.teamNeeded} needed</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Clock className="w-4 h-4" />
                <span>{idea.mvpTimeline}</span>
              </div>
            </div>

            {/* Applicants indicator */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex -space-x-2">
                {[...Array(Math.min(3, idea.applicants))].map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs text-white font-medium"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {idea.applicants} applicants
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
