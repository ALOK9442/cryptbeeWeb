import React from 'react';
import InvestTabNav from './invest_tab_nav';
import InvestTablAll from './invest_tab_all';
import { Outlet } from 'react-router-dom';


function Invest() {
    return (
        <div>
            <div className='flex flex-col items-center'>
                <InvestTabNav />
                <InvestTablAll />
                {Outlet}
            </div>
        </div>
    )
}

export default Invest;
