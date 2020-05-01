import React, {Component} from "react";
import normalDayGreyThumb from "../../../../assets/images/mapThumbnails/normal.day.grey.thumb.png";
import normalDayThumb from "../../../../assets/images/mapThumbnails/normal.day.thumb.png";
import normalDayTransitThumb from "../../../../assets/images/mapThumbnails/normal.day.transit.thumb.png";
import normalNightGreyThumb from "../../../../assets/images/mapThumbnails/normal.night.grey.thumb.png";
import normalNightThumb from "../../../../assets/images/mapThumbnails/normal.night.thumb.png";
import pedestrianDayThumb from "../../../../assets/images/mapThumbnails/pedestrian.day.thumb.png";
import pedestrianNightThumb from "../../../../assets/images/mapThumbnails/pedestrian.night.thumb.png";
import reducedDayThumb from "../../../../assets/images/mapThumbnails/reduced.day.thumb.png";
import reducedNightThumb from "../../../../assets/images/mapThumbnails/reduced.night.thumb.png";

class ThemeSelector extends Component {
    render() {
        var themes = [
            'normal.day',
            'normal.day.grey',
            'normal.day.transit',
            'normal.night',
            'normal.night.grey',
            'reduced.night',
            'reduced.day',
            'pedestrian.day',
            'pedestrian.night',
        ];

        const themeMapper = (theme) => {
            switch (theme){
                case 'normal.day':
                    return normalDayThumb;
                case 'normal.day.grey':
                    return normalDayGreyThumb;
                case 'normal.day.transit':
                    return normalDayTransitThumb;
                case 'normal.night':
                    return normalNightThumb;
                case 'normal.night.grey':
                    return normalNightGreyThumb;
                case 'reduced.night':
                    return reducedNightThumb;
                case 'reduced.day':
                    return reducedDayThumb;
                case 'pedestrian.day':
                    return pedestrianDayThumb;
                case 'pedestrian.night':
                    return pedestrianNightThumb;
                default:
                    return normalDayThumb;
            }
        }

        var thumbnails = [];
        var onChange = this.props.changeTheme;
        themes.forEach(function(theme) {
            thumbnails.push(<img key={ theme } src={themeMapper(theme)} onClick= { onChange } alt={ theme } id={ theme } />);
        });

        return (
            <div>
            { thumbnails }
            </div>
        );

    }
}

export default ThemeSelector;