import axios from 'axios';
import React, { useReducer } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Store } from '../../Store';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCES':
      return { ...state, loading: false, users: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default function ViewUserScreen() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, users }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    users: [],
  });
  useEffect(() => {
    const fetchOrder = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      const { data } = await axios.get('/api/admin/users');
      dispatch({ type: 'FETCH_SUCCES', payload: data });
    };
    fetchOrder();
  }, []);
  return (
    <div>
      <Helmet>Users </Helmet>
      <h1>All Users</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger" />
      ) : (
        <Table striped borderered hover size="sm" responsive>
          <thead>
            <tr>
              <th> Id</th>
              {/* <th>image</th> */}
              <th>name</th>
              {/* <th>Quantity</th> */}
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                {/* <td>
                  <img
                    className="img-fluid rounded img-thumbnail"
                    src={order.orderItem[0].image}
                    alt=""
                  ></img>
                </td> */}
                <td>{user.name}</td>
                {/* <td>{order.orderItem[0].quantity}</td> */}
                <td>{user.email}</td>
                <td>{}</td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      navigate(`/userDetails/${user._id}`);
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
