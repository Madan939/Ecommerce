import React, { useState,useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
const Billlist = ({ customer, idx }) => {
  const { createdAt, customername, customerphone, totalamount, item, subtotal, tax } = customer;
  const [isOpen, setIsOpen] = useState(false);
const componentRef=useRef()

  const openModal = () => {
    setIsOpen(true);
  };
  const handleprint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <tr className='text-center'>
        <td>{idx + 1}</td>
        <td>{customername}</td>
        <td>{customerphone}</td>
        <td>${totalamount}</td>
        <td>{createdAt}</td>
        <td>
          <button type="button" className="btn btn-primary" onClick={openModal}>
            Print Bill
          </button>
        </td>
      </tr>
      {isOpen && (
        <div  className="modal fade show" tabIndex="1" aria-labelledby="exampleModalLabel" aria-modal="true" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body"ref={componentRef} >
                <div className='card'>
                  <div className='container'>
                    <p className='h4 text-center mt-2'>Invoice</p><br />
                    <div className="d-flex justify-content-between">
                      <div><strong>Invoice number:</strong></div>
                      <div>{idx + 1}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div><strong>Customer name:</strong></div>
                      <div>{customername}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div><strong>Customer phone:</strong></div>
                      <div>{customerphone}</div>
                    </div>
                    <hr/>
                    <table className='table table-bordered'>
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item && item.map((list) => (
                          <tr key={list._id}>
                            <td>{list.name}</td>
                            <td>${list.price}</td>
                            <td>{list.quantity}</td>
                            <td>${list.price * list.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-between">
                      <div>Subtotal:</div>
                      <div>${subtotal}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>Tax:</div>
                      <div>${tax}</div>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <div>Totalamount:</div>
                      <div>${totalamount}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsOpen(false)} aria-label="Close">Close</button>
                <button type="button" className="btn btn-success">Download</button>
                <button type="button" className="btn btn-primary" onClick={handleprint}>Print Bills</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Billlist;
