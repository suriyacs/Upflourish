import React, { Component } from 'react';
import { translatable } from 'react-multilingual';

import { careerTrackSideMenu } from '../../globals/AppConstant';

class SideNavBar extends Component {
  constructor() {
    super();
    this.state = {
      currentSection: 'overview'
    };
  }

  scrollIntoSection = selectedSection => {
    this.setState({ currentSection: selectedSection });
    const node = document.getElementById(selectedSection).offsetTop - 10;
    try {
      window.scroll({
        top: node,
        behavior: 'smooth'
      });
    } catch (e) {
      // This is for chrome old (50+) versions
      window.scroll(0, node);
    }
  }

  render() {
    const { currentSection } = this.state;
    return (
      <div className="container-fluid side-nav-section d-none d-lg-block d-xl-block">
        <div className="col-12 p-0 nav-bars">
          {
            careerTrackSideMenu.map(value => (
              <div
                key={value.name}
                role="presentation"
                className={`c-pointer row nav-content ${currentSection === value.name ? 'active' : ''}`}
                onClick={() => { this.scrollIntoSection(value.name); }}
              >
                <div className="col-9 label">
                  {value.desc}
                </div>
                {
                  currentSection === value.name &&
                  <div className="col-2">
                    <span>
                      <i className="fa fa-angle-right left-arrow" />
                    </span>
                  </div>
                }
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default translatable(locale => locale)(SideNavBar);
