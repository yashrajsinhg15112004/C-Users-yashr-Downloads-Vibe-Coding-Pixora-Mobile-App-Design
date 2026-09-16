import React from 'react';
import { NavProvider, useNav } from './context';
import { MobileFrame } from './components/Layout';

// Onboarding
import {
  SplashScreen, WelcomeScreen, ChooseRoleScreen, LoginScreen,
  SignUpScreen, ForgotPasswordScreen, OTPScreen, CreateProfileScreen,
} from './screens/Onboarding';

// Client
import {
  ClientHomeScreen, LocationScreen, SearchResultsScreen, FilterScreen,
  ProfessionalProfileScreen, PortfolioGalleryScreen, ServiceDetailsScreen,
  BookingRequestScreen, BookingConfirmationScreen, MyBookingsScreen, BookingDetailsScreen,
} from './screens/Client';

// Chat + Jobs
import {
  MessagesListScreen, ChatScreen, SendProjectScreen,
  PostProjectScreen, MyProjectsScreen, ProjectDetailsScreen,
  ApplicationsScreen, AcceptRejectScreen,
} from './screens/ChatAndJobs';

// Creator
import {
  CreatorHomeScreen, CreatorProfileScreen, EditProfileScreen,
  CreatorPortfolioScreen, AddPortfolioScreen, MyServicesScreen,
  AddServiceScreen, AvailabilityScreen,
} from './screens/Creator';

// Jobs + Network + Shared
import {
  JobsScreen, JobDetailsScreen, ApplyJobScreen, MyApplicationsScreen,
  DiscoverCreatorsScreen, ConnectionsScreen, ActivityFeedScreen,
  NotificationsScreen, ProfileScreen, SettingsScreen,
} from './screens/JobsNetworkShared';

function Router() {
  const { current } = useNav();
  const { screen } = current;

  const screens: Record<string, React.ReactElement> = {
    // Onboarding
    'splash': <SplashScreen />,
    'welcome': <WelcomeScreen />,
    'choose-role': <ChooseRoleScreen />,
    'login': <LoginScreen />,
    'signup': <SignUpScreen />,
    'forgot-password': <ForgotPasswordScreen />,
    'otp': <OTPScreen />,
    'create-profile': <CreateProfileScreen />,

    // Client
    'client-home': <ClientHomeScreen />,
    'location': <LocationScreen />,
    'search': <SearchResultsScreen />,
    'filter': <FilterScreen />,
    'pro-profile': <ProfessionalProfileScreen />,
    'portfolio-gallery': <PortfolioGalleryScreen />,
    'service-details': <ServiceDetailsScreen />,
    'booking-request': <BookingRequestScreen />,
    'booking-confirm': <BookingConfirmationScreen />,
    'my-bookings': <MyBookingsScreen />,
    'booking-details': <BookingDetailsScreen />,

    // Chat + Client Jobs
    'messages': <MessagesListScreen />,
    'chat': <ChatScreen />,
    'send-project': <SendProjectScreen />,
    'post-project': <PostProjectScreen />,
    'my-projects': <MyProjectsScreen />,
    'project-details': <ProjectDetailsScreen />,
    'applications': <ApplicationsScreen />,
    'accept-reject': <AcceptRejectScreen />,

    // Creator
    'creator-home': <CreatorHomeScreen />,
    'creator-profile': <CreatorProfileScreen />,
    'edit-profile': <EditProfileScreen />,
    'creator-portfolio': <CreatorPortfolioScreen />,
    'add-portfolio': <AddPortfolioScreen />,
    'my-services': <MyServicesScreen />,
    'add-service': <AddServiceScreen />,
    'pricing': <MyServicesScreen />,
    'availability': <AvailabilityScreen />,

    // Jobs + Network + Shared
    'jobs': <JobsScreen />,
    'job-details': <JobDetailsScreen />,
    'apply-job': <ApplyJobScreen />,
    'my-applications': <MyApplicationsScreen />,
    'discover': <DiscoverCreatorsScreen />,
    'connections': <ConnectionsScreen />,
    'activity-feed': <ActivityFeedScreen />,
    'notifications': <NotificationsScreen />,
    'profile': <ProfileScreen />,
    'settings': <SettingsScreen />,
  };

  return screens[screen] ?? <SplashScreen />;
}

export default function App() {
  return (
    <NavProvider>
      <MobileFrame>
        <Router />
      </MobileFrame>
    </NavProvider>
  );
}
