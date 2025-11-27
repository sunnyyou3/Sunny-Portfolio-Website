import { VRGameSubText, BuzzSubText} from '../assets/Text/text';
import ProjectSection from '../components/ProjectSection';
import VR_MainMenu from './../assets/Portfolio/Gif/VR_Menu.gif';
import VR_Setting from './../assets/Portfolio/Images/VR_Setting.png';
import VR_Tutorial from './../assets/Portfolio/Images/VR_Tutorial.png';
import VR_InGame from './../assets/Portfolio/Images/VR_InGame.jpg';
import Buzz_AdminConsole from './../assets/Portfolio/Images/Buzz_AdminConsole.png';
import Buzz_HomeScreen from './../assets/Portfolio/Images/Buzz_HomeScreen.jpg';
import Buzz_LoginScreen from './../assets/Portfolio/Images/Buzz_LoginScreen.jpg';

function Home() {
    return(
        <div>
            <ProjectSection images={[VR_MainMenu, VR_Setting, VR_Tutorial, VR_InGame]} title="VR App for Students with EBD" body={VRGameSubText} diagonalSide = "left"/>
            <ProjectSection images={[Buzz_LoginScreen, Buzz_HomeScreen, Buzz_AdminConsole]} title="Buzz" body={BuzzSubText} diagonalSide = "right"/>
            <ProjectSection images={{}} title="" body="" diagonalSide = "left"/>
            <ProjectSection images={{}} title="" body="" diagonalSide = "right"/>
        </div>
    )
}

export default Home;