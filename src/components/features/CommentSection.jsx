import { motion } from 'framer-motion';
import { Send, Heart, MoveHorizontal as MoreHorizontal, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '../ui';
import { fetchCommentsByIdea, insertComment } from '../../lib/supabase';

export default function CommentSection({ ideaId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCommentsByIdea(ideaId);
        setComments(data);
      } catch (err) {
        console.error('Failed to load comments:', err);
      }
    };
    load();
  }, [ideaId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentData = {
      ideaId,
      userId: 999,
      userName: 'You',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0,
    };

    try {
      const inserted = await insertComment(commentData);
      setComments([inserted, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error('Failed to post comment:', err);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="flex-1 flex gap-3">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
          <Button type="submit" disabled={!newComment.trim()}>
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-3"
          >
            <img
              src={comment.userAvatar}
              alt={comment.userName}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-900 dark:text-white">
                    {comment.userName}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {formatTime(comment.timestamp)}
                  </span>
                </div>
                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                {comment.content}
              </p>
              <div className="flex items-center gap-4 mt-3">
                <button className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>{comment.likes}</span>
                </button>
                <button className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Reply
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
