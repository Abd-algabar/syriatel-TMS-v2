import { useTranslation } from 'react-i18next';
import Card from '/home/orca/Documents/training/syriatel-TMS/src/components/ui/Card.jsx';
import Badge from '/home/orca/Documents/training/syriatel-TMS/src/components/ui/Badge.jsx';
import { Clock } from 'lucide-react';
import styles from "./NotificationPage.module.css"
export default function NotificationPage(){
    const notification={
            "notifications": [
                    {
                    "message": "Your task 'Implement Authentication API' has been assigned to you.",
                    "date": "2026-10-12T09:30:00",
                    "notifier": "Ahmed Hassan",
                    "read_status": false
                    },
                    {
                    "message": "Your task submission has been reviewed. Please check the feedback.",
                    "date": "2026-10-11T14:15:00",
                    "notifier": "Sara Khaled",
                    "read_status": true
                    },
                    {
                    "message": "Reminder: Submit your daily progress report before the end of the day.",
                    "date": "2026-10-12T08:00:00",
                    "notifier": "HR Training Team",
                    "read_status": false
                    },
                    {
                    "message": "Your attendance for the training session on October 10 has been recorded.",
                    "date": "2026-10-10T16:00:00",
                    "notifier": "HR Training Team",
                    "read_status": true
                    },
                    {
                    "message": "Your monthly progress evaluation is now available.",
                    "date": "2026-10-09T11:45:00",
                    "notifier": "Sara Khaled",
                    "read_status": false
                    }
            ]
}
    return (
    <> 
        <div className={styles.list}>
                    {notification['notifications'].map((a) => (
                        <Card key={a.id} className={!a.read_status? styles.unread:""}>
                            <div className={styles.top}>
                                <h4>{a.message}</h4>
                                <Badge>{a.notifier}</Badge>
                            </div>
                            <p className={styles.post}>{a.post}</p>
                            <span className={styles.date}><Clock size={14} /> {a.date}</span>
                        </Card>
                    ),)}
                </div>
    </>
    );
}