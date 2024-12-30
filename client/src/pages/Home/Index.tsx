import './Home.scss';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import Card from '../../components/Card/Index';
import MainBtn from '../../components/buttons/MainBtn/Index';
import { setKanjiToMeaning, setMeaningToKanji } from '../../store/slices/settings';
import { setRound, setQuestionNbs } from '../../store/slices/game';
import db from '../../assets/resources/db.json';
import InfoBar from '../../components/InfoBar/Index';

export default function Home() {
   const dispatch = useAppDispatch();
   const { kanjiToMeaning, meaningToKanji } = useAppSelector((state) => state.settings);
   const { round, totalRounds, questionNbs } = useAppSelector((state) => state.game);

   const [choices, setChoices] = useState<number[]>([]);

   // get random questions & data
   useEffect(() => {
      if (totalRounds && db.length) {
         //console.log(db.length);
         const numbers = [...Array(db.length).keys()];
         //console.log(numbers);
         const randomNbs = numbers.sort(() => Math.random() - 0.5).slice(0, totalRounds);
         dispatch(setQuestionNbs(randomNbs));
      }
   }, [totalRounds, db.length]);

   // create choices
   useEffect(() => {
      console.log(questionNbs.length);
      if (questionNbs.length) {
         const numbers = [...Array(db.length).keys()];
         const randomNbs = numbers.sort(() => Math.random() - 0.5);
         const wrongChoiceNbs = randomNbs.filter(nb => nb !== 0).slice(0, 3);
         console.log(wrongChoiceNbs);
         // sort randomly the choices
         const choices = [...wrongChoiceNbs, questionNbs[round]].sort(() => Math.random() - 0.5);
         setChoices(choices);
      }
   }, [round, questionNbs.length]);

   // check the answer
   const checkAnswer = (choice: number) => {
      console.log(choices);
      console.log("chosen = ", choice);
      console.log("right answer = ", questionNbs[round]);
      if (choice === questionNbs[round]) {
         console.log("RIGHT!");
      } else { console.log("wrong!"); }
   }

   useEffect(() => {
      if (choices.length) {
         console.log(choices);
      }
   }, [choices.length]);

   return (
      <main className="home">

         {(!kanjiToMeaning && !meaningToKanji) &&
            <section className="choose_mode">
               <MainBtn
                  text="Find Kanji Meaning"
                  onClick={() => dispatch(setKanjiToMeaning(true))}
               />
               <MainBtn
                  text="Find Kanji"
                  onClick={() => dispatch(setMeaningToKanji(true))}
               />
            </section>
         }

         {((kanjiToMeaning || meaningToKanji) && choices.length) &&
            <section className="game_section">
               <InfoBar />

               <section className="card_section">

                  <div className="question_ctn">
                     <p>{db[questionNbs[0]].EN}</p>
                  </div>

                  <div className="choices_ctn">
                     {choices.map((choice, i) =>
                        <Card
                           text={db[choice].JAP}
                           onClick={() => checkAnswer(choice)}
                           key={i}
                        />
                     )}
                  </div>
               </section>
            </section>
         }

      </main>
   );
}