import Header from '../Components/Header';
import MainPageImage from '../Components/MainPageImage';
import '../Styles/font.css';
import '../index.css';

// Website inspiration from https://www.landing.love/sites/mikkisindhunata/

function Main() {
    return(
        <div id="main" style={{backgroundColor: 'black', overflow: 'hidden', position: 'relative'}}>
            <div id="main-background-image" style={{zIndex: 1, position: 'absolute', height: '100vh', width: '100vw', overflow: 'hidden'}}>
                <MainPageImage/>
            </div>
            <div>
                <div id="main-content" style={{zIndex: 2, position: 'relative', backgroundColor: 'black', height: '100vh', width: '100vw', opacity: 0.5}} />
                <Header />
                <span style={{zIndex: 4, position: 'absolute', top:'200px', color:'white', backgroundColor: 'rgba(0, 0, 0, 0.4)', padding:'5% 4.3% 5% 4.5%' , minHeight:'550px', marginLeft:'9.5%', fontSize:'15px', maxWidth: '400px'}}>
                    In the heart of the bustling city, where the skyscrapers kissed the sky and the streets buzzed with life, there was a small, unassuming café tucked away in a quiet alley. The aroma of freshly brewed coffee wafted through the air, drawing in passersby with its irresistible allure. Inside, the walls were adorned with eclectic art, and the soft hum of conversation created a cozy atmosphere. Patrons sipped their drinks, lost in thought or deep in discussion, as the world outside rushed by. It was a haven of tranquility amidst the chaos, a place where time seemed to slow down, allowing its visitors a moment of respite from the frenetic pace of urban life.
                </span>
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
                    <span className="rectangle" style={{ transform: 'rotate(45deg)', position: 'absolute', top: '450px' }}></span>
                    <span className="rectangle" style={{ transform: 'rotate(315deg)', left: '180px', position: 'absolute', top: '450px' }}></span>
                </div>
                <span>
                    <span className="rectangle" style={{ transform: 'rotate(45deg)', backgroundColor: 'rgba(255, 255, 255, 0.7)', position: 'absolute', top: '550px' }}></span>
                    <span className="rectangle" style={{ transform: 'rotate(315deg)', left: '180px', backgroundColor: 'rgba(255, 255, 255, 0.7)', position: 'absolute', top: '550px' }}></span>
                </span>
                <span>
                    <span className="rectangle" style={{ transform: 'rotate(45deg)', backgroundColor: 'rgba(255, 255, 255, 1)', position: 'absolute', top: '650px' }}></span>
                    <span className="rectangle" style={{ transform: 'rotate(315deg)', left: '180px', backgroundColor: 'rgba(255, 255, 255, 1)', position: 'absolute', top: '650px' }}></span>
                </span>
            </div>
            <div id="main-content-center" style={{zIndex: 2, position: 'relative', height: '100vh', width: '100vw', opacity: 0.8, bottom: '150px', marginBottom: '-150px'}} />
        </div>
    )
}

export default Main;