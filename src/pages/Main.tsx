import { useEffect } from 'react';
//import { AllButtons } from '../components/button/Button';
import { Title } from '../components/presentationSettingsBar/PresentationSettingsBar';
import { SlidesArea } from '../components/slidesArea/SlidesArea';
import { useAppActions } from '../store/hooks';
import './Main.css';

// const FileSettingsPanel = () => {
//     return (
//         <div>
//             <AllButtons />
//         </div>
//     );
// };

const MainPage = () => {
    const { createChangeShiftModeAction } = useAppActions();
    useEffect(() => {
        document.addEventListener('keydown', event => {
            if (event.key == 'Shift') {
                createChangeShiftModeAction();
                console.log('shift');
            }
        });
    }, []);
    return (
        <div className="main-container">
            <Title />
            {/*<FileSettingsPanel />*/}
        </div>
    );
};

export { MainPage };
