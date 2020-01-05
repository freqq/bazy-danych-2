import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TextInput from "dashboard/subpages/components/TextInput";
import { connect } from "react-redux";
import withLoading, { ProgIndSize } from "common/utils/withLoading";
import ProgressIndicatorCircular from "common/components/ProgressIndicatorCircular";
import { applyStyle } from "common/components/DisableOverlay";
import {
  fetchProfile,
  userDataEdit
} from "dashboard/subpages/actions/userActions";

const UserProfileWrapper = styled.div.attrs({
  className: "user-profile-wrapper"
})`
  display: grid;
  grid-template-columns: 3fr 6fr;
  grid-template-areas: "user-left-wrapper user-right-wrapper";
  height: 100%;
  width: 100%;
  overflow: hidden;
  font-family: "Roboto", "sans-serif";
`;

const UserProfileWrapperwithLoading = withLoading(
  UserProfileWrapper,
  ProgIndSize.XX_LARGE
);

const UserLeftWrapper = styled.div.attrs({ className: "user-left-wrapper" })`
  grid-area: user-left-wrapper;
  border-right: 2px solid #f1f1f1;
  padding: 10px;
`;

const UserCircleBig = styled.span.attrs({ className: "user-circle-big" })`
  background: #3b5479;
  display: block;
  margin: 0 auto;
  border: 1px solid #f1f1f1;
  padding: 20px 30px;
  font-size: 40px;
  color: #fff;
  border-radius: 50%;
  width: 6.5%;
  margin-top: 40px;
`;

const Username = styled.p.attrs({ className: "username" })`
  display: block;
  margin: 5px auto 0 auto;
  font-size: 20px;
  color: #3b5479;
  text-align: center;
  letter-spacing: 3px;
  margin-left: -5px;
`;

const Title = styled.p.attrs({ className: "title" })`
  color: #5a6f8f;
  font-weight: bold;
  font-size: 14px;
  text-transformation: uppercase;
  margin-top: 40px;
`;

const InfoList = styled.ul.attrs({ className: "info-list" })`
  padding: 0;
  list-style-type: none;
`;

const InfoListElement = styled.li.attrs({ className: "info-list-element" })`
  margin: 0;
  padding: 8px 0;
  display: block;
  font-size: 12px;
`;

const InfoListElementName = styled.p.attrs({ className: "info-list-element" })`
  text-decoration: uppercase;
  width: 80px;
  color: #5a6f8f;
  display: inline-block;
  margin: 0;
  font-weight: bold;
`;

const InfoListElementValue = styled.span.attrs({
  className: "info-list-element"
})``;

const UserRightWrapper = styled.div.attrs({ className: "user-right-wrapper" })`
  grid-area: user-right-wrapper;
  padding: 20px;
`;

const ProfileEditElement = styled.li.attrs({
  className: "profile-edit-element"
})`
  border-bottom: 1px solid #f0f0f0;
  padding: 20px;

  &:last-child {
    border: none;
  }
`;

const ProfileEditElementTitle = styled.p.attrs({
  className: "profile-edit-element-title"
})`
  margin: 0;
  padding: 5px 0;
  font-size: 12px;
`;

const SaveButton = styled.button.attrs({ className: "save-button" })`
  width: 87%;
  background: #3b5479;
  margin-left: 20px;
  padding: 10px;
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.8;
  }

  &:disabled:hover {
    cursor: auto;
  }
`;

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      firstName: "",
      lastName: "",
      passwordError: false,
      passwordErrorText: "",
      canSendForm: false,
      editedData: {}
    };
  }

  componentWillMount() {
    const { password, firstName, lastName, email } = this.state;

    var userData = {
      password,
      firstName,
      lastName,
      email
    };

    this.props.getProfile(userData);
  }

  componentWillReceiveProps(props) {
    if (props.userData && !this.state.firstName) {
      this.setState({
        firstName: props.userData.firstName,
        lastName: props.userData.lastName,
        email: props.userData.email
      });
    }
  }

  handleSubmit = () => {
    this.props.editUser(this.state.editedData);
  };

  onChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(
      {
        editedData: {
          ...this.state.editedData,
          [event.target.name]: event.target.value
        },
        [event.target.name]: event.target.value
      },
      () => {
        let error = false;
        let errorText = "";

        if (name === "password" && value.length < 6) {
          error = true;
          errorText = "Password must be alteast 6 characters long.";
        }

        this.setState(
          { passwordError: error, passwordErrorText: errorText },
          () => {
            if (this.state.passwordError) this.setState({ canSendForm: false });
            else this.setState({ canSendForm: true });
          }
        );
      }
    );
  };

  render() {
    const {
      password,
      firstName,
      lastName,
      canSendForm,
      passwordError,
      passwordErrorText
    } = this.state;
    const { userData, isFetching, isEditing } = this.props;

    return (
      <UserProfileWrapperwithLoading
        isLoading={isFetching}
        style={applyStyle(isEditing)}
      >
        {isEditing && <ProgressIndicatorCircular />}
        <UserLeftWrapper>
          <UserCircleBig>A</UserCircleBig>
          <Username>{userData.username}</Username>
          <Title>Contact Information</Title>
          <InfoList>
            <InfoListElement>
              <InfoListElementName>First Name: </InfoListElementName>
              <InfoListElementValue>{userData.firstName}</InfoListElementValue>
            </InfoListElement>
            <InfoListElement>
              <InfoListElementName>Last Name: </InfoListElementName>
              <InfoListElementValue>{userData.lastName}</InfoListElementValue>
            </InfoListElement>
            <InfoListElement>
              <InfoListElementName>Email: </InfoListElementName>
              <InfoListElementValue>{userData.email}</InfoListElementValue>
            </InfoListElement>
          </InfoList>
        </UserLeftWrapper>
        <UserRightWrapper>
          <Title>Edit profile information:</Title>
          <InfoList>
            <ProfileEditElement>
              <ProfileEditElementTitle>Password</ProfileEditElementTitle>
              <TextInput
                onChange={this.onChange}
                placeholder="Password"
                id="password-input"
                value={password}
                name="password"
                type="password"
                error={passwordError}
                errorMsg={passwordErrorText}
              />
            </ProfileEditElement>
            <ProfileEditElement>
              <ProfileEditElementTitle>First Name</ProfileEditElementTitle>
              <TextInput
                onChange={this.onChange}
                placeholder="First Name"
                id="first-name-input"
                value={firstName}
                name="firstName"
              />
            </ProfileEditElement>
            <ProfileEditElement>
              <ProfileEditElementTitle>Last Name</ProfileEditElementTitle>
              <TextInput
                onChange={this.onChange}
                placeholder="Last Name"
                id="last-name-input"
                value={lastName}
                name="lastName"
              />
            </ProfileEditElement>
          </InfoList>
          <SaveButton disabled={!canSendForm} onClick={this.handleSubmit}>
            Save
          </SaveButton>
        </UserRightWrapper>
      </UserProfileWrapperwithLoading>
    );
  }
}

UserProfile.propTypes = {
  userData: PropTypes.array.isRequired,
  getProfile: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  userData: state.subpages.user.data,
  isFetching: state.subpages.user.iSFetching,
  isError: state.subpages.user.isError,
  isEditing: state.subpages.user.isEditing
});

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(fetchProfile()),
  editUser: userData => dispatch(userDataEdit(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
