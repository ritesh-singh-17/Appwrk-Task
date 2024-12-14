import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, Table } from 'react-bootstrap'

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: 'credit',
    amount: 0,
    description: ''
  })

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.log(error)
      }
    }

    fetchTransactions();
  }, [])

  const addTransaction = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/transactions', {
        description: newTransaction.description,
        type: newTransaction.type,
        amount: newTransaction.amount
      });
      alert("Transaction is added successfully")
      setTransactions([response.data, ...transactions ]);
      setNewTransaction({ type: 'credit', amount: 0, description: '' });
      setShowModal(false);
    } catch (error) {
      alert(error?.response?.data?.message)
      console.log(error)
    }
  }

  const clearAllTransactions = async () => {
    try {
      const response = await axios.delete('http://localhost:5000/api/transactions');
      alert("All transactions are deleted successfully")
      setTransactions([]);
    } catch (error) {
      alert(error?.response?.data?.message)
      console.log(error)
    }
  }

  return (
    <>
      <div className=' container d-flex flex-column my-5'>
      <div className='header d-flex justify-content-between mb-5'>
        <h2>Office Transactions</h2>
        <div className='d-flex gap-2'>
        <div className='btn btn-danger' onClick={clearAllTransactions}>Clear all transactions</div>
        <button className='btn btn-primary' onClick={() => setShowModal(true)}>+ Add Transaction</button>
        </div>
      </div>
        <Table bordered stripped>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Credit</th>
              <th>Debit</th>
              <th>Running Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
              return (
                <tr key={transaction._id}>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.credit}</td>
                  <td>{transaction.debit}</td>
                  <td>{transaction.runningBalance}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>

        <Modal show={showModal}>
          <Modal.Header>
            <Modal.Title>New Transaction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className=' d-flex flex-column gap-4'>
              <div className=' d-flex justify-content-between'>
                <label>Tramsaction Type: </label>
                <select className='w-50' value={newTransaction.type} onChange={(e) => {
                  setNewTransaction({...newTransaction, type: e.target.value })
                }} >
                  <option value='credit'>Credit</option>
                  <option value='debit'>Debit</option>
                </select>
              </div>
              <div className=' d-flex justify-content-between'>
                <label>Amount</label>
                <input className='w-50' type='number' value={newTransaction.amount} onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })} />
              </div>
              <div className=' d-flex justify-content-between'>
                <label>Description</label>
                <textarea className='w-50' placeholder='Description' value={newTransaction.description} onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}></textarea>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button className='btn btn-danger' onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button className='btn btn-primary' onClick={addTransaction}>
              Add Transaction
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default App
