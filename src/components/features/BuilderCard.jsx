import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Briefcase, CircleCheck as CheckCircle } from 'lucide-react';
import { Badge, Button } from '../ui';

export default function BuilderCard({ builder, index = 0 }) {
  const availabilityColors = {
    available: 'success',
    busy: 'warning',
    unavailable: 'secondary',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="card group h-full">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <img
                src={builder.avatar}
                alt={builder.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-md"
              />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {builder.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {builder.role}
                </p>
              </div>
            </div>
            <Badge variant={availabilityColors[builder.availability]}>
              {builder.availability === 'available' ? 'Available' : 'Busy'}
            </Badge>
          </div>

          {/* Info */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <MapPin className="w-4 h-4" />
              <span>{builder.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{builder.rating} rating</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>{builder.completedProjects} projects completed</span>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {builder.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 bg-primary-50 dark:bg-primary-900/20 rounded-lg text-xs text-primary-700 dark:text-primary-300 font-medium"
              >
                {skill}
              </span>
            ))}
            {builder.skills.length > 4 && (
              <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs text-slate-600 dark:text-slate-300">
                +{builder.skills.length - 4}
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 py-4 border-t border-slate-100 dark:border-slate-700">
            <div className="text-center">
              <div className="text-lg font-bold text-slate-900 dark:text-white">
                {builder.mvpBuilt}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">MVPs</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-slate-900 dark:text-white">
                {builder.ideasSubmitted}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Ideas</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                {builder.reputation}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Rep</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-4">
            <Link to={`/builder/${builder.id}`} className="flex-1">
              <Button variant="secondary" className="w-full">
                View Profile
              </Button>
            </Link>
            <Button variant="primary" className="flex-1">
              Invite
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
