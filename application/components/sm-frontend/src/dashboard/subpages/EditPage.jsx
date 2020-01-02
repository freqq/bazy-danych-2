import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import withLoading, { ProgIndSize } from "common/utils/withLoading";
import { planeById, planeEdit } from "dashboard/subpages/actions/planesActions";
import ProgressIndicatorCircular from "common/components/ProgressIndicatorCircular";
import FetchingErrorPlaceholder from "common/components/FetchingErrorPlaceholder";
import { applyStyle } from "common/components/DisableOverlay";
import EditTextInput from "dashboard/subpages/components/EditTextInput";
import EditButton from "dashboard/subpages/components/EditButton";
import { push } from "react-router-redux";

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

const ParameterRow = styled.div.attrs({ className: "parameter-row" })`
  padding: 10px 0;
  font-size: 12px;
  border-bottom: 1px solid #edf2f4;
`;

const ParmeterName = styled.p.attrs({ className: "parameter-name" })``;

const ParameterInput = styled(EditTextInput)`
  && {
    width: 50%;
    margin-left: 20px !important;
  }
`;

class EditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canSendForm: false,
      editedParameters: {},
      fieldsWithError: []
    };
  }

  componentWillMount() {
    this.props.getPlaneData(this.props.match.params.id);
  }

  setSaveStatus = () => {
    const { fieldsWithError, editedParameters } = this.state;

    const { planeParameters } = this.props;

    this.setState({
      canSendForm:
        fieldsWithError.length === 0 &&
        this.isContentChanged(planeParameters, editedParameters)
    });
  };

  handleSave = () => {
    let idObj;

    this.props.planeParameters.map(item => {
      if (item.fieldName === "id") idObj = item.value;
    });

    this.props.editPlane(idObj, this.state.editedParameters);
  };

  onChange = (event, item) => {
    let isError;
    let errorText = "";
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    this.setState(
      {
        editedParameters: {
          ...this.state.editedParameters,
          [fieldName]: fieldValue
        }
      },
      () => {
        if (fieldValue.length === 0) {
          isError = true;
          errorText = "You can't leave this field empty!";
        } else if (item.type === "integer" && !this.isNumeric(fieldValue)) {
          isError = true;
          errorText = "Value must a type of integer!";
        } else {
          isError = false;
          errorText = "";
        }

        if (isError)
          this.setState(
            {
              fieldsWithError: [...this.state.fieldsWithError, fieldName]
            },
            () => {
              this.setState(
                {
                  [fieldName + "IsError"]: isError,
                  [fieldName + "ErrorText"]: errorText
                },
                () => {
                  this.setSaveStatus();
                }
              );
            }
          );
        else
          this.setState(
            {
              fieldsWithError: this.state.fieldsWithError.filter(function(
                event
              ) {
                return event !== fieldName;
              })
            },
            () => {
              this.setState(
                {
                  [fieldName + "IsError"]: isError,
                  [fieldName + "ErrorText"]: errorText
                },
                () => {
                  this.setSaveStatus();
                }
              );
            }
          );
      }
    );
  };

  isNumeric = number => /^-{0,1}\d+$/.test(number);

  isContentChanged = (originalParameters, inputContent) =>
    Object.keys(inputContent).some(
      key => originalParameters[key] !== inputContent[key]
    );

  unCamelize = s => {
    return s
      .split(/(?=[A-Z])/)
      .map(function(p) {
        return p.charAt(0).toUpperCase() + p.slice(1);
      })
      .join(" ");
  };

  render() {
    const { isFetching, isError, isEditing, planeParameters } = this.props;
    const { canSendForm } = this.state;

    if (isError) return <FetchingErrorPlaceholder />;
    return (
      <EditPageWithLoading isLoading={isFetching} style={applyStyle(isEditing)}>
        {isEditing && <ProgressIndicatorCircular />}
        <SubpageTitle>
          <SubpageIcon className="fas fa-plane" />
          Planes - Edit
        </SubpageTitle>
        {planeParameters.map(item =>
          item.fieldName !== "id" ? (
            <ParameterRow key={item.fieldName}>
              <ParmeterName>{this.unCamelize(item.fieldName)}</ParmeterName>
              <ParameterInput
                isError={this.state[item.fieldName + "IsError"]}
                errorText={this.state[item.fieldName + "ErrorText"]}
                value={item.value}
                name={item.fieldName}
                onChange={event => this.onChange(event, item)}
              />
            </ParameterRow>
          ) : null
        )}
        <EditButton
          disabled={!canSendForm}
          text="Save"
          icon="far fa-save"
          onClick={this.handleSave}
        />
        <EditButton
          text="Cancel"
          icon="far fa-times-circle"
          onClick={this.props.handleCancel}
        />
      </EditPageWithLoading>
    );
  }
}

EditPage.propTypes = {
  editPlane: PropTypes.func.isRequired,
  getPlaneData: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
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
  editPlane: (planeId, planeData) => dispatch(planeEdit(planeId, planeData)),
  getPlaneData: planeId => dispatch(planeById(planeId)),
  handleCancel: () => dispatch(push(`/admin/planes/`))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
