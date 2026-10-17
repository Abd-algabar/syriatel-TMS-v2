import { FileDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import { useToast } from '../../../context/ToastContext';
import { useData } from '../../../data/DataContext';
import styles from './ReportsPage.module.css';
import UnderDevelopment from '../../../components/error/UnderDevelopment';

export default function ReportsPage() {
  const { t } = useTranslation('hr');
  const { applicants, trainees, interviews } = useData();
  const { toast } = useToast();

  const acceptanceRate = applicants.length ? Math.round((trainees.length / applicants.length) * 100) : 0;



    return (
  
      <UnderDevelopment/>
    )

  return (
    <Card>
      <h4 className={styles.title}>{t('reports.title')}</h4>

      <div className={styles.grid}>
        <div className={`${styles.metric} ${styles.primary}`}>
          <p>{t('reports.acceptanceRate')}</p>
          <strong>{acceptanceRate}%</strong>
        </div>
        <div className={styles.metric}>
          <p>{t('reports.totalInterviews')}</p>
          <strong>{interviews.length}</strong>
        </div>
      </div>

      <Button variant="dark" icon={FileDown} onClick={() => toast(t('reports.exporting'), 'info')}>
        {t('reports.exportPdf')}
      </Button>
    </Card>
  );
}
