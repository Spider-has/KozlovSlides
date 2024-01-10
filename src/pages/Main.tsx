import { Title } from '../components/presentationSettingsBar/PresentationSettingsBar';
import { SlidesArea } from '../components/slidesArea/SlidesArea';
import './Main.css';

// const FileSettingsPanel = () => {
//     return (
//         <div>
//             <AllButtons />
//         </div>
//     );
// };

const MainPage = () => {
    console.log('rendered!');
    return (
        <div className="mainContainer">
            <Title />
            {/*<FileSettingsPanel />*/}
            <SlidesArea />
        </div>
    );
};

export { MainPage };
