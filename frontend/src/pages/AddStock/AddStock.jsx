import { useState } from "react";
import {
  Table,
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Col,
  Row,
  InputGroup,
} from "react-bootstrap";
import { FaEdit, FaPlus, FaMinus, FaTrash, FaUpload } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../AddItem/AddItem.css";
import "./addstock.css";

const AddStock = () => {
  const [purchaseNo, setPurchaseNo] = useState("");
  const [date, setDate] = useState("");
  const [vendor, setVendor] = useState("");
  const [items, setItems] = useState([
    {
      id: Date.now(),
      category: "",
      item: "",
      itemId: "",
      price: "",
      quantity: "",
      amount: "",
    },
  ]);
  const [grandTotal, setGrandTotal] = useState("");
  const [remarks, setRemarks] = useState("");
  const [file, setFile] = useState(null);
  const [stockList, setStockList] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        category: "",
        item: "",
        itemId: "",
        price: "",
        quantity: "",
        amount: "",
      },
    ]);
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleChange = (e, index, field) => {
    const newItems = [...items];
    newItems[index][field] = e.target.value;
    setItems(newItems);
  };

  const handleSelectChange = (e, index, field) => {
    const newItems = [...items];
    newItems[index][field] = e.target.value;
    setItems(newItems);
  };

  const handleImageChange = (e) => {
    console.log(e);
    setFile(e.target.files[0]);
  };

  const handleAddToStockList = () => {
    if (!purchaseNo || !date || !vendor || !grandTotal || !remarks || !file) {
      alert("Please fill all fields and upload a file.");
      return;
    }

    setStockList([
      ...stockList,
      {
        key: stockList.length + 1,
        purchaseNo,
        date,
        vendor,
        items,
        grandTotal,
        remarks,
        file,
      },
    ]);

    // Reset form
    setPurchaseNo("");
    setDate("");
    setVendor("");
    setItems([
      {
        id: Date.now(),
        category: "",
        item: "",
        itemId: "",
        price: "",
        quantity: "",
        amount: "",
      },
    ]);
    setGrandTotal("");
    setRemarks("");
    setFile(null);
  };

  const handleEditItem = (record) => {
    console.log("Edit record:", record);
  };

  const handleDeleteItem = (record) => {
    setStockList(stockList.filter((item) => item.key !== record.key));
  };

  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedStockList = stockList.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  const filteredItems = items.filter((item) =>
    item.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  const columns = [
    {
      title: "S.No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Purchase Invoice",
      dataIndex: "purchaseNo",
      key: "purchaseNo",
    },
    {
      title: "Delivery Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
    },
    {
      title: "Items Details",
      key: "items",
      render: (text, record) => (
        <Table bordered size="sm">
          <thead>
            <tr>
              <th>Category</th>
              <th>Item</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {record.items.map((item, idx) => (
              <tr key={idx}>
                <td>{item.category}</td>
                <td>{item.item}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.amount}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleEditItem(item)}
                    className="mr-2"
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteItem(item)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ),
    },
    {
      title: "Grand Total",
      dataIndex: "grandTotal",
      key: "grandTotal",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
    },
    {
      title: "File",
      dataIndex: "file",
      key: "file",
      render: (file) =>
        file ? (
          <a href={URL.createObjectURL(file)} download>
            Download
          </a>
        ) : null,
    },
  ];

  return (
    <div className="add-item-container">
      <h2>Add Stock</h2>
      <div className="input-section p-3">
        <Form>
          <Row>
            <Col lg={4} md={6} sm={12}>
              <FormGroup className="mb-3">
                <FormLabel>Purchase No</FormLabel>
                <FormControl
                  type="text"
                  value={purchaseNo}
                  onChange={(e) => setPurchaseNo(e.target.value)}
                  placeholder="Purchase No"
                />
              </FormGroup>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <FormGroup className="mb-3">
                <FormLabel>Date</FormLabel>
                <FormControl
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Date"
                />
              </FormGroup>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <FormGroup className="mb-3">
                <FormLabel>Vendor</FormLabel>
                <FormControl
                  type="text"
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                  placeholder="Vendor"
                />
              </FormGroup>
            </Col>
          </Row>
          {items.map((item, index) => (
            <Row className="category-shadow p-3 my-2 mx-0" key={item.id}>
              <Col lg={4} md={6} sm={12}>
                <FormGroup className="mb-3">
                  <FormLabel>Category</FormLabel>
                  <FormControl
                    as="select"
                    htmlSize={3}
                    value={item.category}
                    onChange={(e) => handleSelectChange(e, index, "category")}
                  >
                    <option>Select Category</option>
                    {Array(3)
                      .fill(null)
                      .map((_, i) => (
                        <option key={i} value={`Category ${i + 1}`}>
                          Category {i + 1}
                        </option>
                      ))}
                  </FormControl>
                </FormGroup>
              </Col>
              <Col lg={4} md={6} sm={12}>
                <FormGroup className="mb-3">
                  <FormLabel>Item</FormLabel>
                  <FormControl
                    as="select"
                    htmlSize={3}
                    value={item.item}
                    onChange={(e) => handleSelectChange(e, index, "item")}
                  >
                    <option>Select Item</option>
                    {Array(3)
                      .fill(null)
                      .map((_, i) => (
                        <option key={i} value={`Item ${i + 1}`}>
                          Item {i + 1}
                        </option>
                      ))}
                  </FormControl>
                </FormGroup>
              </Col>
              <Col lg={4} md={6} sm={12}>
                <FormGroup className="mb-3">
                  <FormLabel>Item ID</FormLabel>
                  <FormControl
                    type="text"
                    value={item.itemId}
                    onChange={(e) => handleChange(e, index, "itemId")}
                    placeholder="Item ID"
                  />
                </FormGroup>
              </Col>
              <Col lg={4} md={6} sm={12}>
                <FormGroup className="mb-3">
                  <FormLabel>Price/Unit</FormLabel>
                  <FormControl
                    type="text"
                    value={item.price}
                    onChange={(e) => handleChange(e, index, "price")}
                    placeholder="Price"
                  />
                </FormGroup>
              </Col>
              <Col lg={4} md={6} sm={12}>
                <FormGroup className="mb-3">
                  <FormLabel>Quantity</FormLabel>
                  <FormControl
                    type="text"
                    value={item.quantity}
                    onChange={(e) => handleChange(e, index, "quantity")}
                    placeholder="Quantity"
                  />
                </FormGroup>
              </Col>
              <Col lg={4} md={6} sm={12}>
                <FormGroup className="mb-3">
                  <FormLabel>Amount</FormLabel>
                  <FormControl
                    type="text"
                    value={item.amount}
                    onChange={(e) => handleChange(e, index, "amount")}
                    placeholder="Amount"
                  />
                </FormGroup>
              </Col>
              {items.length > 1 && (
                <Button
                  variant="outline-danger"
                  onClick={() => handleRemoveItem(item.id)}
                  className="remove-item-btn"
                >
                  <FaMinus />
                </Button>
              )}
            </Row>
          ))}
          <Button variant="outline-primary" onClick={handleAddItem}>
            <FaPlus /> Add Item
          </Button>
          <Row>
            <Col lg={4} md={6} sm={12}>
              <FormGroup className="mb-3">
                <FormLabel>Grand Total</FormLabel>
                <FormControl
                  type="text"
                  value={grandTotal}
                  onChange={(e) => setGrandTotal(e.target.value)}
                  placeholder="Grand Total"
                />
              </FormGroup>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <FormGroup className="mb-3">
                <FormLabel>Remarks</FormLabel>
                <FormControl
                  as="textarea"
                  rows={3}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Remarks"
                />
              </FormGroup>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <FormGroup className="mb-3">
                <FormLabel>Upload File</FormLabel>
                <InputGroup>
                  <FormControl type="file" onChange={handleImageChange} />
                  <InputGroup.Text>
                    <FaUpload />
                  </InputGroup.Text>
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
          <Button variant="success" onClick={handleAddToStockList}>
            Add to Stock List
          </Button>
        </Form>
      </div>

      {/* 
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
      </div> */}

      <div className="item-list">
        <h3>Stock List</h3>

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
            <Table bordered hover>
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th key={col.key}>{col.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedStockList
                  .filter(
                    (record) =>
                      record.purchaseNo.includes(searchTerm) ||
                      record.vendor.includes(searchTerm) ||
                      record.date.includes(searchTerm)
                  )
                  .map((record) => (
                    <tr key={record.key}>
                      <td>{record.key}</td>
                      <td>{record.purchaseNo}</td>
                      <td>{record.date}</td>
                      <td>{record.vendor}</td>
                      <td>
                        <Table bordered size="sm">
                          <thead>
                            <tr>
                              <th>Category</th>
                              <th>Item</th>
                              <th>Price</th>
                              <th>Qty</th>
                              <th>Amount</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {record.items.map((item, idx) => (
                              <tr key={idx}>
                                <td>{item.category}</td>
                                <td>{item.item}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.amount}</td>
                                <td>
                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => handleEditItem(item)}
                                    className="mr-2"
                                  >
                                    <FaEdit />
                                  </Button>
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDeleteItem(item)}
                                  >
                                    <FaTrash />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </td>
                      <td>{record.grandTotal}</td>
                      <td>{record.remarks}</td>
                      <td>
                        {record.file ? (
                          <a href={URL.createObjectURL(record.file)} download>
                            Download
                          </a>
                        ) : null}
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

export default AddStock;
