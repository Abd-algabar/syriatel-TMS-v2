import Card from "../../../../components/ui/Card.jsx";
import Badge from "../../../../components/ui/Badge.jsx";
import Button from "../../../../components/ui/Button.jsx"
import Modal from "../../../../components/ui/Modal.jsx"
import styles from "./VacationPage.module.css";
import Loading from "../../../../components/ui/Loading";
import {getVacationsRequests,requestVacation,canceltVacation} from "../../../../Api/Trainee/vacationApi.js"
import {Field,Input} from "../../../../components/ui/Field.jsx"
import { ArrowRight, CalendarDays } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect,useState,useRef } from "react";
import { toast } from "react-toastify";


export default function VacationPage() {

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
  const canceledVacationId= useRef(-1);
  const { t } = useTranslation("trainee");
  const [vacationRequest , setVacationRequest]=useState({
    reason: "",
  start_date: "",
  end_date: "",
  })
  const [sendingVacationRequest , setSendingVacationRequest]=useState(false)
  const [vacationsList,setVacationsList] = useState([])
  const[vacationState,setAddVacation]=useState(false)
  const[cancelVacationState,setCancelVacationState]=useState(false)
  const[loadingCancelVacationState,setLoadingCancelVacationState]=useState(false)
  const[loadingAction,setLoadingAction]=useState(false)
  const getVacatoinsList = async()=>{
      try{
        setLoadingAction(true)
        const response = await getVacationsRequests()
        const data= response.data;
        setVacationsList(Array.isArray(data) ? data :[])
        
      }catch(error){
        toast.error(error.message)
      }finally{
        setLoadingAction(false)
      }
    }
  useEffect(()=>{
    getVacatoinsList()
  },[])

  const sendVacationRequest = async () => {
  const { reason, start_date, end_date } = vacationRequest;

  if (!reason.trim() || !start_date || !end_date) {
    toast.warn(t("vacation.requiredFields"));
    return;
  }

  if (start_date > end_date) {
    toast.warn(t("vacation.incorrectDate"));
    return;
  }

  try {
    setSendingVacationRequest(true);

    const response = await requestVacation(vacationRequest);

    toast.success(response.message);
    setAddVacation(false);

    await getVacatoinsList();
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
      error?.message ||
      t("common.error")
    );
  } finally {
    setSendingVacationRequest(false);
  }
};

  const getToday = () => {
  const date = new Date();
  date.setDate(date.getDate()+1)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

  const  openCancelVacation=(vacationId)=>{
    setCancelVacationState(true)
    canceledVacationId.current=vacationId
  }

  const openUpdateVacation =(vacationData)=>{
    setVacationRequest({
          reason: vacationData.reason,
          start_date: vacationData.start_date.split(" ")[0],
          end_date: vacationData.end_date.split(" ")[0],
    })
    setAddVacation(true);
  }
    const sendCancelVacation =async ()=>{
    try{
      setLoadingCancelVacationState(true)
      const response = await canceltVacation(canceledVacationId.current)
      toast.success(response.message)
      setCancelVacationState(false)
      await getVacatoinsList()
    }catch(error){
      toast.error(error.message)
    }finally{
      setLoadingCancelVacationState(false)
    }
  }
  const showCancelVacation = (status,startDate)=>{
    const currentDate = getToday()
    return (status === "pending" && currentDate < startDate)
  }
  const cancelVacationModel = <Modal
                  title={t("vacation.areYouSure")}
                  onClose={()=>setCancelVacationState(false)}
                    >
                  <div className= {styles.cancelVacation}>
                    <Button 
                        variant="soft"
                        loading={loadingCancelVacationState}
                        disabled={loadingCancelVacationState}
                        children={t("vacation.cancelRequest")}
                        onClick={()=>sendCancelVacation()}
                  />
                  <Button
                        disabled={loadingCancelVacationState}
                        children={t("vacation.cancel")}
                        onClick={()=>setCancelVacationState(false)}
                  />
                  </div>
  </Modal>
  const addVacationFormComponent = 
          <Modal 
          title={t("vacation.vacationRequest")}
          onClose={()=>setAddVacation(false)}>
            <form onSubmit={(e) => { e.preventDefault(); sendVacationRequest(); }}>
              
                <Field key={"reason"}
                label={t("evaluation.reason")}
                children={<Input 
                required
                value={vacationRequest.reason}
                onChange={(e)=>setVacationRequest((pre)=>({...pre,"reason":e.target.value}))}
                
                />}/>
                <div className={styles.vacationDate}>
                    <Field key={"startDate"}
                        label={t("vacation.startDate")}
                        children={<Input type={"date"} min={getToday()}
                        value={vacationRequest.start_date} 
                        onChange={(e)=>setVacationRequest((pre)=>({...pre,"start_date":e.target.value.split(" ")[0]}))} />}/>
                    <Field key={"endDate"}
                        label={t("vacation.endDate")} 
                        children={
                        <Input type={"date"} min={getToday()}
                        value={vacationRequest.end_date}
                        onChange={(e)=>setVacationRequest((pre)=>({...pre,"end_date":e.target.value.split(" ")[0]}))}/>}/>
                </div>
                  <br/>
                  <Button 
                        type="submit"
                        className={styles.sendRequest}
                        loading={sendingVacationRequest}
                        disabled={sendingVacationRequest}
                        children={t("evaluation.send")}
                  />
              </form>
          </Modal>
  return (
    loadingAction ?<Loading />:
  <>
    <section className={styles.page}>
      <header>
        <span className={styles.count}>
          {vacationsList.length} {t("vacation.requests")}
        </span>
      </header>
      <div className={styles.list}>
        {vacationsList.map((vacation) => (
          <Card
            key={vacation.id }
            className={`${styles.card} ${styles[vacation.state]}`}
          >
            <div className={styles.cardHeader}>
              <div className={styles.reasonGroup}>
                <h3 className={styles.reason}>
                  {vacation.reason}
                </h3>
              </div>
              <Badge tone={getBadgeTone(vacation.state)}>
                {t(`vacation.${vacation.status}`)}
              </Badge>
            </div>

            <div className={styles.dateSection}>
              <div className={styles.dateBlock}>
                <span className={styles.dateLabel}>
                  {t("vacation.startDate")}
                </span>

                <span className={styles.dateValue}>
                  {vacation.start_date}
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
                  {vacation.end_date}
                </span>
              </div>
            </div>
            <div className={styles.footer}>
              <span className={styles.meta}>
                <CalendarDays size={15} />
                {t("vacation.submitted")} {vacation.submitted_at}
              </span>
              {showCancelVacation(vacation.status,vacation.start_date)&&<div
              className={styles.container}>
                <Button 
                        variant="soft"
                        className={styles.sendRequest}
                        loading={sendingVacationRequest}
                        disabled={sendingVacationRequest}
                        children={t("vacation.cancelVacation")}
                        onClick={()=>openCancelVacation(vacation.id)}
                  />
                  <Button 
                        variant="secondary"
                        className={styles.sendRequest}
                        loading={sendingVacationRequest}
                        disabled={sendingVacationRequest}
                        children={t("vacation.update")}
                        onClick={()=>openUpdateVacation(vacation)}
                  /></div>}
            </div>
          </Card>
        ))}
        <Button className={styles.addReqeust} children={t("vacation.addRequest")} onClick={()=>setAddVacation(true)}/>
        
      </div>
        {vacationState && addVacationFormComponent}
        {cancelVacationState && cancelVacationModel }

    </section></>
  );
}