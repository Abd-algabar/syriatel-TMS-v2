import Card from "/home/orca/Documents/training/syriatel-TMS/src/components/ui/Card.jsx";
import Badge from "/home/orca/Documents/training/syriatel-TMS/src/components/ui/Badge.jsx";
import Button from "/home/orca/Documents/training/syriatel-TMS/src/components/ui/Button.jsx"
import Modal from "/home/orca/Documents/training/syriatel-TMS/src/components/ui/Modal.jsx"
import styles from "./VacationPage.module.css";
import {Field,Input} from "/home/orca/Documents/training/syriatel-TMS/src/components/ui/Field.jsx"
import { ArrowRight, CalendarDays } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function VacationPage() {
  const vacations = {
  vacationRequests: [
    {
      id: 1,
      traineeId: 101,
      reason: "Family vacation",
      startDate: "2026-10-20",
      endDate: "2026-10-25",
      submissionDate: "2026-10-10",
      state: "pending",
    },
    {
      id: 2,
      traineeId: 102,
      reason: "Medical reasons",
      startDate: "2026-10-15",
      endDate: "2026-10-17",
      submissionDate: "2026-10-05",
      state: "accepted",
    },
    {
      id: 3,
      traineeId: 103,
      reason: "Personal commitments",
      startDate: "2026-10-22",
      endDate: "2026-10-23",
      submissionDate: "2026-10-08",
      state: "rejected",
    },
    {
      id: 4,
      traineeId: 101,
      reason: "Family event",
      startDate: "2026-11-01",
      endDate: "2026-11-03",
      submissionDate: "2026-10-12",
      state: "pending",
    },
    {
      id: 5,
      traineeId: 104,
      reason: "Personal travel",
      startDate: "2026-11-10",
      endDate: "2026-11-15",
      submissionDate: "2026-10-11",
      state: "accepted",
    },
  ],
};
  const getBadgeTone = (state) => {
  switch (state) {
    case "accepted":
      return "green";
    case "pending":
      return "amber";
    case "rejected":
      return "red";
    default:
      return "amber";
  }
};
  const { t } = useTranslation("trainee");
  const[vacationState,setAddVacation]=useState(false)
  const getToday = () => {
  const date = new Date();
  date.setDate(date.getDate()+1)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
  const addVacationFormComponent = 
          <Modal 
          title={t("vacation.vacationRequest")}
          children={
              [<Field key={"reason"} label={t("evaluation.reason")} children={<Input/>}/>,
                <div className={styles['vacationDate']}>
                    <Field key={"startDate"} label={t("vacation.startDate")} children={<Input type={"date"} min={getToday()} />}/>
                    <Field key={"endDate"} label={t("vacation.endDate")} children={<Input type={"date"} min={getToday()} />}/>
                </div>,
                  <br/>,
                  <Button 
                  className={styles.sendRequest}
                  children={t("evaluation.send")}/>
              ]
          }
              onClose={()=>setAddVacation(false)}
          />

  return (
  <>
    <section className={styles.page}>
      <header>
        <span className={styles.count}>
          {vacations.vacationRequests.length} {t("vacation.requests")}
        </span>
      </header>
      <div className={styles.list}>
        {vacations.vacationRequests.map((vacation) => (
          <Card
            key={vacation.id}
            className={`${styles.card} ${styles[vacation.state]}`}
          >
            <div className={styles.cardHeader}>
              <div className={styles.reasonGroup}>
                <h3 className={styles.reason}>
                  {vacation.reason}
                </h3>
              </div>

              <Badge tone={getBadgeTone(vacation.state)}>
                {t(`vacation.${vacation.state}`)}
              </Badge>
            </div>

            <div className={styles.dateSection}>
              <div className={styles.dateBlock}>
                <span className={styles.dateLabel}>
                  {t("vacation.startDate")}
                </span>

                <span className={styles.dateValue}>
                  {vacation.startDate}
                </span>
              </div>

              <div className={styles.arrow}>
                <ArrowRight size={18} strokeWidth={1.8} />
              </div>

              <div className={styles.dateBlock}>
                <span className={styles.dateLabel}>
                  {t("vacation.endDate")}
                </span>

                <span className={styles.dateValue}>
                  {vacation.endDate}
                </span>
              </div>
            </div>
            <div className={styles.footer}>
              <span className={styles.meta}>
                <CalendarDays size={15} />
                {t("vacation.submitted")} {vacation.submissionDate}
              </span>
            </div>
          </Card>
        ))}
        <Button className={styles.addReqeust} children={t("vacation.addRequest")} onClick={()=>setAddVacation(true)}/>
        
      </div>
        {vacationState && addVacationFormComponent}

    </section></>
  );
}