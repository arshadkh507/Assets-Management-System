import { useState } from "react";
import { Table, Button, Form, FormControl } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import "./AddItem.css";

const AddItem = () => {
  const [category, setCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [minQuantity, setMinQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingKey, setEditingKey] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (
      itemName.trim() === "" ||
      minQuantity.trim() === "" ||
      unit.trim() === "" ||
      category.trim() === ""
    )
      return;
    setItems([
      ...items,
      { key: items.length + 1, category, itemName, minQuantity, unit },
    ]);
    setCategory("");
    setItemName("");
    setMinQuantity("");
    setUnit("");
  };

  const handleEdit = (key) => {
    setEditingKey(key);
    const itemToEdit = items.find((item) => item.key === key);
    if (itemToEdit) {
      setCategory(itemToEdit.category);
      setItemName(itemToEdit.itemName);
      setMinQuantity(itemToEdit.minQuantity);
      setUnit(itemToEdit.unit);
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.key === editingKey
          ? { ...item, category, itemName, minQuantity, unit }
          : item
      )
    );
    setEditingKey(null);
    setCategory("");
    setItemName("");
    setMinQuantity("");
    setUnit("");
  };

  const filteredItems = items.filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  const columns = [
    { title: "Serial #", dataIndex: "key", key: "key" },
    { title: "Item Name", dataIndex: "itemName", key: "itemName" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Min Quantity", dataIndex: "minQuantity", key: "minQuantity" },
    { title: "Unit", dataIndex: "unit", key: "unit" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button onClick={() => handleEdit(record.key)}>
          <FaEdit />
        </Button>
      ),
    },
  ];

  return (
    <div className="add-item-container">
      <h2>Add Item</h2>
      <Form
        className="add-item-form"
        onSubmit={editingKey ? handleSaveEdit : handleAddItem}
      >
        <div className="form-container">
          <Form.Group className="form-group">
            <Form.Label>Select Category</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Stationary">Stationary</option>
              <option value="Miscellaneous">Miscellaneous</option>
              <option value="Court Register">Court Register</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Item Name</Form.Label>
            <FormControl
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Item Name"
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Min Quantity</Form.Label>
            <FormControl
              type="number"
              value={minQuantity}
              onChange={(e) => setMinQuantity(e.target.value)}
              placeholder="Min Quantity"
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Unit</Form.Label>
            <FormControl
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="Unit"
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">
            {editingKey ? "Save" : "Add Item"}
          </Button>
        </div>
      </Form>
      <div className="item-list">
        <h3>ITEM LIST</h3>
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
                    <th key={col.key}>{col.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((item) => (
                  <tr key={item.key}>
                    <td>{item.key}</td>
                    <td>{item.itemName}</td>
                    <td>{item.category}</td>
                    <td>{item.minQuantity}</td>
                    <td>{item.unit}</td>
                    <td>
                      <Button onClick={() => handleEdit(item.key)}>
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

export default AddItem;
