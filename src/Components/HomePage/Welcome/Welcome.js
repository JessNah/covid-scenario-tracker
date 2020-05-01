import React, { Component } from 'react';
import { Button } from 'carbon-components-react'
import {ReactComponent as FiguresImg} from '../../../assets/images/distancingFiguresBright3.svg';
import {ReactComponent as DistancingImg} from '../../../assets/images/peopleWithCirclesDarkCircles3.svg';
import {ReactComponent as WorriedMan} from '../../../assets/images/manWorried.svg';
import {ReactComponent as SickGirl} from '../../../assets/images/sickGirl.svg';
import './Welcome.scss';

class Welcome extends Component {
	state = {}

	render(){
		return (
			<React.Fragment>
				{/* Header gradient */}
				<div className={"HeaderGradient"}>
					<div className={"bx--row"}>
						<div className={"bx--col-lg-8 bx--col-md-4 bx--col-sm-4 verticallyCenter"}>
							<div>
								<div className={"ApplicationName"}>
									Trace the Spread
								</div>
								<div className={"Subtitle"}>
									Discover your COVID exposure.
								</div>
								<Button kind="secondary" className="myBtn" href="#/map/">
									Have you been at risk?
								</Button>
							</div>
						</div>
						<div className={"bx--col-lg-8 bx--col-md-4 bx--col-sm-4"}>
							<div className="graphic1"><FiguresImg/></div>
						</div>
					</div>
				</div>
				{/* Row with 3 people */}
				<div className={"Description"}>
					<div className={"bx--row"}>
						<div className={"bx--col-lg-8 bx--col-md-4 bx--col-sm-4"}>
							<div className="graphic2"><DistancingImg/></div>
						</div>
						<div className={"bx--col-lg-8 bx--col-md-4 bx--col-sm-4 verticallyCenter"}>
							<div>
								<div className={"DescriptionHeader"}>
									Your proximity to others.
								</div>
								<div className={"DescriptionText"}>
									We all do our best to stay home and be safe. But sometimes, you can't avoid the necessary trips outside, like to do groceries for instance. Let us help you find out how safe you were the last time you went outside.
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* What to do if you've been near someone*/}
				<div className={"testedPositiveBackgroundColor"}>
					<div className={"bx--row"}>
						<div className={"bx--col-lg-12 bx--col-md-6 bx--col-sm-4 verticallyCenter"}>
							<div>
								<div className={"DescriptionHeader"}>
									Have you been near someone tested positive?
								</div>
								<div className={"DescriptionText"}>
									Be responsible and self isolate immediately. Update your family doctor and contact emergency services if you have any serious health concerns.
								</div>
							</div>
						</div>
						<div className={"bx--col-lg-4 bx--col-md-2 bx--col-sm-4"}>
							<div className="graphic3"><WorriedMan/></div>
						</div>
					</div>
				</div>
				{/* Tested positive? */}
				<div className={"Description"}>
					<div className={"bx--row"}>
						<div className={"bx--col-lg-8 bx--col-md-4 bx--col-sm-4"}>
							<div className="graphic4"><SickGirl/></div>
						</div>
						<div className={"bx--col-lg-8 bx--col-md-4 bx--col-sm-4 verticallyCenter"}>
							<div>
								<div className={"DescriptionHeader"}>
									Tested positive?
								</div>
								<div className={"DescriptionText"}>
									If you've tested positive, you can choose to upload your personal location data for the past 14 days, we scatter all the data we show so that your exact positions and whereabouts are always kept safe.
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}

}

export default Welcome;
