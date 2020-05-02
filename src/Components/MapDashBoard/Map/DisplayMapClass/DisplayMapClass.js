// src/DisplayMapClass.js
import * as React from 'react';
import data from '../../../../data.json';
import './DisplayMapClass.scss';


export class DisplayMapClass extends React.Component {
  mapRef = React.createRef();
  behavior = null;

  state = {
    // The map instance to use during cleanup
    map: null,
    platform: null,
    mapProps: { //mapProps is not currently being used
        center: {
            lat: this.props.lat,
            lng: this.props.lng,
        },
        zoom: this.props.zoom,
        theme: this.props.theme,
        style: this.props.style,
    }
  };

  changeTheme(theme, style) {
    if(!(this.state.platform || this.state.map))
        return;

    var tiles = this.state.platform.getMapTileService({'type': 'base'});
    var layer = tiles.createTileLayer(
        'maptile',
        theme,
        256,
        'png',
    );
    this.state.map.setBaseLayer(layer);
}

  componentDidMount() {

    const H = window.H;
    const platform = new H.service.Platform({
        apikey: this.props.apiKey
    });

    const defaultLayers = platform.createDefaultLayers();

    // Create an instance of the map
    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        // This map is centered over Europe
        center: { lat: this.props.lat, lng: this.props.lng },
        zoom: this.props.zoom,
        pixelRatio: window.devicePixelRatio || 1
      }
    );

    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    // This variable is unused and is present for explanatory purposes
    this.behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components to allow the user to interact with them
    // This variable is unused
    var ui = H.ui.UI.createDefault(map, defaultLayers);



    // add customer marker
    var LocationOfMarker = { lat: this.props.lat, lng: this.props.lng };
    // Create a marker icon from an image URL:
    // var icon = new H.map.Icon('path of marker img');

    // Create a marker using the previously instantiated icon:
    var marker = new H.map.Marker(LocationOfMarker, {}); // { icon: icon}
      
    // Add the marker to the map:
    //map.addObject(marker);



    //heatmap
    // Create a provider for a semi-transparent heat map:
    var heatmapProvider = new H.data.heatmap.Provider({
      colors: new H.data.heatmap.Colors({
      '0': 'rgba(255, 255, 255, 0.0)', //transparent white
      '0.2': 'yellow',
      '0.5': 'red',
      '1': 'red'
      }, true),
      opacity: 1.0,
      // Paint assumed values in regions where no data is available
      assumeValues: true
    });

    var group = new H.map.Group();

    console.log("hello");
		let locationArray = [];
    let location = { lat: "", lng: "" }
    var newdata = JSON.stringify(data);
    var formattedTime;
		JSON.parse(newdata, function (key, value) {
			if (key === "latitudeE7" || key === "latE7") {
				const decimalVal = parseInt(value) * 0.0000001;
				location.lat = decimalVal + "";
			}
			if (key === "longitudeE7" || key === "lngE7") {
				const decimalVal = parseInt(value) * 0.0000001;
				location.lng = decimalVal + ""; 
        // console.log("lat: " + location.lat + ", lng: " +location.lng );
      }
      if (key == "startTimestampMs") {
        const unixTimestamp = value; 
  
            // convert to milliseconds 
            // and then create a new Date object 
            var dateObj = new Date(unixTimestamp * 1000); 
  
            // Get hours from the timestamp 
            var hours = dateObj.getUTCHours(); 
  
            // Get minutes part from the timestamp 
            var minutes = dateObj.getUTCMinutes(); 
  
            // Get seconds part from the timestamp 
            var seconds = dateObj.getUTCSeconds(); 
  
            formattedTime = dateObj.toDateString() + hours.toString().padStart(2, '0') + ':' + 
                minutes.toString().padStart(2, '0') + ':' + 
                seconds.toString().padStart(2, '0'); 
      }
      if (key == "address") {
        var marker = new H.map.Marker({lat: location.lat,lng: location.lng}, {}); // { icon: icon}

        formattedTime = formattedTime+value;
        marker.setData(formattedTime);
        map.addObject(marker);
        map.setCenter(location);
        group.addObject(marker);

				locationArray.push({ lat: location.lat, lng: location.lng, value: 1 });
        heatmapProvider.addData(locationArray);
        location = { lat: "", lng: "" }

      }
    });

     // add 'tap' event listener, that opens info bubble, to the group
    group.addEventListener('tap', function (evt) {
    // event target is the marker itself, group is a parent event target
    // for all objects that it contains
    var bubble =  new H.ui.InfoBubble(evt.target.getGeometry(), {
      // read custom data
      content: evt.target.getData()
    });
    // show info bubble
    ui.addBubble(bubble);
  }, false);
   map.addObject(group);

    console.log(locationArray);



    // // Add the data:
    // heatmapProvider.addData([
    //   {lat: this.props.lat, lng: this.props.lng, value: 1},
    //   {lat: this.props.lat + 0.004, lng: this.props.lng + 0.005, value: 1},
    //   {lat: this.props.lat - 0.005, lng: this.props.lng - 0.002, value: 1},
    //   {lat: this.props.lat + 0.003, lng: this.props.lng - 0.004, value: 1},
    //   {lat: this.props.lat + 0.005, lng: this.props.lng - 0.007, value: 1}
    // ]);

    if(this.props && this.props.usrLocationData){
      console.log(this.props.usrLocationData);
      heatmapProvider.addData(this.props.usrLocationData);
    }

    // Add a layer for the heatmap provider to the map:
    map.addLayer(new H.map.layer.TileLayer(heatmapProvider));





    this.setState({ map: map, platform: platform });
  }

  shouldComponentUpdate(props, state) {
    this.changeTheme(props.theme, props.style);
    return false;
}

  componentWillUnmount() {
    // Cleanup after the map to avoid memory leaks when this component exits the page
    this.state.map && this.state.map.dispose();
  }

  render() {
    return (
      // Set a height on the map so it will display
      <div ref={this.mapRef} style={{ height: "700px" }} />
    );
  }
}
