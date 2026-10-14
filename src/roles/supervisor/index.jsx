import {
  Building2, CalendarCheck, ClipboardList, FileText, GraduationCap,
  LayoutDashboard, ListChecks, Megaphone, UserCog, Users,Star,BookLock 
} from 'lucide-react';
// import AnnouncementsPage from './pages/AnnouncementsPage';
import AssignedRequestsPage from './pages/AssignedRequestsPage';
// import AttendancePage from './pages/AttendancePage';
// import DashboardPage from './pages/DashboardPage';
import InterviewsPage from './pages/InterviewsPage';
import TraineesPage from './pages/TraineesPage';
// import EvaluationsPage from './pages/EvaluationsPage';
import createProgramPage from './pages/createProgramPage';
import ProgramDetails from './pages/ProgramDetails';
import TaskDetailsPage from "./pages/TaskDetailsPage";
/**
 * وحدة دور الموارد البشرية.
 * كل عنصر في nav هو في الوقت نفسه: رابط في القائمة الجانبية + Route في الراوتر.
 */



export const supervisorModule = {
  role: 'SUPERVISOR',
  basePath: '/supervisor',
  nav: [
    // { path: 'dashboard', icon: LayoutDashboard, labelKey: 'hr:nav.dashboard', Component: DashboardPage },
    { path: 'assigned-requests', icon: ListChecks, labelKey: 'hr:nav.assignedRequests', Component: AssignedRequestsPage },
    { path: 'interviews', icon: CalendarCheck, labelKey: 'hr:nav.interviews', Component: InterviewsPage },
    { path: 'trainees', icon: GraduationCap, labelKey: 'hr:nav.trainees', Component: TraineesPage },

    { path: 'programs', icon: ClipboardList, labelKey: 'hr:nav.programs', Component:createProgramPage  },
    // { path: 'announcements', icon: Megaphone, labelKey: 'hr:nav.announcements', Component: AnnouncementsPage },
    // { path: 'evaluations', icon: Star, labelKey: 'hr:nav.evaluations', Component: EvaluationsPage },

  ],

   extraRoutes: [
    {
      path: "program/details/:programId",
      Component: ProgramDetails,
    },
    {
    path: "tasks/details/:taskId",
    Component: TaskDetailsPage,
  },
  ],
};
