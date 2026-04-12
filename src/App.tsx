import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

// Layout
import AppLayout from "./components/Navigation/AppLayout";

// Sanctuary + Finder
import HomePage from "./pages/Home/HomePage";
import FinderSanctuary from "./Finder/Sanctuary/FinderSanctuary";
import FinderDashboard from "./Finder/FinderDashboard";
import FinderJourneyMap from "./Finder/Journey/FinderJourneyMap";
import FinderStudio from "./Finder/Tools/Studio/FinderStudio";
import FinderBackPocket from "./Finder/Tools/BackPocket/FinderBackPocket";

// Design Studio + Store
import TarotDesignStudio from "./Luna/DesignStudio/TarotDesignStudio";
import DesignStudio from "./Luna/DesignStudio/DesignStudio";
import AddOnsStore from "./Store/AddOnsStore";
import Marketplace from "./Marketplace/Marketplace";

// NotePad
import NotePadHome from "./pages/NotePad/NotePadHome";
import NotePadEditorPage from "./pages/NotePad/NotePadEditorPage";
import NotePadPageView from "./components/NotePad/NotePadPageView";

// Training
import TrainingHome from "./pages/Training/TrainingHome";
import TrainingSystem from "./pages/Training/TrainingSystem";
import TrainingCardView from "./pages/Training/TrainingCardView";

// Luna Systems
import LunaMenu from "./Luna/LunaMenu";
import LunaRitualMode from "./Luna/RitualMode/LunaRitualMode";
import LunaDreamwork from "./Luna/Dreamwork/LunaDreamwork";
import LunaMentorSystem from "./Luna/Mentor/LunaMentorSystem";
import AskLunaReading from "./Luna/AskLuna/AskLunaReading";
import LunaVoiceSettings from "./Luna/settings/LunaVoiceSettings";

// Shadow + Timeline + Knowledge
import TarotEncyclopedia from "./Encyclopedia/TarotEncyclopedia";
import TarotLibrary from "./Library/TarotLibrary";
import TarotTimeline from "./Timeline/TarotTimeline";

// Profile + Readers
import MemberProfile from "./Profile/MemberProfile";
import ReaderRanking from "./Readers/Ranking/ReaderRanking";
import ReaderProfile from "./Readers/ReaderProfile";

// Courses + Lessons
import CourseOverviewTemplate from "./Courses/CourseOverviewTemplate";
import CourseSyllabusTemplate from "./Courses/CourseSyllabusTemplate";
import LessonList from "./pages/Lessons/LessonList";
import LessonPage from "./pages/Lessons/LessonPage";

// Showcase
import ShowcaseRoomPage from "./pages/ShowcaseRoom/ShowcaseRoomPage";

// Mystery System
import MysteryTeacherPrizeRoom from "./pages/MysteryTeacherPrizeRoom";
import MysteryPrizesWon from "./pages/MysteryPrizesWon";

// Fallback
const NotFound = () => <div style={{ color: "white" }}>Page not found.</div>;

// Placeholders for missing components
const ShadowWorkChamber = () => <div className="p-20 text-white">Shadow Work Chamber (Coming Soon)</div>;

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>

          {/* Home + Sanctuary */}
          <Route path="/" element={<HomePage />} />
          <Route path="/sanctuary" element={<FinderSanctuary />} />
          <Route path="/dashboard" element={<FinderDashboard />} />
          <Route path="/journey" element={<FinderJourneyMap />} />
          <Route path="/studio" element={<FinderStudio />} />
          <Route path="/back-pocket" element={<FinderBackPocket />} />

          {/* Design Studio + Store */}
          <Route path="/design" element={<DesignStudio />} />
          <Route path="/design-studio" element={<TarotDesignStudio />} />
          <Route path="/design-animated" element={<DesignStudio />} />
          <Route path="/store" element={<AddOnsStore />} />
          <Route path="/marketplace" element={<Marketplace />} />

          {/* NotePad */}
          <Route path="/notepad" element={<NotePadHome />} />
          <Route path="/notepad/edit/:id" element={<NotePadEditorPage />} />
          <Route path="/notepad/page/:pageNumber" element={<NotePadPageView />} />

          {/* Training */}
          <Route path="/training" element={<TrainingHome />} />
          <Route path="/training/system" element={<TrainingSystem />} />
          <Route path="/training/card/:id" element={<TrainingCardView />} />

          {/* Luna */}
          <Route path="/luna/rituals" element={<LunaRitualMode />} />
          <Route path="/luna/dreamwork" element={<LunaDreamwork />} />
          <Route path="/luna/mentor" element={<LunaMentorSystem />} />
          <Route path="/luna/ask" element={<AskLunaReading />} />
          <Route path="/luna/voice-settings" element={<LunaVoiceSettings />} />
          <Route path="/luna-personas" element={<LunaVoiceSettings />} />

          {/* Shadow + Timeline + Knowledge */}
          <Route path="/shadow-work" element={<ShadowWorkChamber />} />
          <Route path="/timeline" element={<TarotTimeline />} />
          <Route path="/encyclopedia" element={<TarotEncyclopedia />} />
          <Route path="/library" element={<TarotLibrary />} />

          {/* Profile + Readers */}
          <Route path="/profile" element={<MemberProfile />} />
          <Route path="/readers/ranking" element={<ReaderRanking />} />
          <Route path="/readers/:id" element={<ReaderProfile />} />

          {/* Courses + Lessons */}
          <Route path="/courses" element={<CourseOverviewTemplate />} />
          <Route path="/courses/:id/syllabus" element={<CourseSyllabusTemplate />} />
          <Route path="/lessons" element={<LessonList />} />
          <Route path="/lessons/:id" element={<LessonPage />} />

          {/* Showcase */}
          <Route path="/showcase" element={<ShowcaseRoomPage />} />

          {/* Mystery System */}
          <Route path="/mystery-teacher-prize-room" element={<MysteryTeacherPrizeRoom />} />
          <Route path="/mystery-prizes" element={<MysteryPrizesWon />} />

          {/* Settings */}
          <Route path="/settings" element={<div className="p-20 text-white">Settings (Coming Soon)</div>} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;
