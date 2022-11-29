import React from 'react';
import './Spinner.css';
import {  Spin } from 'antd';


const Spinner = () => (
  <>
  <div style={{display : 'flex' , justifyContent : 'center' , alignItems: 'center' ,top :'0' , bottom:'0' , left: '0', right: '0' , position:'absolute'}}>
    <Spin size='large' delay={2000} />
  </div>
  
  </>
);



export default Spinner;
