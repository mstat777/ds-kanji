import './About.scss';
import { useEffect } from 'react';

export default function About() {

   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   return (
      <main className="about">
         <h1>about</h1>

         <section className="info">
            <div>
               <span>Game name: </span>
               <span>DS Kanji Game</span>
            </div>

            <div>
               <span>Description: </span>
               <span>Test your Japanese Kanji knowledge</span>
            </div>

            <div>
               <span>Creator: </span>
               <span>Dimitar Statev</span>
            </div>

            <div>
               <span>Created: </span>
               <span>December 2024</span>
            </div>
         </section>
      </main>
   )
}