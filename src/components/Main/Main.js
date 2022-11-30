import React , {Component } from 'react';
import './Main.css';
import LeafletMap from '../Leaflet-Map/Leaflet-Map';
import Spinner from '../Spinner/Spinner';
import CustomTooltip from '../CustomTooltip/CustomTooltip';
import {callWeatherAPIforCurrentWeather , 
        getCurrentLocation , 
        callWeatherAPIforWeatherForecast} from '../../services/services'

import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

import { Card , Space , Layout , Col, Row , Statistic} from 'antd';


const { Header, Footer, Content } = Layout;


class Main extends Component{


  constructor(props) {
    super(props);
    this.state = { currentWeatherApiRes  : null ,
                    lat : null , 
                    long : null , 
                    forecastWeatherApiRes : null,
                    chartsData : null };
    this.spinner = true;
  }

  componentDidMount(){
    
    getCurrentLocation()
    .then((resp)=>{
      // console.log("Inside Main.js " + res )
      callWeatherAPIforCurrentWeather(resp.lat, resp.long)
      .then(res1 =>{
        this.setState((state) => ({
                currentWeatherApiRes: res1,
                lat: resp.lat,
                long: resp.long,
                forecastWeatherApiRes : state.forecastWeatherApiRes,
                chartsData : state.chartsData
              }));
         
      })

      callWeatherAPIforWeatherForecast(resp.lat, resp.long)
      .then(res2 =>{
        console.log(res2)
        this.setState((state) => ({
                currentWeatherApiRes: state.currentWeatherApiRes,
                lat: resp.lat,
                long: resp.long,
                forecastWeatherApiRes : res2,
                chartsData : state.chartsData
              }));

        this.processForecastData(res2);
        
      })
    })
    .finally(()=>{
      this.spinner = false
    })

  }
  
  processForecastData(resp){
    let list = [];

     resp.data.list.forEach((res)=>{
      if(list.length===0 || list[list.length - 1].date !== res.dt_txt.split(" ")[0]  ){
          let newObj = {
            date : res.dt_txt.split(" ")[0],
            temp_max : res.main.temp_max,
            temp_min : res.main.temp_min,
            Min : res.main.temp_min,
            Max : res.main.temp_max,

          }
          list.push(newObj);
      }
      else{
        let oldObj = list.pop();
        if(oldObj.temp_max < res.main.temp_max){
          oldObj.temp_max = res.main.temp_max;
          oldObj.Max = res.main.temp_max;
        }
        if(oldObj.temp_min > res.main.temp_min){
          oldObj.temp_min = res.main.temp_min
          oldObj.Min = res.main.temp_min
        }

        list.push(oldObj);
      }
    })

    let min = list[0].temp_min;
    let max = list[0].temp_max;

    list.forEach(data =>{
      min = Math.min(min , data.temp_min , data.temp_max)
      max = Math.max(max , data.temp_min , data.temp_max)
    })

    list.forEach(data=>{
      data.Min  = (data.Min  - min ) / (max - min)
      data.Max  = (data.Max  - min ) / (max - min)
    })

    this.setState((state) => ({
      currentWeatherApiRes: state.currentWeatherApiRes,
      lat: state.lat,
      long: state.long,
      forecastWeatherApiRes : state,
      chartsData : list
    }));

  } 

  handleClickEventData = (latitude,longitude) => {
    callWeatherAPIforCurrentWeather(latitude,longitude)
      .then(res1 =>{
        this.setState((state) => ({
                currentWeatherApiRes: res1,
                lat: latitude,
                long: longitude,
                forecastWeatherApiRes : state.forecastWeatherApiRes,
                chartsData : state.chartsData
              }));
            
      })

      callWeatherAPIforWeatherForecast(latitude,longitude)
      .then(res2 =>{
        console.log(res2)
        this.setState((state) => ({
                currentWeatherApiRes: state.currentWeatherApiRes,
                lat: latitude,
                long: longitude,
                forecastWeatherApiRes : res2,
                chartsData : state.chartsData
              }));

        this.processForecastData(res2);
        
      })

      setTimeout(()=>{
        window.scrollTo(0, 0);
      }, 500)
      
  }



