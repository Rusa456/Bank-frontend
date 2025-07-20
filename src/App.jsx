import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import CustomerDetails from './components/customerdetails';
import PaymentHistory from './components/paymenthistory';
import PaymentForm from './components/paymentform';
import LoginForm from './components/loginform';
import ProtectedRoute from './components/protectedroute';
import SignupForm from "./components/signupform";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <h1>Customer EMI System</h1>

        {isLoggedIn && (
          <nav style={{ marginBottom: '20px' }}>
            <Link to="/customers"><button>View Customers</button></Link>
            <Link to="/payments"><button>View Payment History</button></Link>
            <Link to="/pay"><button>Make Payment</button></Link>
            <button onClick={handleLogout}>Logout</button>
          </nav>
        )}

        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn
                ? <CustomerDetails />
                : <LoginForm onLogin={() => setIsLoggedIn(true)} />
            }
          />

          <Route path="/signup" element={<SignupForm />} />

          <Route
            path="/customers"
            element={
              <ProtectedRoute>
                <CustomerDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payments"
            element={
              <ProtectedRoute>
                <PaymentHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pay"
            element={
              <ProtectedRoute>
                <PaymentForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;