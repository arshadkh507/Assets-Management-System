import React, { useState } from "react";
import {
  Table,
  Button,
  Form,
  InputGroup,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";
import { FaEdit, FaTrash, FaUpload } from "react-icons/fa";
import "../AddItem/AddItem.css"; // Import your custom CSS if needed

const AddUser = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [cnic, setCnic] = useState("");
  const [image, setImage] = useState(null);
  const [users, setUsers] = useState([]);
  const [editingKey, setEditingKey] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (
      !role.trim() ||
      !name.trim() ||
      !password.trim() ||
      !email.trim() ||
      !mobile.trim() ||
      !cnic.trim() ||
      !image
    ) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      alert("A user with this email already exists.");
      return;
    }

    setUsers([
      ...users,
      {
        key: users.length + 1,
        role,
        name,
        password,
        email,
        mobile,
        cnic,
        image,
      },
    ]);
    alert("User added successfully.");
    resetForm();
  };

  const handleEdit = (key) => {
    setEditingKey(key);
    const userToEdit = users.find((user) => user.key === key);
    if (userToEdit) {
      setRole(userToEdit.role);
      setName(userToEdit.name);
      setPassword(userToEdit.password);
      setEmail(userToEdit.email);
      setMobile(userToEdit.mobile);
      setCnic(userToEdit.cnic);
      setImage(userToEdit.image);
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.key === editingKey
          ? {
              ...user,
              role,
              name,
              password,
              email,
              mobile,
              cnic,
              image,
            }
          : user
      )
    );
    resetForm();
    setEditingKey(null);
  };

  const handleDelete = (key) => {
    setUsers(users.filter((user) => user.key !== key));
  };

  const resetForm = () => {
    setRole("");
    setName("");
    setPassword("");
    setEmail("");
    setMobile("");
    setCnic("");
    setImage(null);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={URL.createObjectURL(image)}
          alt="User"
          style={{ width: 100, height: 100 }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Bio",
      key: "bio",
      render: (text, record) => (
        <div>
          <div>Mobile: {record.mobile}</div>
          <div>Email: {record.email}</div>
          <div>CNIC: {record.cnic}</div>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button
            variant="warning"
            onClick={() => handleEdit(record.key)}
            style={{ marginRight: 10 }}
          >
            <FaEdit />
          </Button>
          <Button variant="danger" onClick={() => handleDelete(record.key)}>
            <FaTrash />
          </Button>
        </div>
      ),
    },
  ];

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="add-item-container">
      <h2>Add User</h2>
      <Form
        className="add-item-form"
        onSubmit={(e) => (editingKey ? handleSaveEdit(e) : handleAddUser(e))}
      >
        <Row>
          <Col lg={4} md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Select Role</Form.Label>
              <Form.Control
                as="select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </Form.Group>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </Form.Group>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </Form.Group>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Mobile"
              />
            </Form.Group>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>CNIC</Form.Label>
              <Form.Control
                type="text"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                placeholder="CNIC"
              />
            </Form.Group>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <InputGroup>
                <FormControl
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() =>
                    document.querySelector('input[type="file"]').click()
                  }
                >
                  <FaUpload />
                </Button>
              </InputGroup>
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  style={{ width: 100, height: 100, marginTop: 10 }}
                />
              )}
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" style={{ width: "100%" }}>
          {editingKey ? "Save" : "Add User"}
        </Button>
      </Form>
      <div className="item-list mt-4">
        <h3>USER LIST</h3>
        <div className="table-controls mb-3">
          <div className="d-flex align-items-center">
            <Form.Label className="me-2">Show</Form.Label>
            <Form.Control
              as="select"
              defaultValue="10"
              style={{ width: "auto", marginRight: "10px" }}
              onChange={(e) => {
                setEntriesPerPage(parseInt(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </Form.Control>
            <Form.Label>entries</Form.Label>
          </div>
          <div className="ms-auto">
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
        <div className="table-wrapper">
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th key={col.key}>{col.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user.key}>
                    {columns.map((col) => (
                      <td key={col.key}>
                        {col.key === "actions" ? (
                          <div>
                            <Button
                              variant="warning"
                              onClick={() => handleEdit(user.key)}
                              style={{ marginRight: 10 }}
                            >
                              <FaEdit />
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => handleDelete(user.key)}
                            >
                              <FaTrash />
                            </Button>
                          </div>
                        ) : col.key === "image" ? (
                          <img
                            src={URL.createObjectURL(user.image)}
                            alt="User"
                            style={{ width: 100, height: 100 }}
                          />
                        ) : col.key === "bio" ? (
                          <div>
                            <div>Mobile: {user.mobile}</div>
                            <div>Email: {user.email}</div>
                            <div>CNIC: {user.cnic}</div>
                          </div>
                        ) : (
                          user[col.key]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="pagination-info d-flex justify-content-between align-items-center mt-3">
          <div>
            Showing {startIndex + 1} to {startIndex + paginatedUsers.length} of{" "}
            {filteredUsers.length} entries
          </div>
          <div>
            <Button
              variant="secondary"
              onClick={() =>
                setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
              }
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button variant="secondary" disabled className="mx-2">
              {currentPage}
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                setCurrentPage((prevPage) =>
                  prevPage * entriesPerPage < filteredUsers.length
                    ? prevPage + 1
                    : prevPage
                )
              }
              disabled={currentPage * entriesPerPage >= filteredUsers.length}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
