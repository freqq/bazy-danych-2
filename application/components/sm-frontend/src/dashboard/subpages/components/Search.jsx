import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const SearchInuput = styled.input.attrs({ className: "search-input" })`
  padding: 15px;
  border: 1px solid #cecece;
  border-radius: 3px;
  margin: 10px auto;
  display: block;
  width: 97%;

  &:focus {
    outline: none;
  }
`;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ""
    };
  }

  filterData = event => {
    this.setState({ searchInput: event.target.value }, () => {
      this.props.searchObjects(this.state.searchInput);
    });
  };

  render() {
    return (
      <SearchInuput
        placeholder="Search ..."
        value={this.state.searchInput}
        onChange={this.filterData}
      />
    );
  }
}

Search.propTypes = {
  rowData: PropTypes.array.isRequired,
  searchObjects: PropTypes.func.isRequired
};

export default Search;
