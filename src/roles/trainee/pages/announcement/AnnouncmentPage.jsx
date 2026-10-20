import Card from '../../../../components/ui/Card.jsx';
import Badge from '../../../../components/ui/Badge.jsx';
import { useTranslation } from "react-i18next";
import styles from "./AnnouncementPage.module.css";
export default function AnnouncementPage(){
  const { t } = useTranslation("trainee");
    const announcements=
{
  "announcements": [
    {
      "id": 1,
      "title": "Training Schedule Update",
      "post": "The weekly training schedule has been updated. Please review the new timetable before attending your sessions.",
      "start_date": "2026-10-12",
      "end_date": "2026-10-19",
      "publisher": "HR Training Team"
    },
    {
      "id": 2,
      "title": "Backend Development Workshop",
      "post": "A workshop on Laravel REST API development will be held next week. All backend trainees are encouraged to participate.",
      "start_date": "2026-10-15",
      "end_date": "2026-10-22",
      "publisher": "Ahmed Hassan"
    },
    {
      "id": 3,
      "title": "Task Submission Deadline",
      "post": "All trainees must submit their assigned tasks and supporting evidence before the deadline. Late submissions may affect progress evaluations.",
      "start_date": "2026-10-10",
      "end_date": "2026-10-14",
      "publisher": "HR Training Team"
    },
    {
      "id": 4,
      "title": "Monthly Progress Evaluation",
      "post": "Monthly progress evaluations will begin soon. Ensure that your tasks and daily progress records are up to date.",
      "start_date": "2026-10-20",
      "end_date": "2026-10-27",
      "publisher": "Sara Khaled"
    },
    {
      "id": 5,
      "title": "System Maintenance Notice",
      "post": "The Training Management System will be temporarily unavailable during scheduled maintenance. Please save your work in advance.",
      "start_date": "2026-10-25",
      "end_date": "2026-10-25",
      "publisher": "System Administrator"
    }
  ]
}

    return (
        <>
          <section className={styles.page}>
            <header>
              <span className={styles.count}>
                      {announcements.announcements.length} {t("announcement.announcement")}
              </span>
            </header>
            <div className={styles.list}>
                {announcements['announcements'].map((a) => (
                    <Card key={a.id} className={styles.card}>
                        <div className={styles.top}>
                        <h4>{a.title}</h4>
                          <Badge>{a.publisher}</Badge>
                        </div>
                        <div className={styles.postSection}>
                          <span className={styles.post}>
                              {a.post}
                          </span>
                    </div>
                        
                        
                    </Card>
                ),)}
            </div>
          </section>
        </>);
}