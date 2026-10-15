import PieChart from "/home/orca/Documents/training/syriatel-TMS/src/components/ui/PieChart.jsx"
import ProgressBar from "/home/orca/Documents/training/syriatel-TMS/src/components/ui/PorgressBar.jsx"
import BlocArea from "/home/orca/Documents/training/syriatel-TMS/src/components/ui/Bloc_Area.jsx"
import Button from "/home/orca/Documents/training/syriatel-TMS/src/components/ui/Button.jsx"
import Modal from "/home/orca/Documents/training/syriatel-TMS/src/components/ui/Modal.jsx"
import {Field,Input} from "/home/orca/Documents/training/syriatel-TMS/src/components/ui/Field.jsx"
import styles from "./EvaluationPage.module.css";
import { useTranslation } from 'react-i18next';
import { useState } from "react"
export default function EvaluationPage(){
    const {t}=useTranslation('trainee')
    const [reEvaluationForm,setRevaluationForm]=useState(false);
    const reEvaluationFormComponent = 
        <Modal 
        key={"reEvaluationFormComponent"}
        title={t("evaluation.reEvaluationRequest")}
        children={
            [<Field key={"reason"} label={t("evaluation.reason")} 
                children={<Input key={"reaseon-field"}/>}/>,
            <br/>,
            <Button key={"evaluationSend"} children={t("evaluation.send")}/>
            ]
        
        }
            onClose={()=>setRevaluationForm(false)}
        />
    
    return (
  <div className={styles.evaluation}>
    <section className={styles.finalEvaluation}>
      <div className={styles.blocArea}>
        <BlocArea
          title={t("evaluation.generalEvaluation")}
          children={[
            <div className={styles.scoreSection} key="score">
              <div className={styles.scoreHeader}>
                <strong>23.5%</strong>
              </div>
              <ProgressBar value={23.5} />
            </div>,
            <p className={styles.feedback} key="feedback">
              The trainee has demonstrated consistent progress throughout
              the training program. Attendance is satisfactory, and most
              assigned tasks have been completed within the expected
              deadlines. Further improvement is recommended in teamwork,
              communication, and time management. The trainee should focus
              on completing pending tasks and actively participating in
              upcoming team activities.
            </p>,
          ]}
        />
      </div>
    </section>

    <section className={styles.indicatorsSection}>
      <div className={styles.sectionHeader}>
        <h3>{t("evaluation.performance")}</h3>
      </div>

      <div className={styles.pieCharts}>
        <div className={styles.chartCard}>
          <PieChart
            data={{
              name: t("evaluation.attendance"),
              value: 40,
              notice:
                "Attendance needs improvement. Focus on maintaining consistent participation throughout the training program.",
            }}
          />
        </div>

        <div className={styles.chartCard}>
          <PieChart
            data={{
              name: t("evaluation.performance"),
              value: 60,
              notice:
                "Your performance is progressing. Focus on completing pending tasks and meeting deadlines.",
            }}
          />
        </div>

        <div className={styles.chartCard}>
          <PieChart
            data={{
              name: t("evaluation.teamWork"),
              value: 50,
              notice:
                "Further improvement in teamwork and communication is recommended.",
            }}
          />
        </div>
      </div>
    </section>

    <div className={styles.actions}>
      <Button
        className={styles.reEvaluateRequest}
        onClick={() => setRevaluationForm(true)}
      >
        {t("evaluation.reEvaluate")}
      </Button>
    </div>

    {reEvaluationForm && (
      <Modal
        title={t("evaluation.reEvaluationRequest")}
        onClose={() => setRevaluationForm(false)}
      >
        <div className={styles.modalContent}>
          <Field
            label={t("evaluation.reason")}
            children={<Input />}
          />
          <Button onClick={() => setRevaluationForm(false)}>
            {t("evaluation.send")}
          </Button>
        </div>
      </Modal>
    )}
  </div>
);
}