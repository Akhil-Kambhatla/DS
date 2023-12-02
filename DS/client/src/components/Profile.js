import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';

const Profile = ({coverImageUrl}) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  const profileContainerStyle = {
    marginTop: '20px',
    position: 'relative',
    overflow: 'hidden',
    borderRadius:'10px'
  };

  const coverImageStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1,
  };

  const profileImageStyle = {
    width: '100%',
    maxWidth: '200px', // Set a maximum width for the profile image
    height: 'auto', // Maintain aspect ratio
    borderRadius: '50%',
    position: 'relative',
    zIndex: 1,
  };

  const profileDetailsStyle = {
    padding: '20px',
    position: 'relative',
    zIndex: 1,
    color: '#fff', // Text color set to white
  };

  const h1Style = {
    fontSize: '24px',
    marginBottom: '10px',
  };

  const usernameStyle = {
    fontSize: '16px',
    color: '#eee', // Lighter text color
  };

  // const followersStyle = {
  //   marginTop: '10px',
  //   fontSize: '14px',
  //   color: '#ccc', // Even lighter text color
  // };

  const profileButtonsStyle = {
    marginTop: '20px',
  };

  const buttonStyle = {
    marginRight: '10px',
  };

  return (
    isAuthenticated && (
     
    
    <Container style={profileContainerStyle}>
      {/* Cover background image from the event's topic */}
      <img
        src={`https://source.unsplash.com/1600x400/?${coverImageUrl}`}
        alt="Cover"
        style={coverImageStyle}
      />

      {/* Profile details */}
      
      <Row>
        <Col md={4} style={profileImageStyle}>
          {/* Your profile image from Auth0 goes here */}
          <img src={user.picture} alt={user.name}
            style={profileImageStyle}
          />
        </Col>
        <Col md={8} style={profileDetailsStyle}>
          <h1 style={h1Style}>{user.name}</h1>
          <div style={usernameStyle}>{user.name}</div>
          {/* <div style={followersStyle}>following</div> */}
          <div style={profileButtonsStyle}>
            <Button variant="outline-primary" style={buttonStyle}>
              Share
            </Button>
            <Button variant="outline-secondary" style={buttonStyle}>
              Edit profile
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
      )
  );
};

export default Profile;
