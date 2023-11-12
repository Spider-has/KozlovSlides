import { Button } from '../components/button/Button';
import { Title } from '../components/presentationSettingsBar/PresentationSettingsBar';

const FileSettingsPanel = () => {
    return (
        <div>
            <Button />
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