  render(){
    return ( 
      this.spinner ? 
      <Spinner/>
              : 
      <Layout>
        <Header style={{ textAlign: 'center' , color:'white', fontSize : '40px', position: 'sticky', top: 0, zIndex: 1, width: '100%'}} > 
            Weather App
        </Header>
        <Content style={{padding:'2%'}}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Card hoverable size="small" title="Current Selected Location" style={{ minWidth: '300px'  }}>
                <Row style={{alignContent:'center' , justifyContent: 'space-between' , alignItems:'center'}}>
                  <Col span ={12}  style={{minWidth:'75px' ,textAlign:'center'}}> 
                    Latitude : {this.state.lat}
                  </Col>
                  <Col span ={12} style={{minWidth:'75px' ,textAlign:'center'}}> 
                    longitude : {this.state.long} 
                  </Col>
                </Row>
              </Card>
            <Card hoverable style={{ minWidth: '300px' }}>
              <Row style={{alignContent:'center' , justifyContent: 'space-between' , alignItems:'center'}}>
                <Col span={6} style={{minWidth:'100px'}} > 
                <Statistic title="Current Weather" value={this.state.currentWeatherApiRes.data.weather[0].description} prefix={
                      React.createElement(
                        "img",
                        {src:`http://openweathermap.org/img/wn/${this.state.currentWeatherApiRes.data.weather[0].icon}.png`},
                        null
                      )
                  } />
                 </Col>                
                <Col span={2} offset={1} style={{minWidth:'75px'}}> 
                  <Statistic title="Current Temperature" value={this.state.currentWeatherApiRes.data.main.temp} />
                </Col>
                <Col span={2} offset={1} style={{minWidth:'75px'}}> 
                  <Statistic title="Feels Like" value={this.state.currentWeatherApiRes.data.main.feels_like} />
                </Col>
                <Col span={2} offset={1} style={{minWidth:'75px'}}> 
                  <Statistic title="Maximum Temperature" value={this.state.currentWeatherApiRes.data.main.temp_max} />
                </Col>
                <Col span={2} offset={1} style={{minWidth:'75px'}}> 
                  <Statistic title="Minimum Temperature" value={this.state.currentWeatherApiRes.data.main.temp_min} />
                </Col>
                <Col span={2} offset={1} style={{minWidth:'75px'}}> 
                  <Statistic title="Humidity %" value={this.state.currentWeatherApiRes.data.main.humidity} />
                </Col>
                <Col span={2} offset={1} style={{minWidth:'75px'}}> 
                  <Statistic title="Wind Speed m/s" value={this.state.currentWeatherApiRes.data.wind.speed} />
                </Col>      
              </Row>
                            
            </Card>
  
            <Card hoverable size="small" title="Weather forecast for 5 days" style={{ minWidth: '300px' }}>
              <Row>
                <Col span ={24}> 
                  <ResponsiveContainer height={'100%'} width={'100%'} minHeight={200} minWidth={200}>
                    <AreaChart   data={this.state.chartsData} minWidth={200} width={700} height={150} stackOffset='wiggle'  >
                        <CartesianGrid strokeDasharray="3 3" />
                        {/* <XAxis dataKey="date" /> */}
                        {/* <YAxis /> */}
                        <Tooltip content={<CustomTooltip />}/>
                        <Legend verticalAlign="top" height={36} />
                        <Area type="number" dataKey="Max" stroke="#8884d8" fill="#8884d8" />
                        <Area type="number" dataKey="Min" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                  </ResponsiveContainer>
                </Col>
              </Row>
            </Card>
            <Card hoverable size="small" title="Find Weather for another location" style={{ minWidth: '300px' }}>
              <LeafletMap handleClickEventData={this.handleClickEventData} lat={this.state.lat} long={this.state.long}/>
            </Card>
  
          </Space>
        </Content>
  
        <Footer 
        style={{ 
              borderTop: '1px solid #e8e8e8',
              left: 0,
              bottom: 0,
              width: '100%',
              textAlign: 'center'}}
              >
                **All Temperature Units are in Degree Fahrenheit**
        </Footer>
      </Layout>
    )

  }


} 

Main.propTypes = {};

Main.defaultProps = {};

export default Main;
