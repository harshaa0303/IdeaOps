import { Link } from 'react-router-dom';
import { Lightbulb, GitBranch, Users, Mail } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Features', path: '/features' },
    { label: 'Explore Ideas', path: '/explore' },
    { label: 'Submit Idea', path: '/submit' },
    { label: 'Community', path: '/community' },
    { label: 'Pricing', path: '/pricing' },
  ],
  resources: [
    { label: 'Documentation', path: '/docs' },
    { label: 'API Reference', path: '/api' },
    { label: 'Blog', path: '/blog' },
    { label: 'Success Stories', path: '/stories' },
    { label: 'Help Center', path: '/help' },
  ],
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Careers', path: '/careers' },
    { label: 'Press', path: '/press' },
    { label: 'Contact', path: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Cookie Policy', path: '/cookies' },
  ],
};

const socialLinks = [
  { icon: Users, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: GitBranch, href: 'https://github.com', label: 'GitHub' },
  { icon: Mail, href: 'mailto:hello@ideaops.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">
                Idea<span className="text-primary-400">Ops</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm mb-6 max-w-xs">
              Where Ideas Find Builders. Connect with developers, designers, and builders to bring innovative ideas to life.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-primary-500 hover:text-white transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} IdeaOps. All rights reserved.
            </p>
            <p className="text-slate-400 text-sm">
              Made with love for builders everywhere
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
