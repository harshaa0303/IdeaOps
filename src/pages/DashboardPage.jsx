import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lightbulb, Users, Rocket, Bell, ArrowRight, Clock, CircleCheck as CheckCircle, TrendingUp, Award, Target } from 'lucide-react';
import { Button, Badge } from '../components/ui';
import { ideas, users, notifications } from '../data/ideas';

export default function DashboardPage() {
  const user = users[0]; // Mock current user

  const stats = [
    { label: 'Ideas Submitted', value: user.ideasSubmitted, icon: Lightbulb, color: 'primary' },
    { label: 'Projects Joined', value: user.projectsJoined, icon: Users, color: 'accent' },
    { label: 'MVPs Built', value: user.mvpBuilt, icon: Rocket, color: 'success' },
    { label: 'Reputation', value: user.reputation, icon: Award, color: 'warning' },
  ];

  const projectProgress = [
    { name: 'AI-Powered Meeting Notes', progress: 75, status: 'building', daysLeft: 14 },
    { name: 'Micro-SaaS Billing Dashboard', progress: 40, status: 'building', daysLeft: 28 },
  ];

  const recentActivity = [
    { type: 'idea_approved', message: 'Your idea "Dev Portfolio Generator" was approved', time: '2h ago' },
    { type: 'new_applicant', message: 'Sarah Johnson applied to "Meeting Notes Summarizer"', time: '5h ago' },
    { type: 'project_update', message: 'Milestone completed: Authentication system', time: '1d ago' },
    { type: 'comment', message: 'Mike Torres commented on your idea', time: '2d ago' },
  ];

  const upcomingTasks = [
    { task: 'Review applicant for Health Coach project', due: 'Today', priority: 'high' },
    { task: 'Update API documentation', due: 'Tomorrow', priority: 'medium' },
    { task: 'Team sync meeting', due: 'In 2 days', priority: 'low' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Welcome back, {user.name.split(' ')[0]}!
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Here's what's happening with your projects
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/submit">
              <Button variant="primary">Submit New Idea</Button>
            </Link>
            <Link to="/explore">
              <Button variant="secondary">Explore Ideas</Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    stat.color === 'primary'
                      ? 'bg-primary-100 dark:bg-primary-900/30'
                      : stat.color === 'accent'
                      ? 'bg-accent-100 dark:bg-accent-900/30'
                      : stat.color === 'success'
                      ? 'bg-green-100 dark:bg-green-900/30'
                      : 'bg-amber-100 dark:bg-amber-900/30'
                  }`}
                >
                  <stat.icon
                    className={`w-6 h-6 ${
                      stat.color === 'primary'
                        ? 'text-primary-600'
                        : stat.color === 'accent'
                        ? 'text-accent-600'
                        : stat.color === 'success'
                        ? 'text-green-600'
                        : 'text-amber-600'
                    }`}
                  />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {stat.value.toLocaleString()}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Active Projects
                </h2>
                <Link
                  to="/profile"
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="space-y-6">
                {projectProgress.map((project, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-slate-900 dark:text-white">
                        {project.name}
                      </h3>
                      <Badge variant="primary">Building</Badge>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                      <span>{project.progress}% complete</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {project.daysLeft} days left
                      </span>
                    </div>
                  </div>
                ))}
                {projectProgress.length === 0 && (
                  <div className="text-center py-8">
                    <Rocket className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-500 dark:text-slate-400">
                      No active projects yet
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Upcoming Tasks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Upcoming Tasks
                </h2>
                <Button variant="ghost" size="sm">
                  Add Task
                </Button>
              </div>
              <div className="space-y-4">
                {upcomingTasks.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl"
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${
                        item.priority === 'high'
                          ? 'bg-red-500'
                          : item.priority === 'medium'
                          ? 'bg-amber-500'
                          : 'bg-green-500'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-900 dark:text-white font-medium truncate">
                        {item.task}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Due: {item.due}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Recent Activity
                </h2>
              </div>
              <div className="space-y-4">
                {recentActivity.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                      <Bell className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900 dark:text-white">
                        {item.message}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/notifications">
                <Button variant="ghost" className="w-full mt-4">
                  View All Activity
                </Button>
              </Link>
            </motion.div>

            {/* Startup Readiness */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-6 text-white"
            >
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Startup Readiness</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/80">Technical</span>
                    <span className="text-sm font-semibold">85%</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/80">Business</span>
                    <span className="text-sm font-semibold">70%</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: '70%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/80">Launch Ready</span>
                    <span className="text-sm font-semibold">60%</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
              </div>
              <Button
                variant="secondary"
                className="w-full mt-4 bg-white/20 hover:bg-white/30 border-0 text-white"
              >
                View Details
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
