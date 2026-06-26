import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Lock,
  Bell,
  Palette,
  Shield,
  Camera,
  Mail,
  Globe,
  Moon,
  Sun,
  Smartphone,
  Eye,
  EyeOff,
  Key,
  Trash2,
} from 'lucide-react';
import { Button, Input, Select } from '../components/ui';
import { useTheme } from '../context/ThemeContext';
import { fetchCurrentUser } from '../lib/supabase';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'account', label: 'Account', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'security', label: 'Security', icon: Shield },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const { darkMode, toggleDarkMode } = useTheme();
  const [user, setUser] = useState(null);

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    website: '',
  });

  useEffect(() => {
    const load = async () => {
      try {
        const userData = await fetchCurrentUser();
        if (userData) {
          setUser(userData);
          setProfile({
            name: userData.name || '',
            email: userData.email || '',
            bio: userData.bio || '',
            location: userData.location || '',
            website: '',
          });
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      }
    };
    load();
  }, []);

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    ideaApproved: true,
    newApplicant: true,
    projectUpdates: true,
    builderInvitations: true,
    weeklyDigest: false,
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your account preferences and settings
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Tabs */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700"
            >
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <div className="p-6 space-y-6">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Profile Settings
                  </h2>

                  {/* Avatar */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-primary-600 transition-colors">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <Button variant="secondary" size="sm">
                        Change Photo
                      </Button>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                        JPG, PNG or GIF. Max 5MB.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      icon={<Mail className="w-4 h-4" />}
                    />
                    <Input
                      label="Location"
                      value={profile.location}
                      onChange={(e) =>
                        setProfile({ ...profile, location: e.target.value })
                      }
                      icon={<Globe className="w-4 h-4" />}
                    />
                    <Input
                      label="Website"
                      value={profile.website}
                      onChange={(e) =>
                        setProfile({ ...profile, website: e.target.value })
                      }
                      placeholder="https://"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) =>
                        setProfile({ ...profile, bio: e.target.value })
                      }
                      rows={4}
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <div className="flex justify-end border-t border-slate-200 dark:border-slate-700 pt-6">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              )}

              {/* Account Settings */}
              {activeTab === 'account' && (
                <div className="p-6 space-y-6">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Account Settings
                  </h2>

                  <div className="space-y-4">
                    <Input
                      label="Email Address"
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                    />
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Changing your email will require verification.
                    </p>
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                    <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-4">
                      Danger Zone
                    </h3>
                    <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-800">
                      <div>
                        <p className="font-medium text-red-800 dark:text-red-200">
                          Delete Account
                        </p>
                        <p className="text-sm text-red-600 dark:text-red-400">
                          This action is irreversible
                        </p>
                      </div>
                      <Button variant="danger" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div className="p-6 space-y-6">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Notification Preferences
                  </h2>

                  <div className="space-y-4">
                    {[
                      { key: 'ideaApproved', label: 'Idea Approved', desc: 'When your idea gets approved' },
                      { key: 'newApplicant', label: 'New Applicant', desc: 'When someone applies to your idea' },
                      { key: 'projectUpdates', label: 'Project Updates', desc: 'Updates on projects you follow' },
                      { key: 'builderInvitations', label: 'Builder Invitations', desc: 'When you receive an invitation' },
                      { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Weekly summary of activity' },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl"
                      >
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {item.label}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {item.desc}
                          </p>
                        </div>
                        <label className="relative flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications[item.key]}
                            onChange={(e) =>
                              setNotifications({
                                ...notifications,
                                [item.key]: e.target.checked,
                              })
                            }
                            className="sr-only"
                          />
                          <div
                            className={`w-11 h-6 rounded-full transition-colors ${
                              notifications[item.key]
                                ? 'bg-primary-500'
                                : 'bg-slate-300 dark:bg-slate-600'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                                notifications[item.key]
                                  ? 'translate-x-5.5 translate-x-5.5'
                                  : 'translate-x-0.5'
                              } mt-0.5 ml-0.5`}
                            />
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end border-t border-slate-200 dark:border-slate-700 pt-6">
                    <Button>Save Preferences</Button>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeTab === 'appearance' && (
                <div className="p-6 space-y-6">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Appearance
                  </h2>

                  <div className="space-y-6">
                    {/* Theme */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
                        Theme
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        <button
                          onClick={() => !darkMode && toggleDarkMode()}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            !darkMode
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          <Sun className="w-6 h-6 mx-auto mb-2 text-slate-600 dark:text-slate-400" />
                          <span className="text-sm font-medium text-slate-900 dark:text-white">
                            Light
                          </span>
                        </button>
                        <button
                          onClick={() => darkMode && toggleDarkMode()}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            darkMode
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          <Moon className="w-6 h-6 mx-auto mb-2 text-slate-600 dark:text-slate-400" />
                          <span className="text-sm font-medium text-slate-900 dark:text-white">
                            Dark
                          </span>
                        </button>
                        <button className="p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700">
                          <Smartphone className="w-6 h-6 mx-auto mb-2 text-slate-600 dark:text-slate-400" />
                          <span className="text-sm font-medium text-slate-900 dark:text-white">
                            System
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="p-6 space-y-6">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Security
                  </h2>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-900 dark:text-white">
                          Password
                        </span>
                        <Button variant="ghost" size="sm">
                          Change
                        </Button>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Last changed 3 months ago
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-900 dark:text-white">
                            Two-Factor Authentication
                          </span>
                          <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded">
                            Enabled
                          </span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Disable
                        </Button>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Added via authenticator app
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-slate-900 dark:text-white">
                            Active Sessions
                          </span>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            3 devices currently logged in
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          Manage
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
