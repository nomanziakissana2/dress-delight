import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/esm/Badge';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import CartScrren from './screens/CartScrren';
import SigninScreen from './screens/SigninScreen';
import { Button, NavDropdown } from 'react-bootstrap';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignUpScreen from './screens/SignUpScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistory from './screens/OrderHistory';
import ProfileScreen from './screens/ProfileScreen';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import DashBoardScreen from './screens/adminPanel/DashBoardScreen';
import ViewProductScreen from './screens/adminPanel/ViewProductScreen';
import ViewUserScreen from './screens/adminPanel/ViewUserScreen';
import ViewOrderScreen from './screens/adminPanel/ViewOrderScreen';
import OrderDetailsScreen from './screens/adminPanel/OrderDetailsScreen';
import AddNewProduct from './screens/adminPanel/AddNewProduct';
import EditProductScreen from './screens/adminPanel/EditProductScreen';
import Pagination from './components/Pagination';
import Footer from './components/Footer';
import ShippingPolicy from './screens/ShippingPolicy';
import PrivacyPolicy from './screens/PrivacyPolicy';
import SearchOrders from './screens/adminPanel/SearchOrders';
import SearchProducts from './screens/adminPanel/SearchProducts';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    localStorage.removeItem('cartItems');
    window.location.href('/');
  };
  const [sidebarIsOpen, setsidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/products/isCategory');
        setCategories(data.products);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    fetchCategories();
  }, []);
  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container'
        }
      >
        <ToastContainer position="top-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Button
                variant="dark"
                onClick={(e) => setsidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>
              <LinkContainer to="/">
                <Navbar.Brand>
                  <span style={{ color: '#e2b53c' }}>Dress</span> Delight
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="me-auto w-100 justify-content-end ">
                  <Link to="/cart" className="nav-link">
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.length}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown
                      title={userInfo.name}
                      id="basic-nav-dropdown"
                      className={!userInfo.isAdmin ? 'navbaris' : ''}
                    >
                      <LinkContainer to={'profile'}>
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to={'/orderHistory'}>
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="/"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to={'/signin'}>
                      Sign In
                    </Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown
                      title="Admin"
                      id="admin-nav-dropdown"
                      className="navbaris"
                    >
                      <LinkContainer to={'/dashboard'}>
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to={'/addProduct'}>
                        <NavDropdown.Item>Add Product</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to={'/productList'}>
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to={'/orderList'}>
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to={'/userList'}>
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={`/search?category=${category}`}
                  onClick={() => setsidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="/cart" element={<CartScrren />} />
              <Route path="/search" element={<SearchScreen />} />

              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignUpScreen />} />
              <Route
                path="/shippingPolicy"
                element={<ShippingPolicy />}
              ></Route>
              <Route path="/privacyPolicy" element={<PrivacyPolicy />}></Route>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/shipping"
                element={
                  <ProtectedRoute>
                    <ShippingAddressScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <PaymentMethodScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/placeorder"
                element={
                  <ProtectedRoute>
                    <PlaceOrderScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orderHistory"
                element={
                  <ProtectedRoute>
                    <OrderHistory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/practice"
                element={<Pagination></Pagination>}
              ></Route>
              {/* Admin Panel */}
              <Route
                path="/dashboard"
                element={
                  <AdminRoute>
                    <DashBoardScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/searchOrder"
                element={
                  <AdminRoute>
                    <SearchOrders />
                  </AdminRoute>
                }
              />
              <Route
                path="/searchProducts"
                element={
                  <AdminRoute>
                    <SearchProducts />
                  </AdminRoute>
                }
              />
              <Route
                path="/productList"
                element={
                  <AdminRoute>
                    <ViewProductScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/orderList"
                element={
                  <AdminRoute>
                    <ViewOrderScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/productEdit/:id"
                element={
                  <AdminRoute>
                    <EditProductScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/userList"
                element={
                  <AdminRoute>
                    <ViewUserScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/addProduct"
                element={
                  <AdminRoute>
                    <AddNewProduct />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/orderDetail/:id"
                element={
                  <AdminRoute>
                    <OrderDetailsScreen />
                  </AdminRoute>
                }
              />
            </Routes>
          </Container>
        </main>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
