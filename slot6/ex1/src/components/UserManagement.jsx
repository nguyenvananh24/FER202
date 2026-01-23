import React, { useState } from "react";
import {
  Table,
  Button,
  Badge,
  Image,
  Container,
  Card
} from "react-bootstrap";

import ListOfUsers from "../data/ListOfUsers";

function ManageUser() {
  const [users, setUsers] = useState(Array.isArray(ListOfUsers) ? ListOfUsers : []);

  const handleLock = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "ACTIVE" ? "LOCKED" : "ACTIVE"
            }
          : user
      )
    );
  };

  const handleEdit = (user) => {
    console.log("Edit user:", user);
    // TODO: Implement edit functionality
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>
          <h5 className="mb-0">User Management</h5>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Username</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <Image
                      src={user.avatar}
                      alt={user.username}
                      width="40"
                      height="40"
                      roundedCircle
                    />
                  </td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Badge 
                      bg={user.status === "ACTIVE" ? "success" : "danger"}
                    >
                      {user.status}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant={user.status === "ACTIVE" ? "warning" : "success"}
                      size="sm"
                      className="me-2"
                      onClick={() => handleLock(user.id)}
                    >
                      {user.status === "ACTIVE" ? "Lock" : "Unlock"}
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ManageUser;
