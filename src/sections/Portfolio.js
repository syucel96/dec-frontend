import React, {forwardRef, useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useLocation} from 'react-router-dom';
import Loader from '../components/Loader';
import lhs from '../media/light-blue-left-bg.png';
import rhs from '../media/light-blue-right-bg.png';

function Portfolio({props}, ref) {
    const [items, setItems] = useState([]);

    let location = useLocation();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                let res = await axios.get(`${process.env.REACT_APP_API_URL}/api/portfolio`);
                setItems(res.data);
            } catch (err) {
                console.log('Could not fetch Portfolio Items...');
            }
        }
        fetchItems();
    }, []);

    const getItems = () => {
        let list = [];
        let key = 0;

        items.map(PortfolioItem => {
            let split = PortfolioItem.icon.split('/upload/');
            const cloudinarySrc = `${process.env.REACT_APP_CLOUDINARY_URL}/${split[0]}/upload/c_scale,h_100,f_auto/${split[1]}`
            key += 1;
            return list.push(
                <li key={key} className='portfolio-card'>
                    <Link to={{
                        pathname:`/portfolio/${PortfolioItem.slug}`,
                        state:{background: location}
                    }}>
                        <img
                            className='portfolio-card-image'
                            src={cloudinarySrc}
                            alt={PortfolioItem.symbol}
                        />
                    </Link>
                    <h4 className="portfolio-card-name">{PortfolioItem.name}</h4>
                </li>
            );
        });

        return list;
    }

    return (items.length === 0 ? <Loader /> : (
        <div ref={ref}>
            <div className="portfolio-section">
                <div className="portfolio-left-bg-wrapper">
                    <img src={lhs} alt="lb" className="portfolio-left-bg"/>
                </div>
                <div className='portfolio-container'>
                    <h1 className="portfolio-header">OUR PORTFOLIO</h1>
                    <ul className='portfolio-items'>
                            {getItems()}
                    </ul>
                </div>
                <div className="portfolio-right-bg-wrapper">
                    <img src={rhs} alt="lb" className="portfolio-right-bg"/>
                </div>
            </div>
        </div>
    ));
}

export default forwardRef(Portfolio);
