import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar, Footer } from './components/layout';
import AuthGuard from './components/AuthGuard';
import {
  LandingPage,
  ExplorePage,
  IdeaDetailsPage,
  SubmitIdeaPage,
  DashboardPage,
  ProfilePage,
  BuilderPage,
  CommunityPage,
  NotificationsPage,
  SettingsPage,
  LoginPage,
  SignupPage,
} from './pages';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/idea/:id" element={<IdeaDetailsPage />} />
                <Route path="/builder/:id" element={<BuilderPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/submit" element={<AuthGuard><SubmitIdeaPage /></AuthGuard>} />
                <Route path="/dashboard" element={<AuthGuard><DashboardPage /></AuthGuard>} />
                <Route path="/profile" element={<AuthGuard><ProfilePage /></AuthGuard>} />
                <Route path="/notifications" element={<AuthGuard><NotificationsPage /></AuthGuard>} />
                <Route path="/settings" element={<AuthGuard><SettingsPage /></AuthGuard>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
