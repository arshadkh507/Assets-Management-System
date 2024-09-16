import React, { useState } from "react";
import {
  Form,
  Button,
  InputGroup,
  FormControl,
  Table,
  Row,
  Col,
  Image,
  Dropdown,
  DropdownButton,
  Pagination,
} from "react-bootstrap";
import { FaUpload, FaEdit } from "react-icons/fa";
import "../AddItem/AddItem.css";

const AddVendor = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [cnic, setCnic] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingKey, setEditingKey] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddVendor = (e) => {
    e.preventDefault();
    if (
      !name.trim() ||
      !mobile.trim() ||
      !cnic.trim() ||
      !email.trim() ||
      !image
    ) {
      alert("Please fill all fields and upload an image.");
      return;
    }
    setVendors([
      ...vendors,
      {
        key: vendors.length + 1,
        name,
        mobile,
        cnic,
        email,
        image,
      },
    ]);
    resetForm();
  };

  const handleEdit = (key) => {
    setEditingKey(key);
    const vendorToEdit = vendors.find((vendor) => vendor.key === key);
    if (vendorToEdit) {
      setName(vendorToEdit.name);
      setMobile(vendorToEdit.mobile);
      setCnic(vendorToEdit.cnic);
      setEmail(vendorToEdit.email);
      setImage(vendorToEdit.image);
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setVendors((prevVendors) =>
      prevVendors.map((vendor) =>
        vendor.key === editingKey
          ? {
              ...vendor,
              name,
              mobile,
              cnic,
              email,
              image,
            }
          : vendor
      )
    );
    resetForm();
    setEditingKey(null);
  };

  const resetForm = () => {
    setName("");
    setMobile("");
    setCnic("");
    setEmail("");
    setImage(null);
  };

  const filteredVendors = vendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedVendors = filteredVendors.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="container mt-4">
      <h2>Add Vendor</h2>
      <Form onSubmit={editingKey ? handleSaveEdit : handleAddVendor}>
        <div className="form-container">
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>CNIC</Form.Label>
            <Form.Control
              type="text"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              placeholder="CNIC"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <InputGroup>
              <FormControl
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <Button variant="outline-secondary">
                <FaUpload /> Upload Image
              </Button>
            </InputGroup>
            {image && (
              <Image
                src={URL.createObjectURL(image)}
                alt="Selected"
                thumbnail
                style={{ width: 100, height: 100, marginTop: 10 }}
              />
            )}
          </Form.Group>
          <Button type="submit" variant="primary" style={{ width: "100%" }}>
            {editingKey ? "Save" : "Add Vendor"}
          </Button>
        </div>
      </Form>

      <div className="mt-4">
        <h3>Vendors List</h3>

        <div className="table-controls">
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
                  <th>Mobile</th>
                  <th>CNIC</th>
                  <th>Email</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedVendors.map((vendor) => (
                  <tr key={vendor.key}>
                    <td>{vendor.key}</td>
                    <td>{vendor.name}</td>
                    <td>{vendor.mobile}</td>
                    <td>{vendor.cnic}</td>
                    <td>{vendor.email}</td>
                    <td>
                      <Image
                        src={URL.createObjectURL(vendor.image)}
                        alt="Vendor"
                        thumbnail
                        style={{ width: 100, height: 100 }}
                      />
                    </td>
                    <td>
                      <Button
                        variant="link"
                        onClick={() => handleEdit(vendor.key)}
                      >
                        <FaEdit />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            Showing {startIndex + 1} to {startIndex + paginatedVendors.length}{" "}
            of {filteredVendors.length} entries
          </div>
          <Pagination>
            <Pagination.Prev
              onClick={() =>
                setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
              }
              disabled={currentPage === 1}
            />
            <Pagination.Item>{currentPage}</Pagination.Item>
            <Pagination.Next
              onClick={() =>
                setCurrentPage((prevPage) =>
                  prevPage * entriesPerPage < filteredVendors.length
                    ? prevPage + 1
                    : prevPage
                )
              }
              disabled={currentPage * entriesPerPage >= filteredVendors.length}
            />
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default AddVendor;
