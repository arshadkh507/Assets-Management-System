import React, { useState } from "react";
import { Table, Button, Form, FormControl } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import "../AddItem/AddItem.css"; // Reusing the same CSS

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingKey, setEditingKey] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (categoryName.trim() === "") return;
    setCategories([
      ...categories,
      { key: categories.length + 1, categoryName },
    ]);
    setCategoryName("");
  };

  const handleEdit = (key) => {
    setEditingKey(key);
    const categoryToEdit = categories.find((category) => category.key === key);
    if (categoryToEdit) {
      setCategoryName(categoryToEdit.categoryName);
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.key === editingKey ? { ...category, categoryName } : category
      )
    );
    setEditingKey(null);
    setCategoryName("");
  };

  const filteredCategories = categories.filter((category) =>
    category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedCategories = filteredCategories.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  const columns = [
    {
      dataField: "key",
      text: "Serial #",
    },
    {
      dataField: "categoryName",
      text: "Category Name",
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cell, row) => (
        <Button variant="outline-secondary" onClick={() => handleEdit(row.key)}>
          <FaEdit />
        </Button>
      ),
    },
  ];

  return (
    <div className="add-item-container">
      <h2>Add Category</h2>
      <Form
        className="add-item-form"
        onSubmit={editingKey ? handleSaveEdit : handleAddCategory}
      >
        <div className="form-container">
          <Form.Group className="form-group">
            <Form.Label>Category Name</Form.Label>
            <FormControl
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Category Name"
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">
            {editingKey ? "Save" : "Add Category"}
          </Button>
        </div>
      </Form>
      <div className="item-list">
        <h3>CATEGORY TYPE LIST</h3>
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
            <Table bordered>
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th key={col.dataField}>{col.text}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedCategories.map((category) => (
                  <tr key={category.key}>
                    <td>{category.key}</td>
                    <td>{category.categoryName}</td>
                    <td>
                      <Button
                        variant="outline-secondary"
                        onClick={() => handleEdit(category.key)}
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
        <div className="pagination-info">
          <div>
            Showing {startIndex + 1} to{" "}
            {startIndex + paginatedCategories.length} of{" "}
            {filteredCategories.length} entries
          </div>
          <div>
            <Button
              onClick={() =>
                setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
              }
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button>{currentPage}</Button>
            <Button
              onClick={() =>
                setCurrentPage((prevPage) =>
                  prevPage * entriesPerPage < filteredCategories.length
                    ? prevPage + 1
                    : prevPage
                )
              }
              disabled={
                currentPage * entriesPerPage >= filteredCategories.length
              }
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
