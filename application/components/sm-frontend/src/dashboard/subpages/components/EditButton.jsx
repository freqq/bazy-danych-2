import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const EditButtonWrapper = styled.button.attrs({
  className: "edit-button-wrapper"
})`
  border-radius: 4px;
  padding: 10px 15px;
  background: #3a537a;
  color: #ffffff;
  font-size: 12px;
  width: 95px;
  display: inline-block;
  margin: 10px 10px 0 0;
  text-align: center;
  transition: 0.2s;
  border: none;

  &:hover {
    background: #6079a2;
    cursor: pointer;
  }

  &:disabled {
    background: #6079a2;
  }

  &:disabled:hover {
    cursor: auto;
  }
`;

const ButtonIcon = styled.i.attrs({
  className: "edit-button-icon"
})`
  color: #ffffff;
  font-size: 12px;
  margin: 5px;
`;

class EditButton extends Component {
  render() {
    const { text, icon, onClick, disabled, id } = this.props;
    return (
      <EditButtonWrapper onClick={onClick} disabled={disabled} id={id}>
        <ButtonIcon className={icon} />
        {text}
      </EditButtonWrapper>
    );
  }
}

EditButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
};

export default EditButton;
