import './InfoBar.scss';
import { useAppSelector } from '../../store/hooks';

export default function InfoBar() {
   const { round, score, correct, wrong } = useAppSelector((state) => state.game);

   return (
      <div className="infobar">
         <div className="info_item">
            <span>Round:</span>
            <span>{round + 1}/20</span>
         </div>

         <div className="info_item">
            <span>Correct:</span>
            <span>{correct}</span>
         </div>

         <div className="info_item">
            <span>Wrong:</span>
            <span>{wrong}</span>
         </div>

         <div className="info_item">
            <span>Score:</span>
            <span>{score}%</span>
         </div>
      </div>
   )
} 