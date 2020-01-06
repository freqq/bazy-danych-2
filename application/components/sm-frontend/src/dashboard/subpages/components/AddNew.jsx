import React, { Component } from "react";
import TextInput from "dashboard/subpages/components/TextInput";
import Checkbox from "dashboard/subpages/components/Checkbox";
import SelectBox from "dashboard/subpages/components/SelectBox";
import PropTypes from "prop-types";
import {
  DataGridCell,
  DataGridRow,
  ActionButton
} from "dashboard/common/DataGrid";

class AddNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      neededFields: [],
      canSendForm: false,
      fieldsWithError: []
    };
  }

  componentDidMount() {
    var neededFieldsArray = [];
    this.props.columnHeaders.forEach(header => {
      if (
        this.camelize(header)
          .toLowerCase()
          .includes("idnumber")
      )
        neededFieldsArray.push(this.camelize(header).toLowerCase());
      else neededFieldsArray.push(this.camelize(header));
    });
    neededFieldsArray.pop();

    this.setState({
      neededFields: neededFieldsArray
    });
  }

  camelize = string =>
    string
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");

  setSaveStatus = () => {
    const { fieldsWithError } = this.state;
    let canSendFormValue = true;

    this.state.neededFields.forEach(field => {
      if (!(field in this.state) || this.state[field].length === 0) {
        canSendFormValue = false;
      }
    });

    this.setState({
      canSendForm: fieldsWithError.length === 0 && canSendFormValue
    });
  };

  onChange = event => {
    var camelized = this.camelize(event.target.name);
    var canSendForm = true;
    const fieldValue = event.target.value;

    if (camelized.toLowerCase().includes("idnumber"))
      camelized = camelized.toLowerCase();

    this.setState(
      {
        [camelized]: fieldValue
      },
      () => {
        this.state.neededFields.forEach(field => {
          if (!(field in this.state) || this.state[field].length === 0) {
            canSendForm = false;
          }
        });

        this.setState(
          {
            canSendForm: canSendForm
          },
          () => {
            let isError = false;
            let errorText = "";

            if (fieldValue.length === 0) {
              isError = true;
              errorText = "Value must not be blank!";
            } else if (
              camelized === "seatsCount" &&
              !this.isNumeric(fieldValue)
            ) {
              isError = true;
              errorText = "Value must be an integer!";
            } else if (camelized === "pesel" && !this.isPesel(fieldValue)) {
              isError = true;
              errorText = "Value is not a valid PESEL number!";
            } else if (
              camelized === "birthday" &&
              !this.isTimestamp(fieldValue)
            ) {
              isError = true;
              errorText = "Value is not a valid date timestamp (yyyy-mm-dd)!";
            } else if (camelized === "email" && !this.isEmail(fieldValue)) {
              isError = true;
              errorText = "Value is not a valid email!";
            } else if (
              camelized === "baggageWeight" &&
              !this.isNumeric(fieldValue)
            ) {
              isError = true;
              errorText = "Value must be an integer!";
            } else if (camelized === "price" && !this.isNumeric(fieldValue)) {
              isError = true;
              errorText = "Value must be an integer!";
            } else if (
              camelized === "flightDate" &&
              !this.isTimestamp(fieldValue)
            ) {
              isError = true;
              errorText = "Value is not a valid date timestamp (yyyy-mm-dd)!";
            }

            if (isError)
              this.setState(
                {
                  fieldsWithError: [...this.state.fieldsWithError, camelized]
                },
                () => {
                  this.setState(
                    {
                      [camelized + "IsError"]: isError,
                      [camelized + "ErrorText"]: errorText
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
                    return event !== camelized;
                  })
                },
                () => {
                  this.setState(
                    {
                      [camelized + "IsError"]: isError,
                      [camelized + "ErrorText"]: errorText
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
    );
  };

  onCheckboxChange = event => {
    const camelized = this.camelize(event.target.name);
    const value = event.target.checked;
    this.setState({ [camelized]: value });
  };

  isNumeric = number => /^-{0,1}\d+$/.test(number);

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

  isEmail = email =>
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      email
    );

  isTimestamp = date =>
    /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(date);

  addData = () => {
    var addRequest = {};
    this.state.neededFields.forEach(field => {
      Object.assign(addRequest, { [field]: this.state[field] });
    });

    this.props.onClick(addRequest);
  };

  renderField = item => {
    if (item.toLowerCase().includes("discount"))
      return (
        <Checkbox
          checked={this.state[item]}
          onChange={this.onCheckboxChange}
          name={item}
        />
      );
    else if (
      this.camelize(item).toLowerCase() === "carriername" &&
      this.props.pageTitle.toLowerCase() !== "carriers"
    ) {
      return (
        <SelectBox
          selectItems={this.props.carriersData}
          onChange={this.onChange}
          name={item}
          id={this.camelize(item)}
        />
      );
    } else if (this.camelize(item).toLowerCase() === "planename") {
      return (
        <SelectBox
          selectItems={this.props.planesData}
          onChange={this.onChange}
          name={item}
          id={this.camelize(item)}
        />
      );
    } else if (this.camelize(item).toLowerCase() === "client") {
      return (
        <SelectBox
          selectItems={this.props.clientsData}
          onChange={this.onChange}
          name={item}
          id={this.camelize(item)}
        />
      );
    } else if (this.camelize(item).toLowerCase() === "flight") {
      return (
        <SelectBox
          selectItems={this.props.flightsData}
          onChange={this.onChange}
          name={item}
          id={this.camelize(item)}
        />
      );
    } else if (this.camelize(item).toLowerCase() === "ticket") {
      return (
        <SelectBox
          selectItems={this.props.ticketsData}
          onChange={this.onChange}
          name={item}
          id={this.camelize(item)}
        />
      );
    } else
      return (
        <TextInput
          name={item}
          placeholder={item}
          onChange={this.onChange}
          id={this.camelize(item)}
          error={this.state[this.camelize(item) + "IsError"]}
          errorMsg={this.state[this.camelize(item) + "ErrorText"]}
        />
      );
  };

  render() {
    const render = [...this.props.columnHeaders];
    const { canSendForm } = this.state;

    return (
      <DataGridRow>
        {render.splice(0, render.length - 1).map(item => (
          <DataGridCell>{this.renderField(item)}</DataGridCell>
        ))}
        <DataGridCell>
          <ActionButton
            className="fas fa-plus"
            disabled={!canSendForm}
            onClick={this.addData}
            id="add-new-button"
          />
        </DataGridCell>
      </DataGridRow>
    );
  }
}

AddNew.propTypes = {
  columnHeaders: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  carriersData: PropTypes.array,
  planesData: PropTypes.array,
  clientsData: PropTypes.array,
  flightsData: PropTypes.array,
  ticketsData: PropTypes.array
};

export default AddNew;
