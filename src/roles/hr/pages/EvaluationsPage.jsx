import { useTranslation } from 'react-i18next';
import Table from '../../../components/ui/Table';
import { useData } from '../../../data/DataContext';
import styles from './Pages.module.css';
import UnderDevelopment from '../../../components/error/UnderDevelopment';

export default function EvaluationsPage() {
  const { t } = useTranslation('hr');
  const { trainees, getDepartment } = useData();

  const columns = [
    { key: 'id', header: t('trainees.traineeId'), render: (tr) => <span className={styles.id}>#{tr.id}</span> },
    { key: 'name', header: t('label.name', { ns: 'common' }), render: (tr) => <strong className={styles.strong}>{tr.name}</strong> },
    { key: 'email', header: t('label.email', { ns: 'common' }) },
    { key: 'department', header: t('label.department', { ns: 'common' }), render: (tr) => getDepartment(tr.departmentId)?.name ?? '—' },
    { key: 'startDate', header: t('trainees.startDate') },
  ];

  
    return (
  
      <UnderDevelopment/>
    )

  return <Table columns={columns} rows={trainees} emptyText={t('trainees.empty')} />;
}
