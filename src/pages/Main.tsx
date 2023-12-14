import { AllButtons } from '../components/button/Button';
import { Title } from '../components/presentationSettingsBar/PresentationSettingsBar';
import { SlidesArea } from '../components/slidesArea/SlidesArea';
import './Main.css';

const FileSettingsPanel = () => {
    return (
        <div>
            <AllButtons />
        </div>
    );
};

const MainPage = () => {
    console.log('rendered!');
    return (
        <div className="main-container">
            <Title />
            <FileSettingsPanel />
            <SlidesArea />
        </div>
    );
};

export { MainPage };
