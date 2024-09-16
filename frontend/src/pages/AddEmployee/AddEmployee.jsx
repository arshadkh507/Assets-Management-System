import React, { useState } from "react";
import {
  Table,
  Button,
  Form,
  InputGroup,
  FormControl,
  Col,
  Row,
  Image,
  Container,
  Pagination,
} from "react-bootstrap";
import "./AddEmployee.css";

const AddEmployee = () => {
  const [courtOfficeOther, setCourtOfficeOther] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [cnic, setCnic] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [image, setImage] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingKey, setEditingKey] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (
      !name.trim() ||
      !mobile.trim() ||
      !cnic.trim() ||
      !email.trim() ||
      !designation.trim() ||
      !courtOfficeOther.trim() ||
      !image
    ) {
      alert("Please fill all fields and upload an image.");
      return;
    }
    setEmployees([
      ...employees,
      {
        key: employees.length + 1,
        courtOfficeOther,
        name,
        mobile,
        cnic,
        email,
        designation,
        image,
      },
    ]);
    resetForm();
  };

  const handleEdit = (key) => {
    setEditingKey(key);
    const employeeToEdit = employees.find((employee) => employee.key === key);
    if (employeeToEdit) {
      setCourtOfficeOther(employeeToEdit.courtOfficeOther);
      setName(employeeToEdit.name);
      setMobile(employeeToEdit.mobile);
      setCnic(employeeToEdit.cnic);
      setEmail(employeeToEdit.email);
      setDesignation(employeeToEdit.designation);
      setImage(employeeToEdit.image);
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.key === editingKey
          ? {
              ...employee,
              courtOfficeOther,
              name,
              mobile,
              cnic,
              email,
              designation,
              image,
            }
          : employee
      )
    );
    resetForm();
    setEditingKey(null);
  };

  const resetForm = () => {
    setCourtOfficeOther("");
    setName("");
    setMobile("");
    setCnic("");
    setEmail("");
    setDesignation("");
    setImage(null);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Container fluid className="mt-4">
      <h2 className="mb-4">Add Employee</h2>
      <Form
        onSubmit={editingKey ? handleSaveEdit : handleAddEmployee}
        className="shadow p-3 mb-5 bg-white rounded"
      >
        <Row className="mb-3">
          <Form.Group as={Col} xs={12} md={6} lg={4}>
            <Form.Label>Select Court/Office/Other</Form.Label>
            <Form.Control
              as="select"
              value={courtOfficeOther}
              onChange={(e) => setCourtOfficeOther(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="Court A">Court A</option>
              <option value="Office B">Office B</option>
              <option value="Other C">Other C</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} xs={12} md={6} lg={4}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} xs={12} md={6} lg={4}>
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} xs={12} md={6} lg={4}>
            <Form.Label>CNIC</Form.Label>
            <Form.Control
              type="text"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} xs={12} md={6} lg={4}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} xs={12} md={6} lg={4}>
            <Form.Label>Designation</Form.Label>
            <Form.Control
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <InputGroup>
            <FormControl type="file" onChange={handleImageChange} />
          </InputGroup>
          {image && (
            <Image
              src={URL.createObjectURL(image)}
              rounded
              className="mt-3"
              style={{ width: 100, height: 100 }}
            />
          )}
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          {editingKey ? "Save Employee" : "Add Employee"}
        </Button>
      </Form>
      <div className="mt-5 shadow p-3 mb-5 bg-white rounded">
        <h3>EMPLOYEES LIST</h3>
        <div className="table-controls d-flex justify-content-between f-wrap">
          <div className="show-entries">
            Show
            <Form.Control
              as="select"
              defaultValue="10"
              style={{ width: 60, margin: "0 10px" }}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </Form.Control>
            entries
          </div>
          <div className="search-box">
            <FormControl
              placeholder="Search"
              style={{ width: 200 }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="table-wrapper">
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Serial #</th>
                  <th>Name</th>
                  <th>Court/Office/Other</th>
                  <th>Mobile</th>
                  <th>CNIC</th>
                  <th>Email</th>
                  <th>Designation</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEmployees.map((employee) => (
                  <tr key={employee.key}>
                    <td>{employee.key}</td>
                    <td>{employee.name}</td>
                    <td>{employee.courtOfficeOther}</td>
                    <td>{employee.mobile}</td>
                    <td>{employee.cnic}</td>
                    <td>{employee.email}</td>
                    <td>{employee.designation}</td>
                    <td>
                      <Image
                        src={URL.createObjectURL(employee.image)}
                        rounded
                        style={{ width: 50, height: 50 }}
                      />
                    </td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => handleEdit(employee.key)}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <Row className="justify-content-between align-items-center">
          <Col xs={12} md={6}>
            <div>
              Showing {startIndex + 1} to{" "}
              {startIndex + paginatedEmployees.length} of{" "}
              {filteredEmployees.length} entries
            </div>
          </Col>
          <Col xs={12} md={6} className="text-md-right">
            <Pagination className="m-0">
              <Pagination.Prev
                onClick={() =>
                  setCurrentPage((prevPage) =>
                    prevPage > 1 ? prevPage - 1 : 1
                  )
                }
                disabled={currentPage === 1}
              />
              <Pagination.Item>{currentPage}</Pagination.Item>
              <Pagination.Next
                onClick={() =>
                  setCurrentPage((prevPage) =>
                    prevPage * entriesPerPage < filteredEmployees.length
                      ? prevPage + 1
                      : prevPage
                  )
                }
                disabled={
                  currentPage * entriesPerPage >= filteredEmployees.length
                }
              />
            </Pagination>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default AddEmployee;
