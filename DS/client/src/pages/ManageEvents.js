import React, { useState, useEffect } from 'react';
import { Button, Spin, Card, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { toast, Toaster } from 'react-hot-toast';

const { Meta } = Card;

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/get-events`);
        if (response.ok) {
          const eventData = await response.json();
          setEvents(eventData);
          toast.success('Retrieval Successful');
        } else {
          console.error('Failed to fetch events data.');
          toast.error('Failed to fetch events data');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to fetch events data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const EventCard = ({ event }) => {
    const editEventDetails = () => {
      // Implement edit functionality
    };

    const deleteEvent = async (eventId) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/delete-event/${eventId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          // setDeleteConfirmation(true);
          setTimeout(() => {
            // setDeleteConfirmation(false);
            window.location.reload(); // Reload the page to reflect changes
          }, 1000);
        } else {
          console.error('Failed to delete event.');
        }
      } catch (error) {
        console.error('Error:', error);
        // setDeleteConfirmation(false);
      }
    };

    const downloadAttendeesData = async (eventId,eventName) => {
      try {
        const response = await fetch(`${process.env.SERVER_URL}/api/download-user-data/${eventId}`);
        if (response.ok) {
          // Convert the response to a blob
          const blob = await response.blob();

          // Create a link to download the blob
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `${eventName}_attendes_details.xlsx`;
          link.click();

          toast.success('Download Successful');
        } else {
          console.error('Failed to download attendees data.');
          toast.error('Failed to download attendees data');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to download attendees data');
      }
    };

    return (
      <Col xs={24} sm={24} md={12} lg={12} xl={9} xxl={9} key={event._id} style={{ marginBottom: '16px', marginTop: '16px' }}>
        <Card
          title={event.eventName}
          actions={[
            <Button type="" block icon={<EditOutlined />} onClick={editEventDetails}>
              Edit
            </Button>,
            <Button type="danger" block icon={<DeleteOutlined />} onClick={() => deleteEvent(event._id)}>
              Delete
            </Button>,
            <Button type="info" block onClick={() => downloadAttendeesData(event._id,event.eventName)} icon={<DownloadOutlined />}>
              User Data
            </Button>,
          ]}
        >
          <Meta title={<strong>Event Date:</strong>} description={event.eventDate} />
          <Meta title={<strong>Event Type:</strong>} description={event.eventMode} />
        </Card>
      </Col>
    );
  };

  return (
    <div className="my-events-container" style={{ marginTop: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Manage Your Events</h2>

      {loading ? (
        <div className="loading-spinner" style={{ textAlign: 'center', marginTop: '20px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <div style={{ padding: '0 10px' }}>
          <Row gutter={[16, 16]} justify="center">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </Row>
        </div>
      )}
      <Toaster position="bottom-right" />

      {/* ... (your existing code for confirmation modals) */}
    </div>
  );
};

export default ManageEvents;

