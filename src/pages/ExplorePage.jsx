import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ListFilter as Filter, SlidersHorizontal, Grid2x2 as Grid, List, X } from 'lucide-react';
import { Button, Badge, SearchBar } from '../components/ui';
import { IdeaCard } from '../components/features';
import { ideas, categories, statuses, difficultyLevels } from '../data/ideas';

const sortOptions = [
  { value: 'votes', label: 'Most Voted' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'applicants', label: 'Most Applicants' },
];

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [sortBy, setSortBy] = useState('votes');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredIdeas = useMemo(() => {
    let result = [...ideas];

    // Apply search
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (idea) =>
          idea.title.toLowerCase().includes(searchLower) ||
          idea.shortDescription.toLowerCase().includes(searchLower) ||
          idea.requiredSkills.some((skill) =>
            skill.toLowerCase().includes(searchLower)
          )
      );
    }

    // Apply filters
    if (selectedCategory) {
      result = result.filter((idea) => idea.category === selectedCategory);
    }
    if (selectedStatus) {
      result = result.filter((idea) => idea.status === selectedStatus);
    }
    if (selectedDifficulty) {
      result = result.filter((idea) => idea.difficulty === selectedDifficulty);
    }

    // Apply sorting
    switch (sortBy) {
      case 'votes':
        result.sort((a, b) => b.votes - a.votes);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'applicants':
        result.sort((a, b) => b.applicants - a.applicants);
        break;
    }

    return result;
  }, [search, selectedCategory, selectedStatus, selectedDifficulty, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedStatus('');
    setSelectedDifficulty('');
  };

  const hasActiveFilters = search || selectedCategory || selectedStatus || selectedDifficulty;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              Explore Ideas
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Discover innovative ideas looking for builders like you
            </p>
          </motion.div>

          {/* Search and Controls */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
            <div className="flex-1">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search ideas by title, description, or skills..."
              />
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant={showFilters ? 'primary' : 'secondary'}
                onClick={() => setShowFilters(!showFilters)}
                icon={<Filter className="w-4 h-4" />}
              >
                Filters
                {hasActiveFilters && (
                  <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded text-xs">
                    {[search, selectedCategory, selectedStatus, selectedDifficulty].filter(Boolean).length}
                  </span>
                )}
              </Button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600' : 'text-slate-400'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600' : 'text-slate-400'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() =>
                        setSelectedCategory(selectedCategory === cat.id ? '' : cat.id)
                      }
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {statuses.map((status) => (
                    <button
                      key={status.id}
                      onClick={() =>
                        setSelectedStatus(selectedStatus === status.id ? '' : status.id)
                      }
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        selectedStatus === status.id
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Difficulty
                </label>
                <div className="flex flex-wrap gap-2">
                  {difficultyLevels.map((diff) => (
                    <button
                      key={diff.id}
                      onClick={() =>
                        setSelectedDifficulty(
                          selectedDifficulty === diff.id ? '' : diff.id
                        )
                      }
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        selectedDifficulty === diff.id
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {diff.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  {search && (
                    <Badge variant="secondary" className="gap-1">
                      Search: {search}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => setSearch('')}
                      />
                    </Badge>
                  )}
                  {selectedCategory && (
                    <Badge variant="secondary" className="gap-1">
                      {categories.find((c) => c.id === selectedCategory)?.name}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => setSelectedCategory('')}
                      />
                    </Badge>
                  )}
                  {selectedStatus && (
                    <Badge variant="secondary" className="gap-1">
                      {statuses.find((s) => s.id === selectedStatus)?.label}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => setSelectedStatus('')}
                      />
                    </Badge>
                  )}
                  {selectedDifficulty && (
                    <Badge variant="secondary" className="gap-1">
                      {difficultyLevels.find((d) => d.id === selectedDifficulty)?.label}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => setSelectedDifficulty('')}
                      />
                    </Badge>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-600 dark:text-slate-400">
            Showing{' '}
            <span className="font-semibold text-slate-900 dark:text-white">
              {filteredIdeas.length}
            </span>{' '}
            {filteredIdeas.length === 1 ? 'idea' : 'ideas'}
          </p>
        </div>

        {/* Ideas Grid/List */}
        {filteredIdeas.length > 0 ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            {filteredIdeas.map((idea, index) => (
              <IdeaCard key={idea.id} idea={idea} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No ideas found
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Try adjusting your filters or search terms
            </p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
