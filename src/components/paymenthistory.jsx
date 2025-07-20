import { useState } from "react";

function PaymentHistory() {
  const [accountNumber, setAccountNumber] = useState("");
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState("");

  const fetchPayments = () => {
  if (!accountNumber.trim()) {
    setError("Please enter an account number.");
    return;
  }

  const token = localStorage.getItem("token");

  fetch(`http://localhost:3000/api/payments/${accountNumber}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }
      return res.json();
    })
    .then((data) => {
      setPayments(data);
      setError("");
    })
    .catch((err) => {
      setPayments([]);
      setError(err.message);
    });
};


  return (
    <div>
      <h2>Payment History</h2>

      <input
        type="text"
        placeholder="Enter Account Number"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />
      <button onClick={fetchPayments}>Get Payments</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {payments.length > 0 ? (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Account Number</th>
              <th>Pay Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.pid}>
                <td>{payment.pid}</td>
                <td>{payment.cid}</td>
                <td>{new Date(payment.paydate).toLocaleDateString()}</td>
                <td>{payment.amount}</td>
                <td>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>No payments found.</p>
      )}
    </div>
  );
}

export default PaymentHistory;
