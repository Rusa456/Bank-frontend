import { useState } from "react";

function PaymentForm() {
  const [cid, setCid] = useState("");
  const [amount, setAmount] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!cid || !amount) {
    setErrorMessage("Please enter both account number and amount.");
    return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    setErrorMessage("You must be logged in to make a payment.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify({ cid, amount }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Payment submission failed");
    }

    if (result.status === "success") {
      setSuccessMessage(
        `✅ Payment of ₹${result.amount} for Account No ${result.cid} was successful.`
      );
      setErrorMessage("");
    } else {
      setErrorMessage(
        `❌ Payment failed for Account No ${result.cid}: ${result.message}`
      );
      setSuccessMessage("");
    }

    setCid("");
    setAmount("");
  } catch (error) {
    console.error("Error:", error.message);
    setSuccessMessage("");
    setErrorMessage(error.message || "Something went wrong. Please try again.");
  }
};



  return (
    <div>
      <h2>Pay EMI</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Account Number (CID): </label>
          <input
            type="text"
            value={cid}
            onChange={(e) => setCid(e.target.value)}
            required
          />
        </div>

        <div>
          <label>EMI Amount (₹): </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit Payment</button>
      </form>

      {successMessage && (
        <p style={{ color: "green", marginTop: "1rem" }}>{successMessage}</p>
      )}
      {errorMessage && (
        <p style={{ color: "red", marginTop: "1rem" }}>{errorMessage}</p>
      )}
    </div>
  );
}

export default PaymentForm;