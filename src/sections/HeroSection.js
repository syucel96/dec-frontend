import React,{useState,useEffect,useMemo} from 'react';

function HeroSection() {
    const [windowDims, setDims] = useState({'dim': 'h', 'val':window.innerHeight});
    const setWDims = () => {
        if(window.innerWidth / window.innerHeight > 7/5) {
            setDims({'dim': 'w', 'val':window.innerWidth});
        } else {
            setDims({'dim': 'h', 'val':window.innerHeight});
        }
    }

    const cloudMemo = useMemo(() => `https://res.cloudinary.com/ds3agr3h9/image/upload/c_scale,${windowDims.dim}_${windowDims.val}/v1618409943/betelgeuse/samuel-scalzo-xyuYk9oLA8I-unsplash_b06vzv.jpg`, [windowDims]);
    useEffect(() => {
        window.addEventListener('resize', setWDims);
        return () => {
            window.removeEventListener('resize', setWDims);
        }
    }, [])
    return (
        <div className='hero-container'>
            <div className="hero-image-wrapper">
                <img src={cloudMemo} alt="bg" className="hero-image"/>
            </div>
            <div className="hero-content">
                <img src='https://res.cloudinary.com/ds3agr3h9/image/upload/c_scale,w_478/v1618387506/betelgeuse/LOGO-COMPLETO_BAGLIORE_BIANCO_wiwqpk.png' alt="Digital Eyes Capital" className="hero-logo-name"/>
                <h1 className="hero-title-top">Blockchain-Native</h1>
                <h2 className="hero-title-bottom">Investment Firm</h2>
            </div>
        </div>
    );
}

export default HeroSection;
