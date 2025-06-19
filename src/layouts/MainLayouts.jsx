import { Route, Routes, useLocation } from "react-router-dom";
import Sessions from "../pages/Sessions/Sessions";
import AuthCallback from "../components/AuthCallback/AuthCallback";
import SharedRecording from "../pages/SharedRecording/ShareRecording";
import LandingPage from "../pages/Landing/LandingPage";
import { EditorComp } from "../pages/Editor/Editor";
import ProtectedRoutes from "../Routes/ProtectedRoutes";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import FeatureSectionWithVideo from "../NEWTHEME/FeatureSectionWithVideo/FeatureSectionWithVideo";
import LoginModal from "../components/LoginModal/LoginModal";
import Footer from "../pages/Footer/Footer";
import HowItWorks from "../pages/HowItWorks/HowItWorks";
import ValidateRoom from "../components/ValidateRoom/ValidateRoom";
import mixpanel from "../mixpanel";
import { useEffect } from "react";

export const MainLayout = () => {
  const location = useLocation();
  const hideFooter =
  location.pathname.startsWith("/editor/") ||
  location.pathname.startsWith("/signUp") ||
  location.pathname.startsWith("/session"); 
  
  useEffect(()=>{
    mixpanel.track("Page View", {
      path: location.pathname,
      timestamp : new Date().toISOString(),
      page_name: location.pathname
    })
  },[location.pathname])

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/signUp" element={<LoginModal />} />
        <Route path="/working" element={<HowItWorks />} />
        <Route
          path="/editor/:id"
          element={
            <ProtectedRoutes>
              {/* <ValidateRoom/> */}
              <EditorComp />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/sessions"
          element={
            <ProtectedRoutes>
              <Sessions />
            </ProtectedRoutes>
          }
        />

        <Route path="/shared/:token" element={<SharedRecording />} />
        <Route path="/features" element={<FeatureSectionWithVideo />} />
        {/* <Route path="/contact" element={<h1>Contact US</h1>} /> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {/* Conditionally render footer */}
      {!hideFooter && <Footer />}
    </>
  );
};