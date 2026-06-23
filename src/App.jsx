import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar, Footer } from './components/layout';
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
} from './pages';
 import { useEffect } from "react";
import { supabase } from "./supabaseClient";
function App() {

  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase
        .from("ideas")
        .select("*");

      console.log("DATA:", data);
      console.log("ERROR:", error);
    };

    testConnection();
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/idea/:id" element={<IdeaDetailsPage />} />
              <Route path="/submit" element={<SubmitIdeaPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/builder/:id" element={<BuilderPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;