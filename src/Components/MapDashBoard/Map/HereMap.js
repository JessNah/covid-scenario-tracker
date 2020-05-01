import React, {Component} from "react";
import {DisplayMapClass} from './DisplayMapClass/DisplayMapClass';
import ThemeSelector from './ThemeSelector/ThemeSelector.js';

class HereMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            theme: 'normal.day',
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(evt) {
        evt.preventDefault();

        var change = evt.target.id;
        this.setState({
            "theme": change,
        });
    }

    render() {
        return (
            <div>
                <DisplayMapClass
                    apiKey="insertAPIkeyhere"
                    lat={this.props.lat} //"42.345978"
                    lng={this.props.lng} //"-83.0405"
                    zoom="15"
                    theme={ this.state.theme }
                />
                <ThemeSelector changeTheme={ this.onChange } />
            </div>
        );
    }
}

export default HereMap;