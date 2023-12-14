import { useEffect } from 'react';
//import { AllButtons } from '../components/button/Button';
import { Title } from '../components/presentationSettingsBar/PresentationSettingsBar';
import { useAppActions } from '../store/hooks';
import './Main.css';
import { SlidesArea } from '../components/slidesArea/SlidesArea';

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
            <SlidesArea />
        </div>
    );
};

export { MainPage };
