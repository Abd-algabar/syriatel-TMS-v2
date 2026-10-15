import {UserRoundX} from "lucide-react";
import Card from '/home/orca/Documents/training/syriatel-TMS/src/components/ui/Card.jsx';
import Badge from '/home/orca/Documents/training/syriatel-TMS/src/components/ui/Badge.jsx';
import styles from "./AbsencePage.module.css";
export default function AbsencePage(){
    const absences={
  "absences": [
    {
      "id": 1,
      "date": "2026-10-02",
      "reason": "Medical appointment"
    },
    {
      "id": 2,
      "date": "2026-10-05",
      "reason": "Personal emergency"
    },
    {
      "id": 3,
      "date": "2026-10-08",
      "reason": "Transportation issues"
    },
    {
      "id": 4,
      "date": "2026-10-12",
      "reason": "Family emergency"
    }
  ]
}
    return ( <> 
        <div className={styles.list}>
                    {absences['absences'].map((a) => (
                        <Card key={a.id} className={styles.card}>
                            <div className={styles.top}>
                                <h4>{a.reason}</h4>
                                <Badge>{a.date}</Badge>
                            </div>
                            <p className={styles.post}>{a.post}</p>
                            <UserRoundX />
                        </Card>
                    ),)}
                </div>
    </>);
}