import { Building2, CalendarCheck, Clock, GraduationCap, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Card from '../../../components/ui/Card';
import { INTERVIEW_STATUS } from '../../../constants';
import { useData } from '../../../data/DataContext';
import StatusBadge from '../components/StatusBadge';
import styles from './DashboardPage.module.css';
import UnderDevelopment from '../../../components/error/UnderDevelopment';

export default function DashboardPage() {
  const { t } = useTranslation('hr');
  const {  trainees, interviews, departments, getApplicant, getSupervisor } = useData();

  const applicants=[
    {id:1,name:"ali", status:"pending",date:new Date().toISOString().split("T")[0]},
    {id:2,name:"ali2", status:"pending",date:new Date().toISOString().split("T")[0]},
    {id:3,name:"ali3", status:"pending",date:new Date().toISOString().split("T")[0]},
    {id:4,name:"ali4", status:"pending",date:new Date().toISOString().split("T")[0]},
    {id:5,name:"ali5", status:"pending",date:new Date().toISOString().split("T")[0]},
  ]

  const stats = [
    { label: t('nav.applicants'), value: applicants.length, icon: Users },
    { label: t('nav.trainees'), value: trainees.length, icon: GraduationCap },
    { label: t('nav.interviews'), value: interviews.length, icon: CalendarCheck },
    { label: t('nav.departments'), value: departments.length, icon: Building2 },
  ];
  const upcoming = [
    {id:1,name:"ali", supname:"yazan",date:new Date().toISOString()},
    {id:2,name:"ali2", supname:"pending",date:new Date().toISOString()},
    {id:3,name:"ali3", supname:"pending",date:new Date().toISOString()},
    {id:4,name:"ali4", supname:"pending",date:new Date().toISOString()},
    {id:5,name:"ali5", supname:"pending",date:new Date().toISOString()},
  ] ;


      return (
  
        <UnderDevelopment/>
      )
  return (
    <>
      <div className={styles.stats}>
        {stats.map(({ label, value, icon: Icon }) => (
          <Card key={label} className={styles.stat}>
            <div>
              <p className={styles.statLabel}>{label}</p>
              <p className={styles.statValue}>{value}</p>
            </div>
            <span className={styles.statIcon}><Icon size={22} /></span>
          </Card>
        ))}
      </div>

      <div className={styles.columns}>
        <Card>
          <h4 className={styles.heading}><Clock size={18} /> {t('dashboard.latestApplicants')}</h4>
          <ul className={styles.list}>
            {applicants.map((a) => (
              <li key={a.id} className={styles.item}>
                <d  iv>
                  <p className={styles.itemTitle}>{a.name}</p>
                  {/* <p className={styles.itemSub}>{t(`major.${a.major}`, { ns: 'common' })} · {t(`city.${a.city}`, { ns: 'common' })}</p> */}
                  <p className={styles.itemSub}>{a.date} </p>
                </d>
                <StatusBadge status={a.status} />
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h4 className={styles.heading}><CalendarCheck size={18} /> {t('dashboard.upcomingInterviews')}</h4>
          <ul className={styles.list}>
            {upcoming.map((i) => (
              <li key={i.id} className={styles.item}>
                <div>
                  <p className={styles.itemTitle}>{i.name}</p>
                  <p className={styles.itemSub}>{t('dashboard.supervisorLine', { name: i.supname })}</p>
                </div>
                <div className={styles.when}>
                  <p>{i.date}</p>
                  {/* <p>{i.time}</p> */}
                </div>
              </li>
            ))}
            {upcoming.length === 0 && <li className={styles.empty}>{t('dashboard.noUpcoming')}</li>}
          </ul>
        </Card>
      </div>
    </>
  );
}
