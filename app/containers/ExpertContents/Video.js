import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Player, ControlBar, ReplayControl,
  ForwardControl, CurrentTimeDisplay,
  TimeDivider, PlaybackRateMenuButton, VolumeMenuButton,
  BigPlayButton
} from 'video-react';
import { translatable } from 'react-multilingual';

import ContentIntroduction from './ContentIntroduction';
import RelatedContent from './RelatedContent';
import { constantValues } from '../../globals/AppConstant';

import '../../../assets/styles/components/Video.scss';
import '../../../assets/styles/components/LearningPath.scss';
import '../../../node_modules/video-react/styles/scss/video-react.scss';

class Video extends Component {
  constructor() {
    super();
    this.player = React.createRef();
    this.isContentEnrolled = true;
  }

  componentWillUnmount() {
    const video = document.querySelector('video');
    if (video) {
      video.removeEventListener('ended', () => {
        const { player } = this.player.current.getState();
        if (player.ended) {
          this.setState(({ isFullVideoWatched }) => ({
            isFullVideoWatched: !isFullVideoWatched
          }));
        }
      });
    }
  }

  render() {
    const {
      contentDetails,
      handleEdit
    } = this.props;
    return (
      <Fragment>
        <div className="content-header-section p-5 p-t-10">
          {
            contentDetails && contentDetails.id &&
            <ContentIntroduction
              contentTitle={contentDetails.title}
              contentDescription={contentDetails.description}
              contentDetails={contentDetails}
              handleEdit={handleEdit}
            />
          }
          <div className="row">
            <div className="col-8">
              <div className="video-player">
                {contentDetails && contentDetails.link &&
                  <Player
                    fluid={false}
                    width="100%"
                    height={500}
                    ref={this.player}
                  >
                    <source src={contentDetails && contentDetails.link} />
                    <ControlBar autoHide={false}>
                      <ReplayControl seconds={10} order={1.1} />
                      <ForwardControl seconds={30} order={1.2} />
                      <CurrentTimeDisplay order={4.1} />
                      <TimeDivider order={4.2} />
                      <PlaybackRateMenuButton
                        rates={[2, 1.5, 1.25, 1, 0.75, 0.5]}
                        order={7.1}
                      />
                      <VolumeMenuButton enabled />
                    </ControlBar>
                    <BigPlayButton position="center" />
                  </Player>
                }
                <div id="expandableContent" className="content-description-expandable content-title mt-3">
                  <p id="detail" className="collapse col-lg-12 padding-0 path-detail" aria-expanded="false">
                    {contentDetails.description}
                  </p>
                  {contentDetails.description && contentDetails.description.length > constantValues.expandableLimit &&
                    <span
                      className="expand content-expand collapsed"
                      data-toggle="collapse"
                      href="#detail"
                      aria-expanded="false"
                    />
                  }
                </div>
              </div>
            </div>
            <div className="col-4">
              {
                contentDetails && contentDetails.id &&
                <RelatedContent
                  selectedContent={contentDetails}
                />
              }
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

Video.propTypes = {
  contentDetails: PropTypes.object,
  handleEdit: PropTypes.func.isRequired
};

Video.defaultProps = {
  contentDetails: {}
};

export default (translatable(locale => locale)(Video));
