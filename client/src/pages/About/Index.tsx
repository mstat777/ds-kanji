import './About.scss';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export default function About() {
   const { t } = useTranslation();
   const trPath = "pages.about"; // translation path

   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   return (
      <main className="about">
         <h1>{t(`${trPath}.title`)}</h1>

         <section className="info">
            <div>
               <span>{t(`${trPath}.details.nameTitle`)}</span>
               <span>{t(`${trPath}.details.name`)}</span>
            </div>

            <div>
               <span>{t(`${trPath}.details.descriptionTitle`)}</span>
               <span>{t(`${trPath}.details.description`)}</span>
            </div>

            <div>
               <span>{t(`${trPath}.details.creatorTitle`)}</span>
               <span>{t(`${trPath}.details.creator`)}</span>
            </div>

            <div>
               <span>{t(`${trPath}.details.versionTitle`)}</span>
               <span>{t(`${trPath}.details.version`)}</span>
            </div>

            <div>
               <span>{t(`${trPath}.details.dateTitle`)}</span>
               <span>{t(`${trPath}.details.date`)}</span>
            </div>
         </section>
      </main>
   )
}