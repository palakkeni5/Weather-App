import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMapEvent } from 'react-leaflet/hooks'
import "leaflet/dist/leaflet.css";
import icon from "./constants";
import * as ReactDOM from 'react-dom';


function HandleMapClickEvent(props) {
  let  event = null;  
  const map = useMapEvent('click', (event) => {
    props.getClickEventData({lat:event.latlng.lat ,long:event.latlng.lng})
  })
  return null
}

class LeafletMap extends Component {

  constructor(props) {
    super(props);
    this.state = { map: null, lat: props.lat, long: props.long };
  }


  getClickEventData = (eventData) => {
    //console.log(eventData)
    this.setState((state) => ({
                map: state.map,
                lat: eventData.lat,
                long: eventData.long
              }));
    this.props.handleClickEventData(eventData.lat ,  eventData.long )
  }



  render() {
    const DEFAULT_LATITUDE = 32.313268;
    const DEFAULT_LONGITUDE = 35.022895;
    const latitude = this.props.coords
      ? this.props.coords.latitude
      : DEFAULT_LATITUDE;
    const longitude = this.props.coords
      ? this.props.coords.latitude
      : DEFAULT_LONGITUDE;

    return (
      <MapContainer
        className="leaflet-map"
        center={[this.state.lat, this.state.long]}
        zoom={7}
        scrollWheelZoom={true}
        style={{ height: "70vh" }}
        whenReady={(map) => this.setState({ map })}
      >
        <HandleMapClickEvent getClickEventData = {this.getClickEventData}/>
        <TileLayer 
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[this.state.lat, this.state.long]} icon={icon} 
                draggable={false}>
        </Marker>
      </MapContainer>
    );
  }
}

export default LeafletMap;
