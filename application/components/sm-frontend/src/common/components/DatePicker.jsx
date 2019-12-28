import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const DatePickerComponent = styled.div.attrs({
  className: "date-picker-component"
})`
  position: relative;
  display: inline-block;
`;

DatePickerComponent.displayName = "DatePickerComponent";

const DateInput = styled.input.attrs({
  className: "date-input"
})`
  width: 165px;
  display: inline-block;
  margin-bottom: 20px;
  margin-right: 20px;
  border-radius: 5px;
  padding: 12px 12px 12px 50px;
  border: 2px solid #f3f2f5;
  font-size: 14px;
  color: #555555;
`;

DateInput.displayName = "DateInput";

const CalendarIcon = styled.i.attrs({ className: "person-icon" })`
  position: absolute;
  top: 14px;
  left: 15px;
  color: #d4d4d4;
  font-size: 22px;
`;

const errorStyle = {
  border: "2px solid red"
};

CalendarIcon.displayName = "CalendarIcon";

class DatePicker extends Component {
  render() {
    const { placeholder, error, value, onChange, name } = this.props;
    return (
      <DatePickerComponent>
        <DateInput
          name={name}
          value={value}
          onChange={onChange}
          style={error ? errorStyle : {}}
          placeholder={placeholder}
        />
        <CalendarIcon className="far fa-calendar-alt" />
      </DatePickerComponent>
    );
  }
}

DatePicker.propTypes = {
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default DatePicker;
