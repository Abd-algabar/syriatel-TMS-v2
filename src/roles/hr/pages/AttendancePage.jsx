import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Field';
import Table from '../../../components/ui/Table';
import { useData } from '../../../data/DataContext';
import StatusBadge from '../components/StatusBadge';
import styles from './Pages.module.css';

export default function AttendancePage() {
  const { t } = useTranslation('hr');
  const { attendance, getTrainee } = useData();
  const [search, setSearch] = useState('');

  const q = search.trim().toLowerCase();
  const rows = attendance.filter((a) => !q || getTrainee(a.traineeId)?.name.toLowerCase().includes(q));

  const columns = [
    { key: 'trainee', header: t('attendance.trainee'), render: (a) => <strong className={styles.strong}>{getTrainee(a.traineeId)?.name}</strong> },
    { key: 'date', header: t('attendance.absenceDate') },
    { key: 'status', header: t('label.status', { ns: 'common' }), render: (a) => <StatusBadge kind="attendance" status={a.status} /> },
    { key: 'reason', header: t('attendance.reason'), render: (a) => t(`reason.${a.reason}`, { ns: 'common' }) },
  ];

  return (
    <>
      <Card className={styles.searchCard}>
        <Input placeholder={t('attendance.searchPlaceholder')} value={search} onChange={(e) => setSearch(e.target.value)} />
      </Card>
      <Table columns={columns} rows={rows} emptyText={t('attendance.empty')} />
    </>
  );
}
