import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './index.scss';
import DevIcon from './../../components/Icons/dev-icon';
import FaIcon from './../../components/Icons/fa-icon';

const CATEGORIES_QUERY = gql`
  # 2
  query CategoriesQuery {
  categories(limit: 1000) {
    id
    title
    icon
  }
}
`;

const RenderCategoryItem = ({ category, closeSideBar }) => (
  <li >
    <Link
      className="item"
      to={`/category/${category.title.toLowerCase()}`}
      onClick={() => closeSideBar()}
      onKeyPress={() => closeSideBar()}
    >
      {category.icon && <DevIcon icon={category.icon} color={category.iconColor} />}
      {category.title}
    </Link>
  </li>
);

RenderCategoryItem.propTypes = {
  closeSideBar: PropTypes.func.isRequired,
  category: PropTypes.objectOf(PropTypes.string).isRequired
};


const SideBar = ({ closeSideBar, categoriesQuery, filterCategory }) => {
  if (categoriesQuery && categoriesQuery.loading) {
    return <div>Loading</div>;
  }

  // 2
  if (categoriesQuery && categoriesQuery.error) {
    return <div>Error</div>;
  }

  const { categories } = categoriesQuery;

  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        <input
          className="search"
          placeholder=""
          onChange={event => filterCategory(event.target.value)}
        />
        <ul>
          <li>
            <Link
              className="item"
              to="/category/all"
              onClick={() => closeSideBar()}
              onKeyPress={() => closeSideBar()}
            ><FaIcon icon="fa-code" />All Courses
            </Link>
          </li>
          {categories.map(category => (
            <RenderCategoryItem
              category={category}
              closeSideBar={closeSideBar}
              key={category.title}
            />
          ))}
        </ul>
      </div>
    </aside>
  );
};


export default graphql(CATEGORIES_QUERY, { name: 'categoriesQuery' })(SideBar);

SideBar.propTypes = {
  closeSideBar: PropTypes.func.isRequired,
  filterCategory: PropTypes.func.isRequired,
  // categories: PropTypes.arrayOf(Object).isRequired
};
