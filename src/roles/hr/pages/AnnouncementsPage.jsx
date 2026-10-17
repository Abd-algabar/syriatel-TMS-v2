import { Clock, Megaphone } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import { Field, Input, Select, Textarea } from '../../../components/ui/Field';
import form from '../../../components/ui/Form.module.css';
import Modal from '../../../components/ui/Modal';
import PageHeader from '../../../components/ui/PageHeader';
import { AUDIENCE } from '../../../constants';
import { useToast } from '../../../context/ToastContext';
import { useData } from '../../../data/DataContext';
import useBusy from '../../../hooks/useBusy';
import styles from './AnnouncementsPage.module.css';
import UnderDevelopment from '../../../components/error/UnderDevelopment';

export default function AnnouncementsPage() {
  const { t } = useTranslation('hr');
  const { announcements, addAnnouncement } = useData();
  const { toast } = useToast();
  const { run, isBusy } = useBusy();
  const [showAdd, setShowAdd] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    run('add', async () => {
      await addAnnouncement({ title: data.get('title'), details: data.get('details'), target: data.get('target') });
      toast(t('announcements.toast.sent'));
      setShowAdd(false);
    });
  };

  return(
    <UnderDevelopment/>
  )

  return (
    <>
      <PageHeader
        title={t('announcements.listTitle')}
        action={<Button icon={Megaphone} onClick={() => setShowAdd(true)}>{t('announcements.send')}</Button>}
      />

      <div className={styles.list}>
        {announcements.map((a) => (
          <Card key={a.id}>
            <div className={styles.top}>
              <h4>{a.title}</h4>
              <Badge>{t(`audience.${a.target}`, { ns: 'common' })}</Badge>
            </div>
            <p className={styles.details}>{a.details}</p>
            <span className={styles.date}><Clock size={14} /> {a.date}</span>
          </Card>
        ))}
      </div>

      {showAdd && (
        <Modal title={t('announcements.send')} onClose={() => setShowAdd(false)}>
          <form className={form.form} onSubmit={handleSubmit}>
            <Field label={t('announcements.target')}>
              <Select name="target" required>
                {Object.values(AUDIENCE).map((k) => (
                  <option key={k} value={k}>{t(`audience.${k}`, { ns: 'common' })}</option>
                ))}
              </Select>
            </Field>
            <Field label={t('announcements.title')}><Input name="title" required /></Field>
            <Field label={t('announcements.details')}><Textarea name="details" required /></Field>
            <Button type="submit" loading={isBusy('add')}>{t('action.save', { ns: 'common' })}</Button>
          </form>
        </Modal>
      )}
    </>
  );
}
