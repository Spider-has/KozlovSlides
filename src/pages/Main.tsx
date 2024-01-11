import { Title } from '../components/presentationSettingsBar/PresentationSettingsBar';
import { SlidesArea } from '../components/slidesArea/SlidesArea';
import styles from './Main.module.css';

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
        <div className={styles.mainContainer}>
            <Title />
            {/*<FileSettingsPanel />*/}
            <SlidesArea />
        </div>
    );
};

export { MainPage };
