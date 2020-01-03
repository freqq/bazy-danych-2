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
      canSendForm: false
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

  onChange = event => {
    var camelized = this.camelize(event.target.name);
    var canSendForm = true;

    if (camelized.toLowerCase().includes("idnumber"))
      camelized = camelized.toLowerCase();

    this.setState(
      {
        [camelized]: event.target.value
      },
      () => {
        this.state.neededFields.forEach(field => {
          if (!(field in this.state) || this.state[field].length === 0) {
            canSendForm = false;
          }
        });

        this.setState({
          canSendForm: canSendForm
        });
      }
    );
  };

  onCheckboxChange = event => {
    const camelized = this.camelize(event.target.name);
    const value = event.target.checked;
    this.setState({ [camelized]: value });
  };

  addData = () => {
    var addRequest = {};
    this.state.neededFields.forEach(field => {
      Object.assign(addRequest, { [field]: this.state[field] });
    });

    console.log(addRequest);

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
    else if (this.camelize(item).toLowerCase() === "carriername") {
      return (
        <SelectBox
          selectItems={this.props.carriersData}
          onChange={this.onChange}
          name={item}
        />
      );
    } else if (this.camelize(item).toLowerCase() === "planename") {
      return (
        <SelectBox
          selectItems={this.props.planesData}
          onChange={this.onChange}
          name={item}
        />
      );
    } else
      return (
        <TextInput name={item} placeholder={item} onChange={this.onChange} />
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
  planesData: PropTypes.array
};

export default AddNew;
