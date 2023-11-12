import { Button } from '../components/button/Button';
import { Title } from '../components/presentationSettingsBar/PresentationSettingsBar';
const FileSettingsPanel = () => {
    return (
        <div>
            <Title />
            <Button />
        </div>
    );
};

const MainPage = () => {
    return (
        <div>
            <FileSettingsPanel />
        </div>
    );
};

export { MainPage };
