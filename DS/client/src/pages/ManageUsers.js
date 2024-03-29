import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'antd';
import { Toaster, toast } from 'react-hot-toast';
const { Column } = Table;

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/waitingList/manageWaitingList`);
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const modalHandleClose = () => {
    setIsOpen(false);
    setSelectedUser(null);
  };

  const modalHandleOpen = (user) => {
    setIsOpen(true);
    setSelectedUser(user);
  };

  const handleAcceptInvitation = async (user) => {
    try {
      await new Promise((resolve) => {
        Modal.confirm({
          title: 'Confirmation',
          content: 'Are you sure you want to accept this invitation?',
          onOk: async () => {
            try {
              setLoading(true);
  
              const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/waitingList/manageWaitingList/${user._id}/accept`, {
                method: 'POST',
              });
  
              const data = await response.json();
              console.log(data);
  
              toast.success('Invitation accepted successfully.');
  
              // Update the users state to remove the accepted user
              setUsers((prevUsers) => prevUsers.filter((u) => u._id !== user._id));
  
              modalHandleClose();
            } catch (error) {
              console.error('Error accepting invitation:', error);
              toast.error('Error accepting invitation. Please try again.');
            } finally {
              setLoading(false);
              resolve(); // Resolve the promise to close the modal
            }
          },
          onCancel: () => {
            resolve(); // Resolve the promise to close the modal
          },
        });
      });
    } catch (error) {
      console.error('Error showing confirmation dialog:', error);
    }
  };
  
  

  const handleRejectInvitation = async (user) => {
    try {
      await new Promise((resolve) => {
        Modal.confirm({
          title: 'Confirmation',
          content: 'Are you sure you want to reject this invitation? This action cannot be undone.',
          onOk: async () => {
            try {
              setLoading(true);
  
              const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/waitingList/manageWaitingList/${user._id}/reject`, {
                method: 'POST',
              });
  
              const data = await response.json();
              console.log(data);
  
              toast.success('Invitation rejected successfully.');
  
              // Update the users state to remove the rejected user
              setUsers((prevUsers) => prevUsers.filter((u) => u._id !== user._id));
  
              modalHandleClose();
            } catch (error) {
              console.error('Error rejecting invitation:', error);
              toast.error('Error rejecting invitation. Please try again.');
            } finally {
              setLoading(false);
              resolve(); // Resolve the promise to close the modal
            }
          },
          onCancel: () => {
            resolve(); // Resolve the promise to close the modal
          },
        });
      });
    } catch (error) {
      console.error('Error showing rejection confirmation dialog:', error);
    }
  };
  
  

  return (
    <div className="container">
      <h2 className="text-center mb-4">Manage Users</h2>
        <Table dataSource={users} rowKey={(record) => record.userId}>
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="Event Name" dataIndex="eventName" key="eventName" />
          <Column title="Event ID" dataIndex="eventId" key="eventId" />
          <Column
            title="Actions"
            key="actions"
            render={(text, record) => (
              <>
                <Button
                  type="primary"
                  onClick={() => handleAcceptInvitation(record)}
                  loading={loading && selectedUser === record}
                >
                  Accept
                </Button>{' '}
                <Button
                  type="danger"
                  onClick={() => handleRejectInvitation(record)}
                  loading={loading && selectedUser === record}
                >
                  Reject
                </Button>
              </>
            )}
          />
        </Table>
        <Toaster position='bottom-right' style={{ marginTop: '80px' }}></Toaster>
    </div>
  );
};

export default ManageUsers;

