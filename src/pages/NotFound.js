import React,{useState,useEffect,useMemo} from 'react';
import { Link } from 'react-router-dom';
import '../style/NotFound.css';

function NotFound() {
    const [windowDims, setDims] = useState({'dim': 'h', 'val':window.innerHeight});
    const setWDims = () => {
        if(window.innerWidth / window.innerHeight > 7/5) {
            setDims({'dim': 'w', 'val':window.innerWidth});
        } else {
            setDims({'dim': 'h', 'val':window.innerHeight});
        }
    }

    const cloudMemo = useMemo(() => `https://res.cloudinary.com/ds3agr3h9/image/upload/c_scale,${windowDims.dim}_${windowDims.val}/v1618409943/betelgeuse/notFound_tk6wqs.png`, [windowDims]);
    useEffect(() => {
        window.addEventListener('resize', setWDims);
        return () => {
            window.removeEventListener('resize', setWDims);
        }
    }, [])
    return (
        <div className='not-found-container'>
            <div className="not-found-image-wrapper">
                <img src={cloudMemo} alt="404" className="not-found-image"/>
            </div>
            <div className="not-found-button-wrapper">
                <Link to='/' className='btn btn--large btn--primary btn-home'>Home</Link>
            </div>
        </div>
    )
}

export default NotFound;

