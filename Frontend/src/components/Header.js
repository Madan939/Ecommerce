import React, { useEffect } from 'react'
import { Myroute } from '../route/Myroute'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Header = () => {
  const { cartlist, loading } = useSelector(state => state.cartState)
  const login = JSON.parse(localStorage.getItem('User'))
  const navigate = useNavigate()
  //console.log(login)
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartlist))
  }, [cartlist])
  return (
    <>
      {
        loading &&
        <div className='spinner'>
          <div className="spinner-border" role="status">
          </div>
        </div>

      }
      <div className="border-end bg-white" id="sidebar-wrapper">
        <div className="sidebar-heading border-bottom">Mongo Db</div>
        <div className="list-group list-group-flush">
          <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/">Home</Link>
          <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/Items">Items</Link>
          <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/Bills">Bills</Link>
          <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/Customers">Customers</Link>
          {login ? (
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" onClick={() => {
              localStorage.removeItem('User')
              navigate("/Login")
            }} >Log out</Link>
          ) : (
            <p></p>
          )}

        </div>
      </div>
      <div id="page-content-wrapper">
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <div className="container-fluid">
            <div>
              {cartlist.length > 0 ? (
                <Link to="/CartList">
                  <i className="fa-sharp fa-solid fa-cart-shopping " style={{ color: "black" }}>
                    <p className=" top-0 start-100 translate-middle badge m-1 rounded-pill bg-danger">
                      {cartlist.length}
                    </p>
                  </i>

                </Link>

              ) : (
                <i className="fa-sharp fa-solid fa-cart-shopping " style={{ color: "black" }}>
                  <p className=" top-0 start-100 translate-middle badge m-1 rounded-pill bg-danger">
                  </p>
                </i>
              )}
            </div>
            <div className="d-flex">
              {login ? (
                <p>{login.name}</p>
              ) : (
                <Link to="/Login" className='nav-head m-1 btn btn-success'>Login</Link>
              )}


            </div>
          </div>
        </nav>
        <div className='container'>
          <Myroute />
        </div>

      </div>
    </>
  )
}

export default Header