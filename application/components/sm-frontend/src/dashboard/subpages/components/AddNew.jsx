import React, { Component } from "react";
import TextInput from "dashboard/subpages/components/TextInput";
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
      neededFieldsArray.push(this.camelize(header));
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

  addData = () => {
    var addRequest = {};
    this.state.neededFields.forEach(field => {
      Object.assign(addRequest, { [field]: this.state[field] });
    });

    this.props.onClick(addRequest);
  };

  render() {
    const render = [...this.props.columnHeaders];
    const { canSendForm } = this.state;

    return (
      <DataGridRow>
        {render.splice(0, render.length - 1).map(item => (
          <DataGridCell>
            <TextInput
              name={item}
              placeholder={item}
              onChange={this.onChange}
            />
          </DataGridCell>
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
  onClick: PropTypes.func.isRequired
};

export default AddNew;
