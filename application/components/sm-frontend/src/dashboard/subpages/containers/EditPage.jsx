import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import withLoading, { ProgIndSize } from "common/utils/withLoading";
import ProgressIndicatorCircular from "common/components/ProgressIndicatorCircular";
import FetchingErrorPlaceholder from "common/components/FetchingErrorPlaceholder";
import { applyStyle } from "common/components/DisableOverlay";
import EditTextInput from "dashboard/subpages/components/EditTextInput";
import EditButton from "dashboard/subpages/components/EditButton";

const EditPageWrapper = styled.div.attrs({ className: "edit-page-wrapper" })`
  margin: 0;
  padding: 5px 30px;
  height: 76vh;
  overflow-y: scroll;
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
    this.props.getObjectData(this.props.match.params.id);
  }

  setSaveStatus = () => {
    const { fieldsWithError, editedParameters } = this.state;

    const { objectParameters } = this.props;

    this.setState({
      canSendForm:
        fieldsWithError.length === 0 &&
        this.isContentChanged(objectParameters, editedParameters)
    });
  };

  handleSave = () => {
    let idObj;

    this.props.objectParameters.map(item => {
      if (item.fieldName === "id") idObj = item.value;
      return;
    });

    console.log(this.state.editedParameters)
    console.log(idObj);

    this.props.editObject(idObj, this.state.editedParameters);
  };

  onChange = (event, item) => {
    let isError;
    let errorText = "";
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    const fieldCheckbox = event.target.checked;

    if (fieldName.toLowerCase().includes("discount")) {
      this.setState(
        {
          editedParameters: {
            ...this.state.editedParameters,
            discount: fieldCheckbox
          }
        },
        () => {
          this.setSaveStatus();
        }
      );
    } else {
      this.setState(
        {
          editedParameters: {
            ...this.state.editedParameters,
            [fieldName.toLowerCase().includes("idnumber")
              ? "idnumber"
              : fieldName]: fieldValue
          }
        },
        () => {
          if (fieldValue.length === 0) {
            isError = true;
            errorText = "You can't leave this field empty!";
          } else if (item.type === "integer" && !this.isNumeric(fieldValue)) {
            isError = true;
            errorText = "Value must a type of integer!";
          } else if (
            item.type === "timestamp" &&
            !this.isTimestamp(fieldValue)
          ) {
            isError = true;
            errorText = "Given value is not a date (yyyy-MM-dd)!";
          } else if (
            fieldName.toLowerCase().includes("pesel") &&
            !this.isPesel(fieldValue)
          ) {
            isError = true;
            errorText = "Not a valid PESEL value!";
          } else if (
            fieldName.toLowerCase().includes("email") &&
            !this.isEmail(fieldValue)
          ) {
            isError = true;
            errorText = "Not a valid email value!";
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
    }
  };

  isNumeric = number => /^-{0,1}\d+$/.test(number);

  isEmail = email =>
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      email
    );

  isPesel = pesel => {
    if (typeof pesel !== "string") return false;

    let weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let sum = 0;
    let controlNumber = parseInt(pesel.substring(10, 11));
    for (let i = 0; i < weight.length; i++) {
      sum += parseInt(pesel.substring(i, i + 1)) * weight[i];
    }
    sum = sum % 10;
    return 10 - sum === controlNumber;
  };

  isTimestamp = date =>
    /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(date);

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
    const {
      isFetching,
      isError,
      isEditing,
      objectParameters,
      pageTitle,
      pageIcon,
      ticketsData,
      flightsData,
      clientsData
    } = this.props;
    const { canSendForm } = this.state;

    if (isError) return <FetchingErrorPlaceholder />;
    return (
      <EditPageWithLoading isLoading={isFetching} style={applyStyle(isEditing)}>
        {isEditing && <ProgressIndicatorCircular />}
        <SubpageTitle>
          <SubpageIcon className={pageIcon} />
          {pageTitle}
        </SubpageTitle>
        {objectParameters.map(item =>
          item.fieldName !== "id" ? (
            <ParameterRow key={item.fieldName}>
              <ParmeterName>{this.unCamelize(item.fieldName)}</ParmeterName>
              <ParameterInput
                isError={this.state[item.fieldName + "IsError"]}
                errorText={this.state[item.fieldName + "ErrorText"]}
                value={item.value}
                name={item.fieldName}
                onChange={event => this.onChange(event, item)}
                planesData={this.props.planesData}
                carriersData={this.props.carriersData}
                ticketsData={ticketsData}
                flightsData={flightsData}
                clientsData={clientsData}
                pageTitle={this.props.pageTitle}
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
        {JSON.stringify(this.state)}
      </EditPageWithLoading>
    );
  }
}

EditPage.propTypes = {
  editObject: PropTypes.func.isRequired,
  getObjectData: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  objectParameters: PropTypes.array.isRequired,
  pageTitle: PropTypes.string.isRequired,
  pageIcon: PropTypes.string.isRequired,
  planesData: PropTypes.array,
  carriersData: PropTypes.array,
  clientsData: PropTypes.array,
  flightsData: PropTypes.array,
  ticketsData: PropTypes.array
};

export default EditPage;
