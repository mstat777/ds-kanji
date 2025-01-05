import './InfoBar.scss';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/hooks';

export default function InfoBar() {
   const { t } = useTranslation();
   const trPath = "components.infoBar"; // translation path

   const { level, round, totalRounds, score, correct, wrong } = useAppSelector((state) => state.game);

   return (
      <div className="infobar">

         <div className="info_item">
            <span>{t(`${trPath}.level`)}</span>
            <span>{t(`pages.home.level.${level}`)}</span>
         </div>

         <div className="info_item">
            <span>{t(`${trPath}.round`)}</span>
            <span>{round + 1}/{totalRounds}</span>
         </div>

         <div className="info_item">
            <span>{t(`${trPath}.correct`)}</span>
            <span>{correct}</span>
         </div>

         <div className="info_item">
            <span>{t(`${trPath}.wrong`)}</span>
            <span>{wrong}</span>
         </div>

         <div className="info_item">
            <span>{t(`${trPath}.score`)}</span>
            <span>{score}%</span>
         </div>

      </div>
   )
} 