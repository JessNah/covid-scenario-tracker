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

    // var heatpoint = new H.geo.Ipoint({lat: this.props.lat, lng: this.props.lng});

    // Add the marker to the map:
    map.addObject(marker);
    // map.addObject(heatpoint);


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
      <div ref={this.mapRef} style={{ height: "600px" }} />
    );
  }
}
