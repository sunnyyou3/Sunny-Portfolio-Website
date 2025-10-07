import Header from '../Components/Header';
import MainPageImage from '../Components/MainPageImage';

// Website inspiration from https://www.landing.love/sites/mikkisindhunata/

function Main() {
    return(
        <div id="main" style={{backgroundColor: 'black', overflow: 'hidden', position: 'relative'}}>
            <div id="main-background-image" style={{zIndex: 1, position: 'absolute', height: '100vh', width: '100vw', overflow: 'hidden'}}>
                <MainPageImage/>
            </div>
            <div id="main-content" style={{zIndex: 2, position: 'relative', backgroundColor: 'black', height: '100vh', width: '100vw', opacity: 0.5}} />
                <Header />
            <div id="main-content-center" style={{zIndex: 2, position: 'relative', height: '100vh', width: '100vw', opacity: 0.8, bottom: '150px', marginBottom: '-150px'}} />
        </div>
    )
}

export default Main;