import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CircleCheck as CheckCircle, ChevronRight, ChevronLeft, Lightbulb, Target, Users, Clock, Send } from 'lucide-react';
import { Button, Input, Textarea, Select, Badge } from '../components/ui';
import { categories, skills, difficultyLevels, insertIdea, fetchCurrentUser } from '../lib/supabase';

const steps = [
  { id: 1, title: 'Basic Info', icon: Lightbulb, description: 'Tell us about your idea' },
  { id: 2, title: 'Problem & Solution', icon: Target, description: 'Define the problem you\'re solving' },
  { id: 3, title: 'Requirements', icon: Users, description: 'What do you need to build it?' },
  { id: 4, title: 'Review', icon: CheckCircle, description: 'Review and submit' },
];

export default function SubmitIdeaPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    shortDescription: '',
    problemStatement: '',
    solution: '',
    targetAudience: '',
    marketOpportunity: '',
    requiredSkills: [],
    difficulty: '',
    mvpTimeline: '',
    teamNeeded: '',
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      requiredSkills: prev.requiredSkills.includes(skill)
        ? prev.requiredSkills.filter((s) => s !== skill)
        : [...prev.requiredSkills, skill],
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.title && formData.category && formData.shortDescription;
      case 2:
        return formData.problemStatement && formData.solution && formData.targetAudience;
      case 3:
        return formData.requiredSkills.length > 0 && formData.difficulty && formData.mvpTimeline;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNext = async () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        const currentUser = await fetchCurrentUser();
        await insertIdea({
          ...formData,
          teamNeeded: parseInt(formData.teamNeeded) || 0,
          votes: 0,
          status: 'open',
          applicants: 0,
          ownerId: currentUser?.id || null,
          createdAt: new Date().toISOString(),
        });
        setSubmitted(true);
      } catch (err) {
        console.error('Failed to submit idea:', err);
        alert('Failed to submit idea. Please try again.');
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center p-8"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/25">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Idea Submitted Successfully!
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Your idea is now under review. You'll receive a notification once it's approved and visible to the community.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => navigate('/explore')}>
              Explore Ideas
            </Button>
            <Button variant="secondary" onClick={() => navigate('/dashboard')}>
              View Dashboard
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Submit Your Idea
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Share your innovative idea and find builders to bring it to life
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="flex items-center"
                style={{ width: `${100 / steps.length}%` }}
              >
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      currentStep >= step.id
                        ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium hidden sm:block ${
                      currentStep >= step.id
                        ? 'text-slate-900 dark:text-white'
                        : 'text-slate-400'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 rounded transition-all ${
                      currentStep > step.id
                        ? 'bg-gradient-to-r from-primary-500 to-accent-500'
                        : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary-500" />
                  Basic Information
                </h2>
                <div className="space-y-6">
                  <Input
                    label="Idea Title"
                    placeholder="Give your idea a catchy name..."
                    value={formData.title}
                    onChange={(e) => updateFormData('title', e.target.value)}
                  />
                  <Select
                    label="Category"
                    placeholder="Select a category..."
                    value={formData.category}
                    onChange={(e) => updateFormData('category', e.target.value)}
                    options={categories.map((cat) => ({
                      value: cat.id,
                      label: cat.name,
                    }))}
                  />
                  <Textarea
                    label="Short Description"
                    placeholder="Describe your idea in 1-2 sentences..."
                    value={formData.shortDescription}
                    onChange={(e) => updateFormData('shortDescription', e.target.value)}
                    rows={3}
                    helper="This will be shown in the idea cards"
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary-500" />
                  Problem & Solution
                </h2>
                <div className="space-y-6">
                  <Textarea
                    label="Problem Statement"
                    placeholder="What problem does your idea solve? Who faces this problem?"
                    value={formData.problemStatement}
                    onChange={(e) => updateFormData('problemStatement', e.target.value)}
                    rows={4}
                  />
                  <Textarea
                    label="Proposed Solution"
                    placeholder="How does your idea solve this problem? What's the approach?"
                    value={formData.solution}
                    onChange={(e) => updateFormData('solution', e.target.value)}
                    rows={4}
                  />
                  <Textarea
                    label="Target Audience"
                    placeholder="Who are the users that will benefit from this solution?"
                    value={formData.targetAudience}
                    onChange={(e) => updateFormData('targetAudience', e.target.value)}
                    rows={3}
                  />
                  <Textarea
                    label="Market Opportunity (Optional)"
                    placeholder="What's the market size or opportunity for this idea?"
                    value={formData.marketOpportunity}
                    onChange={(e) => updateFormData('marketOpportunity', e.target.value)}
                    rows={3}
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary-500" />
                  Requirements
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                      Required Skills
                    </label>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                      Select the skills needed to build this idea
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                            formData.requiredSkills.includes(skill)
                              ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Select
                    label="Difficulty Level"
                    placeholder="Select difficulty..."
                    value={formData.difficulty}
                    onChange={(e) => updateFormData('difficulty', e.target.value)}
                    options={difficultyLevels.map((diff) => ({
                      value: diff.id,
                      label: diff.label,
                    }))}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      label="MVP Timeline"
                      placeholder="How long to build MVP?"
                      value={formData.mvpTimeline}
                      onChange={(e) => updateFormData('mvpTimeline', e.target.value)}
                      options={[
                        { value: '2-4 weeks', label: '2-4 weeks' },
                        { value: '4-6 weeks', label: '4-6 weeks' },
                        { value: '6-8 weeks', label: '6-8 weeks' },
                        { value: '8-12 weeks', label: '8-12 weeks' },
                        { value: '12-16 weeks', label: '12-16 weeks' },
                        { value: '16+ weeks', label: '16+ weeks' },
                      ]}
                    />
                    <Select
                      label="Team Size Needed"
                      placeholder="How many builders?"
                      value={formData.teamNeeded}
                      onChange={(e) => updateFormData('teamNeeded', e.target.value)}
                      options={[
                        { value: '2', label: '2 members' },
                        { value: '3', label: '3 members' },
                        { value: '4', label: '4 members' },
                        { value: '5', label: '5 members' },
                        { value: '6', label: '6 members' },
                        { value: '7+', label: '7+ members' },
                      ]}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-500" />
                  Review & Submit
                </h2>
                <div className="space-y-6">
                  {/* Idea Summary */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl space-y-4">
                    <div>
                      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Title
                      </span>
                      <p className="text-slate-900 dark:text-white font-medium mt-1">
                        {formData.title}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Category
                      </span>
                      <p className="text-slate-900 dark:text-white mt-1">
                        {categories.find((c) => c.id === formData.category)?.name}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Description
                      </span>
                      <p className="text-slate-900 dark:text-white mt-1">
                        {formData.shortDescription}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Problem
                      </span>
                      <p className="text-slate-900 dark:text-white mt-1 line-clamp-2">
                        {formData.problemStatement}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Solution
                      </span>
                      <p className="text-slate-900 dark:text-white mt-1 line-clamp-2">
                        {formData.solution}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Required Skills
                      </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.requiredSkills.map((skill) => (
                          <Badge key={skill} variant="primary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          Difficulty
                        </span>
                        <p className="text-slate-900 dark:text-white mt-1">
                          {difficultyLevels.find((d) => d.id === formData.difficulty)?.label}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          Timeline
                        </span>
                        <p className="text-slate-900 dark:text-white mt-1">
                          {formData.mvpTimeline}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          Team Size
                        </span>
                        <p className="text-slate-900 dark:text-white mt-1">
                          {formData.teamNeeded} members
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                    By submitting, your idea will be reviewed before becoming visible to the community.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="px-8 py-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 flex justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 1}
              icon={<ChevronLeft className="w-4 h-4" />}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              icon={
                currentStep === 4 ? (
                  <Send className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )
              }
              iconPosition="right"
            >
              {currentStep === 4 ? 'Submit Idea' : 'Continue'}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
