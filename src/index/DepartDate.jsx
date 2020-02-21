import React,{useMemo} from 'react';
import {h0} from './../components/fp'
import dayjs from 'dayjs';
import './DepartDate.css';
const DepartDate = (props) => {
    const {
        time,
        onClick
    } = props
    const h0OfDepart = h0(time)
    const departDate = new Date(h0OfDepart)
    const departDateString  = useMemo(()=>{
        return dayjs(time).format('YYYY-MM-DD')
    },[h0OfDepart])
    const isToday = h0OfDepart === h0()
    const weekString = '周'+ [ '日', '一', '二', '三', '四', '五', '六' ][departDate.getDay()]
    + (isToday ? '(今天)' : '');
    return (
        <div className="depart-date" onClick={onClick}>
            <input type="hidden" name="date" value={departDateString} />
            {departDateString} <span className="depart-week">{weekString}</span>
        </div>
    );
}

export default DepartDate;
