import React, { useState } from "react";
import { Table, Button, Form, FormControl } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import "../AddItem/AddItem.css"; // Reusing the same CSS

const AddCourtOffice = () => {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingKey, setEditingKey] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (title.trim() === "") return;
    setItems([...items, { key: items.length + 1, title }]);
    setTitle("");
  };

  const handleEdit = (key) => {
    setEditingKey(key);
    const itemToEdit = items.find((item) => item.key === key);
    if (itemToEdit) {
      setTitle(itemToEdit.title);
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.key === editingKey ? { ...item, title } : item
      )
    );
    setEditingKey(null);
    setTitle("");
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  const columns = [
    {
      dataField: "key",
      text: "Serial #",
    },
    {
      dataField: "title",
      text: "Court/Office/Other",
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
      <h2>Add Court/Office/Other</h2>
      <Form
        className="add-item-form"
        onSubmit={editingKey ? handleSaveEdit : handleAddItem}
      >
        <div className="form-container">
          <Form.Group className="form-group">
            <Form.Label>Title</Form.Label>
            <FormControl
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">
            {editingKey ? "Save" : "Add"}
          </Button>
        </div>
      </Form>
      <div className="item-list">
        <h3>COURT/OFFICE/OTHER LIST</h3>
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
                {paginatedItems.map((item) => (
                  <tr key={item.key}>
                    <td>{item.key}</td>
                    <td>{item.title}</td>
                    <td>
                      <Button
                        variant="outline-secondary"
                        onClick={() => handleEdit(item.key)}
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
            Showing {startIndex + 1} to {startIndex + paginatedItems.length} of{" "}
            {filteredItems.length} entries
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
                  prevPage * entriesPerPage < filteredItems.length
                    ? prevPage + 1
                    : prevPage
                )
              }
              disabled={currentPage * entriesPerPage >= filteredItems.length}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourtOffice;
