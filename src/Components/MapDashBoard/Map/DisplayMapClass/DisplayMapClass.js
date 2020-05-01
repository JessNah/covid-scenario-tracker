// src/DisplayMapClass.js
import * as React from 'react';

export class DisplayMapClass extends React.Component {
  mapRef = React.createRef();
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
      <div ref={this.mapRef} style={{ height: "500px" }} />
    );
  }
}
