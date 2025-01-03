import './Settings.scss';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setShowInfoBar } from '../../store/slices/settings';
import SwitchBtn from '../../components/buttons/SwitchBtn/Index';

export default function Settings() {
   const { t } = useTranslation();
   const trPath = "pages.settings"; // translation path

   const {
      showInfoBar,
   } = useAppSelector((state) => state.settings);

   const dispatch = useAppDispatch();

   return (
      <main className="settings">
         <h1>{t(`${trPath}.title`)}</h1>

         <div className="settings_ctn">
            <label>{t(`${trPath}.showInfoBar`)}</label>
            <SwitchBtn
               state={showInfoBar}
               onClick={() => dispatch(setShowInfoBar(!showInfoBar))}
            />
         </div>
      </main>
   )
}