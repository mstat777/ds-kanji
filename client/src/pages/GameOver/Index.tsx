import './GameOver.scss';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Link } from 'react-router-dom';

export default function GameOver() {
   const { t } = useTranslation();
   const trPath = "pages.gameOver"; // translation path

   const { score } = useAppSelector((state) => state.game);
   let message = '';
   const dispatch = useAppDispatch();

   if (score < 20) {
      message = t(`${trPath}.messages.veryBad`, { smiley: String.fromCodePoint(128549) });
   } else if (score >= 20 && score < 35) {
      message = t(`${trPath}.messages.bad`, { smiley: String.fromCodePoint(128539) });
   } else if (score >= 35 && score < 50) {
      message = t(`${trPath}.messages.notGood`, { smiley: String.fromCodePoint(128512) });
   } else if (score >= 50 && score < 60) {
      message = t(`${trPath}.messages.soSo`, { smiley: String.fromCodePoint(128521) });
   } else if (score >= 60 && score < 80) {
      message = t(`${trPath}.messages.good`, { smiley: String.fromCodePoint(128522) });
   } else if (score >= 80 && score < 100) {
      message = t(`${trPath}.messages.veryGood`, { smiley: String.fromCodePoint(128525) });
   } else if (score === 100) {
      message = t(`${trPath}.messages.excellent`, { smiley: String.fromCodePoint(127942) });
   }

   return (
      <main className="gameover">
         <div>
            <p className="gameover_txt">ゲームオーバー</p>

            <p className="message">{t(`${trPath}.scoreTxt`)}<span>{score}</span>%.</p>

            <p className="message">{message}</p>

            <Link to={'/home'}
               onClick={() => dispatch({ type: "RESET_ALL" })}
               className="link"
            >
               {t(`${trPath}.playAnotherBtn`)}
            </Link>
         </div>
      </main>
   )
}