import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../components/ui/Button";
import { Field, Input, Select } from "../../../components/ui/Field";
import form from "../../../components/ui/Form.module.css";
import Modal from "../../../components/ui/Modal";
import PageHeader from "../../../components/ui/PageHeader";
import Table from "../../../components/ui/Table";
import styles from "./Pages.module.css";
import Loading from "../../../components/ui/Loading";
import { toast } from "react-toastify";
import useAssigned from "../../../hooks/SupervisorHooks/useassigned";
export default function AbsentPage() {
  const { t } = useTranslation("hr");

  const [showAdd, setShowAdd] = useState(false);
  const [addLoading,setAddLoading]=useState(false)
  const { loading, getMyTrainees, myTrainees,getAllAbsent,absent } = useAssigned();

  console.log("absent", absent)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddLoading(true)
    const formData = new FormData(e.currentTarget);
    try {
      const data = await createSupervisors();
      toast.success(data.message);
      setShowAdd(false);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Add Absent Error";
      toast.error(Array.isArray(message) ? message.join("، ") : message);
    }finally{
        setAddLoading(false)
    }
  };

  const columns = [
    {
      key: "name",
      header: t("attendance.trainee"),
      render: (s) => <strong className={styles.strong}>{s.name}</strong>,
    },
    { key: "email", header: t("attendance.reason") },

    { key: "absenceDate", header: t("attendance.absenceDate") },
  ];

  useEffect(() => {
    getAllAbsent()
    getMyTrainees();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <PageHeader
        title={t("attendance.attendanceRegister")}
        action={
          <Button icon={Plus} onClick={() => setShowAdd(true)}>
            {t("attendance.add")}
          </Button>
        }
      />
      <Table columns={columns} rows={[1]} />

      {showAdd && (
        <Modal title={t("supervisors.add")} onClose={() => setShowAdd(false)}>
          <form className={form.form} onSubmit={handleSubmit}>
            <Field label={t("attendance.trainee")}>
              <Select name="traineeId" required>
                {myTrainees?.map((tr) => (
                  <option key={tr.id} value={tr.id}>
                    --{tr.name}--
                  </option>
                ))}
              </Select>
            </Field>

            <Field label={t("attendance.reason")}>
              <Input name="reason" required />
            </Field>

            <Button type="submit" loading={addLoading}>
              {t("action.add", { ns: "common" })}
            </Button>
          </form>
        </Modal>
      )}
    </>
  );
}
