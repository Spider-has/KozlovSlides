import { ButtonsAll } from '../components/button/Button';
import { MainMenuButtons } from '../components/button/MainMenuButtons';
import { Title } from '../components/presentationSettingsBar/PresentationSettingsBar';

const FileSettingsPanel = () => {
    return (
        <div className = "docs-bars">
            <ButtonsAll />
            <MainMenuButtons />
        </div>
    );
};

const MainPage = () => {
    return (
        <div>
            <Title />
            <FileSettingsPanel />
        </div>
    );
};

export { MainPage };
