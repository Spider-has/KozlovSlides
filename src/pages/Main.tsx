import { AllButtons } from '../components/button/Button';
import { MainMenuButtons } from '../components/button/MainMenuButtons';
import { Title } from '../components/presentationSettingsBar/PresentationSettingsBar';

const FileSettingsPanel = () => {
    return (
        <div>
            <AllButtons />
        </div>
    );
};

const MainPage = () => {
    return (
        <div>
            <Title />
            <MainMenuButtons />
            <FileSettingsPanel />
        </div>
    );
};

export { MainPage };
