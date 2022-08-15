import React,{useState,useEffect,createRef,useMemo} from 'react';
import axios from 'axios';
import {
    XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Line, LineChart
  } from 'recharts';
import Loader from './Loader';

function CoinGraph({id,pagination}) {
    const [data,setData] = useState([]);
    const [days, setDays] = useState('24h');
    const [price,setPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const xAxisRef = createRef();
    const priceMemo = useMemo(()=>price,[price]);

    useEffect(() => {
        const fetchData = async(startDate,interval) => {
            const headers = {"x-messari-api-key":process.env.REACT_APP_MESSARI_API_KEY};
            try{
                let res = await axios.get(`${process.env.REACT_APP_MESSARI_ASSET_API_URL}/${id}/metrics/price/time-series?after=${startDate}&interval=${interval}&columns=close`,{headers:headers});
                return res.data.data.values;
            }catch(err) {
                console.log(`Unable to fetch market data for ${id} from Messari...`);
                console.log(err);
                return null;
            }
        }
        const fetchPrice = async() => {
            try{
                let res = await axios.get(`${process.env.REACT_APP_MESSARI_ASSET_API_URL}/${id}/metrics/market-data?fields=market_data/price_usd`);
                setPrice(res.data.data.market_data.price_usd);
            } catch(err) {
                console.log(`Unable to fetch price for ${id} from Messari...`);
                console.log(err);
            }
        }
        const fetchAllData = async() => {
            let day = new Date();
            day.setDate(day.getDate()-1);
            let startStr = `${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()}`;
            let dailyData = await fetchData(startStr, '15m');
            day.setDate(day.getDate()-6);
            startStr = `${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()}`;
            let weeklyData = await fetchData(startStr, '1h');
            day.setDate(day.getDate()-83);
            startStr = `${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()}`;
            let quarterly = await fetchData(startStr, '1d');
            /* let sum = quarterly.reduce(function(a, b){
                return a.map(function(v,i){
                    return v+b[i];
                });
            });
            let avg = sum[1] / quarterly.length;
            console.log(avg);
            for(var j = 0; j < quarterly.length; j++) {
                if(Math.abs(quarterly[j][1] - avg) > 3*avg) {
                    quarterly[j] = [quarterly[j][0], avg];
                }
            } */
            let chartData = {'24h':[],'7d':[],'30d':[],'90d':[]};
            for(let i=0;i<dailyData.length;i++) {
                const newRow = {};
                newRow.date = dailyData[i][0];
                newRow.Price = dailyData[i][1];
                chartData['24h'].push(newRow);
            }
            for(let i=0;i<weeklyData.length;i++) {
                const newRow = {};
                newRow.date = weeklyData[i][0];
                newRow.Price = weeklyData[i][1];
                chartData['7d'].push(newRow);
            }
            for(let i=0;i<quarterly.length;i++) {
                const newRow = {};
                newRow.date = quarterly[i][0];
                newRow.Price = quarterly[i][1];
                chartData['90d'].push(newRow);
                if(i > quarterly.length-31) {
                    chartData['30d'].push(newRow);
                }
            }
            setData(chartData);
            setLoading(false);
        }
        fetchAllData();
        fetchPrice();
        const callInterval = setInterval(() => {
            fetchPrice();
        },5000);
        return () => {
            clearInterval(callInterval);
            setData([]);
            setDays('24h');
            setPrice(0);
        }
    }, [id]);

    const formatXAxis = (tickItem) => {
        let d = new Date(tickItem);
        return `${appendZero(d.getDate())}/${appendZero(d.getMonth() + 1)}/${d.getFullYear()}`;
    }

    const xDomain = () => {
        let currentData = data[days];
        let minVal = currentData[0].Price;
        let maxVal = currentData[0].Price;
        for(var j=1;j<currentData.length;j++) {
            maxVal = maxVal < currentData[j].Price ? currentData[j].Price : maxVal;
            minVal = minVal > currentData[j].Price ? currentData[j].Price : minVal;
        }
        let interval = (maxVal - minVal) / 10;
        if(interval > 100) {
            minVal = minVal - interval > 0 ? Math.floor((minVal - interval) / 100)*100 : 0;
            maxVal = Math.ceil((maxVal + interval) / 100) * 100;
        } else if(interval > 10) {
            minVal = minVal - interval > 0 ? Math.floor((minVal - interval) / 10)*10 : 0;
            maxVal = Math.ceil((maxVal + interval) / 10) * 10;
        } else if(interval > 1) {
            minVal = minVal - interval > 0 ? Math.floor(minVal - interval) : 0;
            maxVal = Math.ceil(maxVal + interval);
        } else {
            minVal = minVal - interval > 0 ? Math.floor((minVal - interval) * 10)/10 : 0;
            maxVal = Math.ceil((maxVal + interval) * 10) / 10;
        }
        return [minVal,maxVal];
    }

    const formatTooltip = (tickItem) => {
        let d = new Date(tickItem);
        return `Date: ${appendZero(d.getDate())}/${appendZero(d.getMonth() + 1)}/${d.getFullYear()} ${appendZero(d.getHours())}:${appendZero(d.getMinutes())}:${appendZero(d.getSeconds())}`;
    }

    const appendZero = (item) => {
        return item < 10 ? '0' + item : item;
    }

    const showPrice = () => {
        let currentData = data[days];
        if(data.length === 0)
            return null;
        let change = ((priceMemo - currentData[0].Price)/currentData[0].Price)*100;
        let className = '';
        let symbol = '';
        if(change < 0) {
            className = 'graph-price price-minus';
            symbol = '';
        } else {
            className = 'graph-price price-plus';
            symbol = '+';
        }
        let currentPrice = `${(Math.round(priceMemo * 100)/100)} $ (${symbol}${Math.round(change* 100)/100}%)`;
        return <h1 className={className}>{currentPrice}</h1>
    }
    if(loading)
        return <Loader />

    return (
        <div className="graph-container">
            <div className="price-div">
                {showPrice()}
            </div>
            <ResponsiveContainer width='98%' aspect={2}>
                <LineChart margin={{top: 5, right: 5, left: 5, bottom: 5}} data={data[days]}>
                    <CartesianGrid stroke="#6D789C" opacity={0.2}/>
                    <XAxis ref={xAxisRef} dataKey="date" type="number" domain={['dataMin', 'dataMax']} tickFormatter={formatXAxis} stroke="#C5C6C7"/>
                    <YAxis yAxisId={0} type="number" dataKey="Price" domain={xDomain()} stroke="#45A29E" />
                    <Tooltip cursor={{ stroke: '#66FCF1'}} viewBox={{'background-color':'#ffffff'}} labelFormatter={formatTooltip}/>
                    <Line yAxisId={0} type="monotone" dataKey="Price" stackId="1" stroke="#71b1c7" dot={false} />
                </LineChart>
            </ResponsiveContainer>
            <div className="graph-selectors">
                <div className="graph-radio-group" onChange={e=>{setDays(e.target.value)}}>
                    <span>
                        <input type="radio" id="radio-1" value={'24h'} name="days" defaultChecked/>
                        <label htmlFor="radio-1">24h</label>
                    </span>
                    <span>
                        <input type="radio" id="radio-7" value={'7d'} name="days" />
                        <label htmlFor="radio-7">7d</label>
                    </span>
                    <span>
                        <input type="radio" id="radio-30" value={'30d'} name="days" />
                        <label htmlFor="radio-30">30d</label>
                    </span>
                    <span>
                        <input type="radio" id="radio-90" value={'90d'} name="days" /> 
                        <label htmlFor="radio-90">90d</label>
                    </span>
                </div>
            </div>
        </div>
      );
}

export default CoinGraph
