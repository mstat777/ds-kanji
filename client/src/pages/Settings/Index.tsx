import './Settings.scss';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setShowInfoBar } from '../../store/slices/settings';
import SwitchBtn from '../../components/buttons/SwitchBtn/Index';

export default function Settings() {
   const {
      showInfoBar,
   } = useAppSelector((state) => state.settings);

   const dispatch = useAppDispatch();

   return (
      <main className="settings">
         <h1>Settings</h1>

         <div className="settings_ctn">
            <label>Show Info Bar</label>
            <SwitchBtn
               state={showInfoBar}
               onClick={() => dispatch(setShowInfoBar(!showInfoBar))}
            />
         </div>
      </main>
   )
}