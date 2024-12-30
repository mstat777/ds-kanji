import './GameOver.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Link } from 'react-router-dom';

export default function GameOver() {
   const { score } = useAppSelector((state) => state.game);
   let message = '';
   const dispatch = useAppDispatch();

   if (score < 20) {
      message = "Not good. " + String.fromCodePoint(128549) + "\nBut you can try again.";
   } else if (score >= 20 && score < 35) {
      message = "Next time you will do better. " + String.fromCodePoint(128539);
   } else if (score >= 35 && score < 50) {
      message = "I'm sure that you can do better. " + String.fromCodePoint(128512);
   } else if (score >= 50 && score < 60) {
      message = "Not bad! " + String.fromCodePoint(128521);
   } else if (score >= 60 && score < 80) {
      message = "Good game! " + String.fromCodePoint(128522);
   } else if (score >= 80 && score < 100) {
      message = "Bravo! A very good game! " + String.fromCodePoint(128525);
   } else if (score === 100) {
      message = "CONGRATULATIONS!\nYou were excelent! " + String.fromCodePoint(127942);
   }

   return (
      <main className="gameover">
         <div>
            <p className="gameover_txt">ゲームオーバー</p>

            <p className="message">Your score is <span>{score}</span>%.</p>

            <p className="message">{message}</p>

            <Link to={'/home'}
               onClick={() => dispatch({ type: "RESET_ALL" })}
               className="link"
            >
               Play another game
            </Link>
         </div>
      </main>
   )
}