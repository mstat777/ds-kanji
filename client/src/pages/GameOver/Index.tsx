import './GameOver.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export default function GameOver() {
   const { t } = useTranslation();
   const trPath = "pages.gameOver"; // translation path

   const dispatch = useAppDispatch();
   const { score } = useAppSelector((state) => state.game);

   const [scoreNb, setScoreNb] = useState<number>(-1);

   let message = '';

   useEffect(() => {
      //console.log("score = ", score);
      if (score) {
         setScoreNb(score);
      }
   }, [score]);

   useEffect(() => {
      //console.log("score = ", score);
      //console.log("scoreNb = ", scoreNb);

      if (scoreNb >= 0) {
         dispatch({ type: "RESET_GAME" });
      }
   }, [scoreNb]);

   // show message according to the result
   if (scoreNb < 20) {
      message = t(`${trPath}.messages.veryBad`, { smiley: String.fromCodePoint(128549) });
   } else if (scoreNb >= 20 && scoreNb < 35) {
      message = t(`${trPath}.messages.bad`, { smiley: String.fromCodePoint(128539) });
   } else if (scoreNb >= 35 && scoreNb < 50) {
      message = t(`${trPath}.messages.notGood`, { smiley: String.fromCodePoint(128512) });
   } else if (scoreNb >= 50 && scoreNb < 60) {
      message = t(`${trPath}.messages.soSo`, { smiley: String.fromCodePoint(128521) });
   } else if (scoreNb >= 60 && scoreNb < 80) {
      message = t(`${trPath}.messages.good`, { smiley: String.fromCodePoint(128522) });
   } else if (scoreNb >= 80 && scoreNb < 100) {
      message = t(`${trPath}.messages.veryGood`, { smiley: String.fromCodePoint(128525) });
   } else if (scoreNb === 100) {
      message = t(`${trPath}.messages.excellent`, { smiley: String.fromCodePoint(127942) });
   }

   return (
      <main className="gameover">
         <div>
            <p className="gameover_txt">ゲームオーバー</p>

            {scoreNb &&
               <p className="message">{t(`${trPath}.scoreTxt`)}
                  <span>{scoreNb}</span>%.</p>}

            <p className="message">{message}</p>

            <Link to={'/home'} className="link">
               {t(`${trPath}.playAnotherBtn`)}
            </Link>
         </div>
      </main>
   )
}