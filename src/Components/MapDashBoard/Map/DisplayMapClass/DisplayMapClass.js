// src/DisplayMapClass.js
import * as React from 'react';

export class DisplayMapClass extends React.Component {
  mapRef = React.createRef();
  behavior = null;
  ui = null;
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
    this.ui = H.ui.UI.createDefault(map, defaultLayers);



    // add customer marker
    var LocationOfMarker = { lat: this.props.lat, lng: this.props.lng };
    // Create a marker icon from an image URL:
    // var icon = new H.map.Icon('path of marker img');

    // Create a marker using the previously instantiated icon:
    var marker = new H.map.Marker(LocationOfMarker, {}); // { icon: icon}
      
    // Add the marker to the map:
    map.addObject(marker);



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

    // Add the data:
    heatmapProvider.addData([
      {lat: this.props.lat, lng: this.props.lng, value: 1},
      {lat: this.props.lat + 0.004, lng: this.props.lng + 0.005, value: 1},
      {lat: this.props.lat - 0.005, lng: this.props.lng - 0.002, value: 1},
      {lat: this.props.lat + 0.003, lng: this.props.lng - 0.004, value: 1},
      {lat: this.props.lat + 0.005, lng: this.props.lng - 0.007, value: 1}
    ]);

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
