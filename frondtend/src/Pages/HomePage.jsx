import React, { useState, useEffect } from 'react';
import Layout from '../Component/Layout/Layout';
import { Form, Modal, Input, Select, message, Table, DatePicker, Button } from 'antd';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaEdit, FaTrash, FaChartPie, FaPlus, FaFilter, FaRedo } from 'react-icons/fa';
import axios from 'axios';
import Spinner from '../Component/Spinner';
import dayjs from 'dayjs'; // for date comparison

const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [alltransection, setAllTrasection] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showChart,setShowChart]=useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // filters
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateRange, setDateRange] = useState([]);
  const [quickFilter, setQuickFilter] = useState('all');

  const columns = [
    { 
      title: 'Date', 
      dataIndex: 'date', 
      key: 'date',
      render: (text) => dayjs(text).format('DD/MM/YYYY')
    },
    { 
      title: 'Amount', 
      dataIndex: 'amount', 
      key: 'amount',
      render: (amount) => `$${amount.toFixed(2)}`,
      sorter: (a, b) => a.amount - b.amount
    },
    { 
      title: 'Type', 
      dataIndex: 'type', 
      key: 'type',
      render: (type) => (
        <span style={{
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 'bold',
          backgroundColor: type === 'income' ? '#d4edda' : '#f8d7da',
          color: type === 'income' ? '#155724' : '#721c24'
        }}>
          {type}
        </span>
      )
    },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Reference', dataIndex: 'refrence', key: 'refrence' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button 
            type="link" 
            icon={<FaEdit />} 
            onClick={() => handleEdit(record)}
            style={{ padding: 0, color: '#1890ff' }}
          >
            Edit
          </Button>
          <Button 
            type="link" 
            danger 
            icon={<FaTrash />} 
            onClick={() => handleDelete(record._id)}
            style={{ padding: 0 }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // Get all transactions
  const getAllTransaction = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      const res = await axios.post('/api/transection/getAllTrasection', { userid: user._id });
      setLoading(false);
      setAllTrasection(res.data);
      setFilteredData(res.data);
    } catch (error) {
      console.log(error);
      message.error('Fetching error');
    }
  };

  useEffect(() => {
    getAllTransaction();
  }, []);

  // Filter logic
  useEffect(() => {
    let data = [...alltransection];
    const today = dayjs();

    // Filter by type
    if (typeFilter !== 'all') {
      data = data.filter((t) => t.type === typeFilter);
    }

    // Quick date filters
    if (quickFilter === 'last3') {
      data = data.filter((t) => dayjs(t.date).isAfter(today.subtract(3, 'day')));
    } else if (quickFilter === 'last7') {
      data = data.filter((t) => dayjs(t.date).isAfter(today.subtract(7, 'day')));
    }

    // Custom date range filter
    if (dateRange.length === 2) {
      const [start, end] = dateRange;
      data = data.filter((t) => {
        const d = dayjs(t.date);
        return d.isAfter(start) && d.isBefore(end);
      });
    }

    setFilteredData(data);
  }, [typeFilter, quickFilter, dateRange, alltransection]);

  // Handle Edit
  const handleEdit = (record) => {
    setEditingTransaction(record);
    setIsEditMode(true);
    form.setFieldsValue({
      ...record,
      date: record.date ? dayjs(record.date).format('YYYY-MM-DD') : ''
    });
    setShowModal(true);
  };

  // Handle Delete
  const handleDelete = async (transactionId) => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/transection/deleteTransection', { 
        transactionId 
      });
      if (data?.success) {
        message.success(data.message || 'Transaction deleted successfully');
        getAllTransaction();
      } else {
        message.error(data?.message || 'Failed to delete transaction');
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Error deleting transaction');
    } finally {
      setLoading(false);
    }
  };

  //  Form submit
  const handleSubmit = async (value) => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      setLoading(true);
      let data;
      
      if (isEditMode && editingTransaction) {
        // Update existing transaction
        const response = await axios.post('/api/transection/updateTransection', {
          ...value,
          transactionId: editingTransaction._id,
          userid: user._id
        });
        data = response.data;
      } else {
        // Add new transaction
        const response = await axios.post('/api/transection/addTransection', { 
          ...value, 
          userid: user._id 
        });
        data = response.data;
      }
      
      if (data?.success) {
        form.resetFields();
        setShowModal(false);
        setIsEditMode(false);
        setEditingTransaction(null);
        message.success(data.message || 'Transaction saved successfully');
        getAllTransaction();
      } else {
        message.error(data?.message || 'Failed to save transaction');
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Error while submitting the form');
    } finally {
      setLoading(false);
    }
  };

  // 🥧 Pie chart data
  const income = filteredData
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = filteredData
    .filter((t) => t.type === 'Expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expenses;

  const pieData = [
    { name: 'Income', value: income },
    { name: 'Expenses', value: expenses },
  ];

  const COLORS = ['#52c41a', '#ff4d4f'];

  return (
    <Layout>
      {loading && <Spinner />}

      {/* Summary Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '25px',
          borderRadius: '12px',
          color: 'white',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>Total Income</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>${income.toFixed(2)}</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          padding: '25px',
          borderRadius: '12px',
          color: 'white',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>Total Expenses</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>${expenses.toFixed(2)}</div>
        </div>

        <div style={{
          background: balance >= 0 
            ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
            : 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          padding: '25px',
          borderRadius: '12px',
          color: 'white',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>Balance</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>${balance.toFixed(2)}</div>
        </div>
      </div>

      {/*  Filter Section */}
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '25px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
          <FaFilter style={{ color: '#1890ff', fontSize: '18px' }} />
          {/* Quick Date Filter */}
          <Select value={quickFilter} onChange={setQuickFilter} style={{ width: 140 }} placeholder="Quick Filter">
            <Select.Option value="all">All Time</Select.Option>
            <Select.Option value="last3">Last 3 Days</Select.Option>
            <Select.Option value="last7">Last 7 Days</Select.Option>
          </Select>

          {/* Custom Date Range */}
          <RangePicker onChange={(values) => setDateRange(values || [])} />

          {/* Type Filter */}
          <Select value={typeFilter} onChange={setTypeFilter} style={{ width: 120 }} placeholder="Type">
            <Select.Option value="all">All Types</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="Expense">Expense</Select.Option>
          </Select>

          <Button 
            icon={<FaRedo />} 
            onClick={() => { 
              setQuickFilter('all'); 
              setTypeFilter('all'); 
              setDateRange([]); 
            }}
            style={{ borderRadius: '6px' }}
          >
            Reset
          </Button>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Button 
            type="default"
            icon={<FaChartPie />}
            onClick={() => setShowChart(!showChart)}
            style={{ borderRadius: '6px' }}
          >
            {showChart ? 'Hide Chart' : 'Show Chart'}
          </Button>
          <Button 
            type="primary" 
            icon={<FaPlus />}
            onClick={() => {
              setIsEditMode(false);
              setEditingTransaction(null);
              form.resetFields();
              setShowModal(true);
            }}
            style={{ borderRadius: '6px' }}
          >
            Add Transaction
          </Button>
        </div>
      </div>

      {/* 🥧 Analytics Section */}
      {showChart && (
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '25px'
        }}>
          <h4 style={{ marginBottom: '20px', color: '#262626' }}>Income vs Expenses Chart</h4>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label={(entry) => `${entry.name}: $${entry.value.toFixed(2)}`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Data Table */}
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h4 style={{ marginBottom: '20px', color: '#262626' }}>Transactions</h4>
        <Table 
          dataSource={filteredData} 
          columns={columns} 
          rowKey="_id"
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} transactions`
          }}
          style={{ borderRadius: '8px' }}
        />
      </div>

      {/* Modal for Add/Edit Transaction */}
      <Modal 
        title={
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#262626' }}>
            {isEditMode ? "✏️ Edit Transaction" : "➕ Add Transaction"}
          </div>
        }
        open={showModal} 
        onCancel={() => {
          setShowModal(false);
          setIsEditMode(false);
          setEditingTransaction(null);
          form.resetFields();
        }} 
        footer={false}
        width={600}
        style={{ top: 50 }}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item 
            label={<span style={{ fontWeight: '500' }}>Amount</span>} 
            name="amount"
            rules={[{ required: true, message: 'Please enter amount!' }]}
          >
            <Input type="number" placeholder="Enter amount" style={{ borderRadius: '6px' }} />
          </Form.Item>
          
          <Form.Item 
            label={<span style={{ fontWeight: '500' }}>Type</span>} 
            name="type"
            rules={[{ required: true, message: 'Please select type!' }]}
          >
            <Select placeholder="Select type" style={{ borderRadius: '6px' }}>
              <Select.Option value="income">💰 Income</Select.Option>
              <Select.Option value="Expense">💸 Expense</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item 
            label={<span style={{ fontWeight: '500' }}>Category</span>} 
            name="category"
            rules={[{ required: true, message: 'Please select category!' }]}
          >
            <Select placeholder="Select category" style={{ borderRadius: '6px' }}>
              <Select.Option value="salary">💼 Salary</Select.Option>
              <Select.Option value="food">🍔 Food</Select.Option>
              <Select.Option value="loan">🏦 Loan</Select.Option>
              <Select.Option value="movie">🎬 Movie</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item 
            label={<span style={{ fontWeight: '500' }}>Reference</span>} 
            name="refrence"
            rules={[{ required: true, message: 'Please enter reference!' }]}
          >
            <Input placeholder="Enter reference" style={{ borderRadius: '6px' }} />
          </Form.Item>
          
          <Form.Item 
            label={<span style={{ fontWeight: '500' }}>Description</span>} 
            name="description"
            rules={[{ required: true, message: 'Please enter description!' }]}
          >
            <Input.TextArea 
              placeholder="Enter description" 
              rows={3}
              style={{ borderRadius: '6px' }}
            />
          </Form.Item>
          
          <Form.Item 
            label={<span style={{ fontWeight: '500' }}>Date</span>} 
            name="date"
            rules={[{ required: true, message: 'Please select date!' }]}
          >
            <Input type="date" style={{ borderRadius: '6px' }} />
          </Form.Item>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <Button 
              onClick={() => {
                setShowModal(false);
                setIsEditMode(false);
                setEditingTransaction(null);
                form.resetFields();
              }}
              style={{ borderRadius: '6px' }}
            >
              Cancel
            </Button>
            <Button 
              type="primary" 
              htmlType="submit"
              style={{ borderRadius: '6px' }}
            >
              {isEditMode ? 'Update' : 'Save'} Transaction
            </Button>
          </div>
        </Form>
      </Modal>

    </Layout>
  );
};

export default HomePage;
