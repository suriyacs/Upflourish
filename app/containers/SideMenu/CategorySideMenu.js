import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchAllCategories } from '../../actions/learningPath';

import '../../../assets/styles/components/Sidemenu.scss';

class CategorySideMenu extends Component {
  constructor() {
    super();
    this.state = {
      activeMenu: 'Recommended'
    };
  }

  componentDidMount() {
    this.props.fetchAllCategories();
  }

  onClickMenu = (activeMenu, activeCategoy) => {
    this.setState({
      activeMenu
    });
    this.props.handleClickSubCategory(activeCategoy);
  }

  render() {
    const { categories, isGeneral } = this.props;
    const { activeMenu } = this.state;
    const locale = this.props.locale.categorySideMenu;
    return (
      <div className="col-3 category-sidemenu">
        {!isGeneral &&
          <div
            className={`menu-btn ${activeMenu === 'Recommended' ? 'active' : 'in-active'}`}
            onClick={() => this.onClickMenu('Recommended', '')}
            role="presentation"
          >
            {locale.recommendedForYou}
          </div>
        }
        {
          categories.map(category => (
            <div
              key={category.id}
              className={`menu-btn ${activeMenu === category.id ? 'active' : 'in-active'}`}
              onClick={() => this.onClickMenu(category.id, category)}
              role="presentation"
            >
              {category.name}
            </div>
          ))
        }
      </div>
    );
  }
}

CategorySideMenu.propTypes = {
  fetchAllCategories: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  // handleClickCategory: PropTypes.func,
  handleClickSubCategory: PropTypes.func,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  isGeneral: PropTypes.bool
};

CategorySideMenu.defaultProps = {
  // handleClickCategory: () => {},
  handleClickSubCategory: () => {},
  isGeneral: false
};

const mapStateToProps = state => ({
  categories: Array.from(state.learningPath.get('categories')),
  loading: state.learningPath.get('loading')
});

const mapDispatchToProps = dispatch => ({
  fetchAllCategories: () => dispatch(fetchAllCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(CategorySideMenu);
