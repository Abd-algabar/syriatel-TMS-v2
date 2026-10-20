import { useTranslation } from "react-i18next";
import { Plus, ClipboardList, ArrowRight, CalendarDays } from "lucide-react";
import styles from "./TrainingProgram.module.css";
import useAssigned from "../../../../hooks/SupervisorHooks/useassigned";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../components/ui/Loading";
import TaskCard from "../../../supervisor/components/TaskCard";
export default function TrainingProgram() {
  const { t } = useTranslation("common");
  
  const { programId } = useParams();
  // const navigate = useNavigate();

  // const handleViewTask = (taskId) => {
  // navigate(`/supervisor/tasks/details/${taskId}`);
  // };
  const { error, loading, loadingAction, getProgram, program } = useAssigned();
  
  const phases = program.phases || [];

  useEffect(() => {
    getProgram(programId);
  }, []);

  return loadingAction ? (
    <Loading />
  ) : (
    <>
      <main className={styles.page} dir="auto">
        <header className={styles.programHeader}>
          <div className={styles.programIcon}>
            <ClipboardList size={28} />
          </div>
          <div className={styles.programInfo}>
            <h1>{program.title || program.name}</h1>
            <p>{program.description}</p>
            {program.deadline && (
              <div className={styles.deadline}>
                <CalendarDays size={16} />
                <span>
                  {t("program.deadline")}: {program.deadline}
                </span>
              </div>
            )}
          </div>
        </header>
        <section className={styles.phases}>
          <div className={styles.sectionHeader}>
            <h2>{t("program.phasesTitle")}</h2>
            <span className={styles.count}>{phases.length}</span>
          </div>
          {phases.length === 0 ? (
            <div className={styles.empty}>{t("program.noPhases")}</div>
          ) : (
            phases.map((phase, index) => (
              <article
                className={styles.phase}
                key={phase._id || phase.id || index}
              >
                <div className={styles.phaseHeader}>
                  <div className={styles.phaseInfo}>
                    <span className={styles.phaseNumber}>{index + 1}</span>
                    <div>
                      <h3>{phase.name}</h3>
                      <p>{phase.description || t("program.noDescription")}</p>
                    </div>
                  </div>
                </div>
                <div className={styles.tasks}>
                  {(phase.tasks || []).length === 0 ? (
                    <p className={styles.noTasks}>{t("task.noTasks")}</p>
                  ) : (
                    phase.tasks.map((task) => (
                      <TaskCard task={task} key={task.id} />
                    ))
                  )}
                </div>
              </article>
            ))
          )}
        </section>
      </main>
    </>
  );
}
