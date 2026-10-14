import { useTranslation } from "react-i18next";
import Table from "../../../components/ui/Table";
import { useData } from "../../../data/DataContext";
import styles from "./Pages.module.css";

import Button from "../../../components/ui/Button";
import Loading from "../../../components/ui/Loading";
import { useEffect } from "react";
import useAssigned from "../../../hooks/SupervisorHooks/useassigned";
export default function TraineesPage() {
  const { t } = useTranslation("hr");

  const { myTrainees, loading, getMyTrainees } = useAssigned();
  console.log("my", myTrainees);
  useEffect(() => {
    getMyTrainees();
  }, []);
  const columns = [
    {
      key: "id",
      header: t("trainees.traineeId"),
      render: (tr) => <span className={styles.id}>#{tr.id}</span>,
    },
    {
      key: "name",
      header: t("label.name", { ns: "common" }),
      render: (tr) => <strong className={styles.strong}>{tr.name}</strong>,
    },
    { key: "email", header: t("label.email", { ns: "common" }) },
    {
      key: "department",
      header: t("label.department", { ns: "common" }),
      render: (tr) => tr.department ?? "—",
    },
    {
      key: "supervisor",
      header: t("interviews.supervisor"),
      render: (tr) => tr.supervisor,
    },
    {
      key: "actions",
      header: t("label.actions", { ns: "common" }),
      render: (a) => (
        <Button size="sm" loading={""} onClick={() => openModel(a)}>
          x
        </Button>
      ),
    },
  ];

  return loading ? (
    <Loading />
  ) : (
    <Table
      columns={columns}
      rows={myTrainees}
      emptyText={t("trainees.empty")}
    />
  );
}
