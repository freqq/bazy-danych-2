import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import withLoading, { ProgIndSize } from "common/utils/withLoading";
import { planeById, planeEdit } from "dashboard/subpages/actions/planesActions";
import ProgressIndicatorCircular from "common/components/ProgressIndicatorCircular";
import FetchingErrorPlaceholder from "common/components/FetchingErrorPlaceholder";
import { applyStyle } from "common/components/DisableOverlay";

const EditPageWrapper = styled.div.attrs({ className: "edit-page-wrapper" })`
  margin: 0;
  padding: 5px 30px;
`;

const EditPageWithLoading = withLoading(EditPageWrapper, ProgIndSize.XX_LARGE);

const SubpageTitle = styled.p.attrs({ className: "subpage-title" })`
  font-size: 25px;
`;

const SubpageIcon = styled.li.attrs({ className: "side-navigation-left-icon" })`
  margin: 0 20px 0 0;
  color: #6079a2;
  width: 20px;
`;

class EditPage extends Component {
  componentWillMount() {
    this.props.getPlaneData(this.props.match.params.id);
  }

  render() {
    const { editPlane, isFetching, isError, isEditing } = this.props;
    if (isError) return <FetchingErrorPlaceholder />;
    return (
      <EditPageWithLoading isLoading={isFetching} style={applyStyle(isEditing)}>
        {isEditing && <ProgressIndicatorCircular />}
        <SubpageTitle>
          <SubpageIcon className="fas fa-plane" />
          Planes - Edit
        </SubpageTitle>
        paramsy
      </EditPageWithLoading>
    );
  }
}

EditPage.propTypes = {
  editPlane: PropTypes.func.isRequired,
  getPlaneData: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  planeParameters: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.subpages.planes.edit.isFetching,
  isError: state.subpages.planes.edit.isError,
  planeParameters: state.subpages.planes.edit.data,
  isEditing: state.subpages.planes.edit.isEditing
});

const mapDispatchToProps = dispatch => ({
  editPlane: planeData => dispatch(planeEdit(planeData)),
  getPlaneData: planeId => dispatch(planeById(planeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
