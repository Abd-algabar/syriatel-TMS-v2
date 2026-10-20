import {
  User,Megaphone,CalendarCheck,CalendarOff,Star,Bell,CalendarX,LayoutDashboard
} from 'lucide-react';
 
import ProfilePage from"./pages/profile/ProfilePage";
import AnnouncementPage from "./pages/announcement/AnnouncmentPage";
import TrainingProgram from  "./pages/training_program/TrainingProgram"
import VacationPage from "./pages/vacation/VacationPage";
import EvaluationPage from "./pages/evaluation/EvaluationPage";
import NotificationPage from  "./pages/notification/NotificationPage"
import AbsencePage from "./pages/absence/AbsencePage"
import Dashboard from "./pages/dashboard/DashboardPage";
export const traineeModule = {
  role: 'TRAINEE',
  basePath: '/trainee',
  nav: [
    { path: 'dashboard', icon: LayoutDashboard, labelKey: 'hr:nav.dashboard', Component: Dashboard },
    { path: 'profile', icon: User, labelKey: 'hr:nav.profile', Component: ProfilePage },
    { path: 'training-programs', icon: CalendarCheck, labelKey: 'hr:nav.trainingPrograms', Component: TrainingProgram },
    { path: 'announcements', icon: Megaphone, labelKey: 'hr:nav.announcements', Component: AnnouncementPage },
    { path: 'vacations', icon: CalendarOff, labelKey: 'hr:nav.vacations', Component: VacationPage },
    { path: 'evaluation', icon: Star, labelKey: 'hr:nav.evaluation', Component: EvaluationPage },
    { path: 'absences', icon: CalendarX, labelKey: 'hr:nav.attendance', Component: AbsencePage },
    { path: 'notifications', icon: Bell, labelKey: 'hr:nav.notifications', Component: NotificationPage },
  ],
};