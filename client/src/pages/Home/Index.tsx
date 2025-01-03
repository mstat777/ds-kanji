import './Home.scss';
import { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { useTranslation } from 'react-i18next';
import { setKanjiToMeaning, setMeaningToKanji } from '../../store/slices/settings';
import { setDb, setLevel, setRound, setCorrect, setWrong, setQuestionNbs } from '../../store/slices/game';
import InfoBar from '../../components/InfoBar/Index';
import Card from '../../components/Card/Index';
import MainBtn from '../../components/buttons/MainBtn/Index';
import { DataLayerContext } from '../../context/DataLayerProvider';

export default function Home() {
   const { t } = useTranslation();
   const trPath = "pages.home"; // translation path
   const DATA_LAYER = useContext(DataLayerContext);
   const lang = DATA_LAYER?.currLang.toUpperCase(); // the current language

   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const { kanjiToMeaning, meaningToKanji, showInfoBar } = useAppSelector((state) => state.settings);
   const { db, level, round, correct, wrong, totalRounds, questionNbs } = useAppSelector((state) => state.game);

   const [choices, setChoices] = useState<number[]>([]);
   const [selected, setSelected] = useState<number | undefined>(undefined);
   const [answer, setAnswer] = useState<string>('');

   const timerRoundRef = useRef<number | null>(null);
   const timerShowAnswerRef = useRef<number | null>(null);

   useEffect(() => {
      const importData = async (level: number) => {
         let fileName = '';
         switch (level) {
            case 1: fileName = 'db_25'; break;
            case 2: fileName = 'db_50'; break;
            case 3: fileName = 'db_100'; break;
            case 4: fileName = 'db_150'; break;
         }

         const data = await import(`../../assets/resources/${fileName}.json`);
         dispatch(setDb(data.default));
      }

      if (level && !db.length) {
         importData(level);
      }
   }, [level]);

   // get random questions data
   useEffect(() => {
      //console.log("db.length = ", db.length);
      if (totalRounds && db.length) {
         const numbers = [...Array(db.length).keys()];
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

      timerShowAnswerRef.current = setTimeout(() => {
         if (choice === questionNbs[round]) {
            setAnswer("correct");
            dispatch(setCorrect(correct + 1));
         } else {
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
         //console.log("round = ", round);
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
                  text={t(`${trPath}.mode.findMeaning`)}
                  onClick={() => dispatch(setKanjiToMeaning(true))}
               />
               <MainBtn
                  text={t(`${trPath}.mode.findKanji`)}
                  onClick={() => dispatch(setMeaningToKanji(true))}
               />
            </section>
         }

         {((kanjiToMeaning || meaningToKanji)
            && !level) &&
            <section className="choose_mode">
               <p className="level_txt">{t(`${trPath}.level.text`)}</p>

               <MainBtn
                  text={t(`${trPath}.level.1`)}
                  onClick={() => dispatch(setLevel(1))}
               />
               <MainBtn
                  text={t(`${trPath}.level.2`)}
                  onClick={() => dispatch(setLevel(2))}
               />
               <MainBtn
                  text={t(`${trPath}.level.3`)}
                  onClick={() => dispatch(setLevel(3))}
               />
               <MainBtn
                  text={t(`${trPath}.level.4`)}
                  onClick={() => dispatch(setLevel(4))}
               />
            </section>
         }

         {/* ----- Game Mode "KANJI TO MEANING" ----- */}
         {(kanjiToMeaning
            && lang
            && level
            && choices.length
            && round < totalRounds) &&

            <section
               className="kanji_to_meaning_section"
               key={round}
            >
               {showInfoBar && <InfoBar />}
               <section className="card_section">
                  <div className="question_ctn">
                     <p>{db[questionNbs[round]].JAP}</p>
                  </div>

                  <div className="choices_ctn">
                     {choices.map((choice, i) =>
                        <Card
                           type="letters"
                           className={`
                              ${(selected === choice && !answer) ? 'selected' : ''} 
                              ${selected === choice ? answer : ''}
                              ${answer === 'wrong' && choice === questionNbs[round] ? 'correct_blinking' : ''}
                           `}
                           text={db[choice][lang]}
                           onClick={() => handleCardClick(choice)}
                           key={i}
                        />
                     )}
                  </div>
               </section>

            </section>
         }

         {/* ----- Game Mode "MEANING TO KANJI" ----- */}
         {(meaningToKanji
            && lang
            && level
            && choices.length
            && round < totalRounds) &&

            <section
               className="meaning_to_kanji_section"
               key={round}
            >

               {showInfoBar && <InfoBar />}

               <section className="card_section">
                  <div className="question_ctn">
                     <p>{db[questionNbs[round]][lang]}</p>
                  </div>

                  <div className="choices_ctn">
                     {choices.map((choice, i) =>
                        <Card
                           type="kanji"
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