import loading from './loading.gif'
import React from 'react';
const Spinner=()=> {
        return (
            <div className='text-center my-2' >
                <img src={loading} alt="loading" style={{height:"35px",width:"35px"}} />
            </div>
        )
}
export default Spinner