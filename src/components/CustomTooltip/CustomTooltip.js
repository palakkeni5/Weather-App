import React from 'react';
import PropTypes from 'prop-types';
import './CustomTooltip.css';

const CustomTooltip = ({ active, payload, label }) =>{
  if (active && payload && payload.length) {
    return (
    
      <div className="CustomTooltip">
        Date : {payload[0].payload.date} <br/>
        Max_Temp : {payload[0].payload.temp_max}<br/>
        Min_Temp : {payload[0].payload.temp_min}
      </div>
    );
  }
} 

CustomTooltip.propTypes = {};

CustomTooltip.defaultProps = {};

export default CustomTooltip;
