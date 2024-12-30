import './InfoBar.scss';
import { useAppSelector } from '../../store/hooks';

export default function InfoBar() {
   const { round, result, correct, wrong } = useAppSelector((state) => state.game);

   return (
      <div className="infobar">
         <div className="info_item">
            <span>Round:</span>
            <span>{round}/20</span>
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
            <span>Result:</span>
            <span>{result}%</span>
         </div>
      </div>
   )
} 