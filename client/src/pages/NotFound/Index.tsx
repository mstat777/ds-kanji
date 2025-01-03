import './NotFound.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function NotFound() {
   const { t } = useTranslation();
   const trPath = "pages.notFound"; // translation path

   return (
      <main className="not_found">
         <h1>{t(`${trPath}title`)}</h1>
         <p>{t(`${trPath}text`)} <Link to="/home">{t(`${trPath}link`)}</Link></p>
      </main>
   );
}