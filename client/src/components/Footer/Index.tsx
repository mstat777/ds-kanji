import './Footer.scss';
import { useTranslation } from 'react-i18next';

export default function Footer() {
   const { t } = useTranslation();
   const trPath = "components.footer"; // translation path

   return (
      <footer className="footer">
         <p>{t(`${trPath}.rights`)}</p>
      </footer>
   )
}