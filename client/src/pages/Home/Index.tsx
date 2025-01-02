import './Home.scss';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setKanjiToMeaning, setMeaningToKanji } from '../../store/slices/settings';
import { setDb, setLevel, setRound, setCorrect, setWrong, setQuestionNbs } from '../../store/slices/game';
//import db from '../../assets/resources/db.json';
import InfoBar from '../../components/InfoBar/Index';
import Card from '../../components/Card/Index';
import MainBtn from '../../components/buttons/MainBtn/Index';

export default function Home() {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const { kanjiToMeaning, meaningToKanji } = useAppSelector((state) => state.settings);
   const { db, level, round, correct, wrong, totalRounds, questionNbs } = useAppSelector((state) => state.game);

   //const [db, setDb] = useState<any>([]);

   const [choices, setChoices] = useState<number[]>([]);
   const [selected, setSelected] = useState<number | undefined>(undefined);
   const [answer, setAnswer] = useState<string>('');

   const timerRoundRef = useRef<number | null>(null);
   const timerShowAnswerRef = useRef<number | null>(null);

   useEffect(() => {
      console.log("lebel = ", level);
      const importData = async (level: number) => {
         let fileName = '';
         switch (level) {
            case 1: fileName = 'db_50'; break;
            case 2: fileName = 'db_100'; break;
            case 3: fileName = 'db_150'; break;
         }

         const data = await import(`../../assets/resources/${fileName}.json`);
         dispatch(setDb(data.default));
         console.log(db);
      }

      if (level && !db.length) {
         importData(level);
      }
   }, [level]);

   // get random questions data
   useEffect(() => {
      console.log("db.length = ", db.length);
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
      if (questionNbs.length) {
         initializeRound();
         const numbers = [...Array(db.length).keys()];
         const randomNbs = numbers.sort(() => Math.random() - 0.5);
         // get 3 random answers different than the correct one
         const wrongChoiceNbs = randomNbs.filter(nb => nb !== questionNbs[round]).slice(0, 3);
         //console.log(wrongChoiceNbs);
         // randomly sort the choices
         const choices = [...wrongChoiceNbs, questionNbs[round]].sort(() => Math.random() - 0.5);
         setChoices(choices);
      }
   }, [round, questionNbs.length]);

   const initializeRound = () => {
      setChoices([]);
      setSelected(undefined);
      setAnswer('');
   }

   // check the answer
   const checkAnswer = (choice: number) => {
      timerRoundRef.current &&
         clearTimeout(timerRoundRef.current);
      timerShowAnswerRef.current &&
         clearTimeout(timerShowAnswerRef.current);
      //console.log(choices);
      //console.log("chosen = ", choice);
      //console.log("right answer = ", questionNbs[round]);

      timerShowAnswerRef.current = setTimeout(() => {
         if (choice === questionNbs[round]) {
            //console.log("RIGHT!");
            setAnswer("correct");
            dispatch(setCorrect(correct + 1));
         } else {
            //console.log("wrong!");
            setAnswer("wrong");
            dispatch(setWrong(wrong + 1));
         }
      }, 400);

      // change round after some time
      timerRoundRef.current = setTimeout(() => {
         if (round === totalRounds - 1) {
            navigate('/gameover');
            dispatch(setKanjiToMeaning(false));
            dispatch(setMeaningToKanji(false));
         }

         dispatch(setRound(round < totalRounds - 1 ? round + 1 : 0));
         console.log("round = ", round);
      }, 2200);
   }

   const handleCardClick = (choice: number) => {
      if (!selected) {
         checkAnswer(choice);
         setSelected(choice);
      }
   }

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

         {((kanjiToMeaning || meaningToKanji)
            && !level) &&
            <section className="choose_mode">
               <p className="level_txt">Choose a level:</p>

               <MainBtn
                  text="Easy"
                  onClick={() => dispatch(setLevel(1))}
               />
               <MainBtn
                  text="Medium"
                  onClick={() => dispatch(setLevel(2))}
               />
               <MainBtn
                  text="Difficult"
                  onClick={() => dispatch(setLevel(3))}
               />
            </section>
         }

         {((kanjiToMeaning || meaningToKanji)
            && level
            && choices.length
            && round < totalRounds) &&

            <section className="game_section" key={round}>
               <InfoBar />

               <section className="card_section">
                  <div className="question_ctn">
                     <p>{db[questionNbs[round]].EN}</p>
                  </div>

                  <div className="choices_ctn">
                     {choices.map((choice, i) =>
                        <Card
                           className={`
                              ${(selected === choice && !answer) ? 'selected' : ''} 
                              ${selected === choice ? answer : ''}
                              ${answer === 'wrong' && choice === questionNbs[round] ? 'correct_blinking' : ''}
                           `}
                           text={db[choice].JAP}
                           onClick={() => handleCardClick(choice)}
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