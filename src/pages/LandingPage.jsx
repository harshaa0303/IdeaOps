import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, Users, Rocket, CircleCheck as CheckCircle, ArrowRight, Star, Trophy, Zap, Target, Clock, Heart, Code, Palette, TrendingUp, Brain, Cloud, DollarSign, GraduationCap, Smartphone, Globe, ShoppingCart } from 'lucide-react';
import { Button } from '../components/ui';
import { IdeaCard, StatsCard, BuilderCard } from '../components/features';
import { fetchIdeas, fetchUsers, fetchSuccessStories, fetchCommunityStats } from '../lib/supabase';

const steps = [
  {
    number: '01',
    title: 'Submit Idea',
    description: 'Share your innovative idea with details about the problem, solution, and target audience.',
    icon: Lightbulb,
  },
  {
    number: '02',
    title: 'Get Validated',
    description: 'Community votes and AI scoring help validate your idea\'s potential.',
    icon: Target,
  },
  {
    number: '03',
    title: 'Find Builders',
    description: 'Connect with developers, designers, and marketers who share your vision.',
    icon: Users,
  },
  {
    number: '04',
    title: 'Build MVP',
    description: 'Collaborate with your team to create a minimum viable product.',
    icon: Code,
  },
  {
    number: '05',
    title: 'Launch Product',
    description: 'Ship your product and get feedback from early adopters.',
    icon: Rocket,
  },
];

const benefits = [
  {
    title: 'Find Your Perfect Match',
    description: 'Connect with builders who have the exact skills your idea needs.',
    icon: Target,
  },
  {
    title: 'Validate Before Building',
    description: 'Get feedback and votes from the community before investing time.',
    icon: CheckCircle,
  },
  {
    title: 'Build Your Reputation',
    description: 'Earn reputation points by contributing to successful projects.',
    icon: Trophy,
  },
  {
    title: 'Learn and Grow',
    description: 'Gain experience by working on diverse projects with talented people.',
    icon: GraduationCap,
  },
];

const categoryIcons = {
  ai: Brain,
  saas: Cloud,
  fintech: DollarSign,
  edtech: GraduationCap,
  healthtech: Heart,
  mobile: Smartphone,
  web: Globe,
  ecommerce: ShoppingCart,
};

export default function LandingPage() {
  const [ideas, setIdeas] = useState([]);
  const [communityStats, setCommunityStats] = useState({ ideasSubmitted: 0, builders: 0, mvpsBuilt: 0, productsLaunched: 0 });
  const [successStories, setSuccessStories] = useState([]);
  const [topBuilders, setTopBuilders] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [ideasData, usersData, storiesData, statsData] = await Promise.all([
          fetchIdeas(),
          fetchUsers(),
          fetchSuccessStories(),
          fetchCommunityStats(),
        ]);
        setIdeas(ideasData);
        setTopBuilders(usersData.slice(0, 6).sort((a, b) => b.reputation - a.reputation));
        setSuccessStories(storiesData);
        setCommunityStats(statsData);
      } catch (err) {
        console.error('Failed to load landing page data:', err);
      }
    };
    load();
  }, []);

  const featuredIdeas = ideas.slice(0, 6);

  const stats = [
    { value: communityStats.ideasSubmitted, label: 'Ideas Submitted', icon: Lightbulb },
    { value: communityStats.builders, label: 'Builders', icon: Users },
    { value: communityStats.mvpsBuilt, label: 'MVPs Built', icon: Code },
    { value: communityStats.productsLaunched, label: 'Products Launched', icon: Rocket },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-400/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-300/10 to-accent-300/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium mb-8">
              <Zap className="w-4 h-4" />
              Where Ideas Find Builders
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Turn Ideas Into
              <br />
              <span className="bg-gradient-to-r from-primary-600 via-accent-500 to-primary-500 bg-clip-text text-transparent">
                Real Products
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10">
              Connect with developers, designers, and builders to bring innovative ideas to life. From concept to launch, together.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/submit">
                <Button size="lg" className="group">
                  Submit Idea
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button variant="secondary" size="lg">
                  Explore Ideas
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-900 to-transparent z-10" />
            <div className="grid grid-cols-3 gap-4 opacity-60">
              {featuredIdeas.slice(0, 3).map((idea, i) => (
                <motion.div
                  key={idea.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg"
                >
                  <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {idea.title}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {idea.category}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              From idea to product in five simple steps. We make it easy to connect with the right people.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-primary-400 to-accent-400 dark:from-primary-800 dark:via-primary-600 dark:to-accent-600" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="relative z-10">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mb-4 mx-auto lg:mx-0 shadow-lg shadow-primary-500/25">
                        <step.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-xs font-bold text-primary-600 dark:text-primary-400 mb-2">
                        STEP {step.number}
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Community Stats
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Our growing community of ideas and builders
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/20"
              >
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-sm text-white/80 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Ideas Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                Featured Ideas
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Discover innovative ideas looking for builders like you
              </p>
            </div>
            <Link to="/explore">
              <Button variant="secondary" className="group">
                View All Ideas
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredIdeas.map((idea, index) => (
              <IdeaCard key={idea.id} idea={idea} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why IdeaOps?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              The platform built for builders, by builders
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Builders Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                Top Builders
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Meet our most active community contributors
              </p>
            </div>
            <Link to="/community">
              <Button variant="secondary" className="group">
                View All
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topBuilders.slice(0, 3).map((builder, index) => (
              <BuilderCard key={builder.id} builder={builder} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Real products built on IdeaOps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
              >
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <span className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                      Launched {new Date(story.launchedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    {story.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {story.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Built by:</span>
                    {story.founders.map((founder, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 rounded-md text-sm text-primary-700 dark:text-primary-300"
                      >
                        {founder}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-500 to-accent-600 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join thousands of innovators and builders turning ideas into reality.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/submit">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-slate-100"
                >
                  Submit Your Idea
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Explore Ideas
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
