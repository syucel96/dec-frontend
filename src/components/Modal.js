import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../style/Modal.css';
import axios from 'axios';
import CoinGraph from '../components/CoinGraph';
import Loader from './Loader';

function Modal() {
    let history = useHistory();
    let {id} = useParams();
  
    let back = e => {
      setLoaded(false);
      e.stopPropagation();
      history.goBack();
    };

    const [coin, setCoin] = useState({});
    const [pages, setPages] = useState(false);
    const [pageNum, setPageNum] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const paginate = () => {
      if(window.innerWidth*window.innerHeight < 1000000) {
          setPages(true);
      } else {
          setPages(false);
      }
  };

    useEffect(() => {
        const fetchCoin = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/portfolio/${id}`);
            setCoin(res.data);
            setLoaded(true);
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'relative';
            document.body.style.height = '100%';
        }
        fetchCoin();
        if(window.innerWidth*window.innerHeight < 980000) {
          setPages(true);
        } else {
          setPages(false);
        }
        return () => {
          document.body.style.overflow = 'unset';
          document.body.style.position = 'static';
          document.body.style.height = 'auto';
          window.removeEventListener('resize',paginate);
          setCoin({});
          setPages(false);
          setPageNum(false);
          setLoaded(false);
        };
    }, [id]);
    
    window.addEventListener('resize',paginate);
    if(!loaded) return <Loader />
    return (
      <div
        className='modal-wrapper'
        role="button"
        onClick={back}
      >
        <div
          className="modal"
          role="button"
          onClick={e => e.stopPropagation()}
        >
          <div className="modal-title">
            <h1 className="coin-name">{coin.name}</h1>
            <span className="modal-close" onClick={back}>X</span>
          </div>
          <div className={`modal-body ${pages ? 'paginated':''}`}>
            <button onClick={()=>setPageNum(!pageNum)} className={`btn-modal btn-left ${pages && 'btn-show'}`}>{'<'}</button>
            <div className={`meta-container ${pages && (!pageNum ? 'div-show' : 'div-hide') }`}>
              <p className="meta-desc">{coin.description}</p>
            </div>
            <div className={`coin-graph-modal ${pages && (pageNum ? 'div-show' : 'div-hide') }`}>
              <CoinGraph id={coin.messari_name} pagination={pages}/>
            </div>
            <button onClick={()=>{setPageNum(!pageNum)}} className={`btn-modal btn-right ${pages && 'btn-show'}`}>{'>'}</button>
          </div>
        </div>
      </div>
    );
  }

  export default Modal;