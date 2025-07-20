import { useState, useEffect } from "react"

function CustomerDetails() {

    const [customers, setCustomers] = useState([])

    useEffect(() => {
      fetch(`${import.meta.env.VITE_API_URL}/customers`, {
      headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      return response.json();
    })
    .then(data => setCustomers(data))
    .catch(error => console.error('Error fetching customers:', error.message));
}, []);


    console.log(customers)

    return (
    <div>
      <h2>Customer List</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Issue Date</th>
            <th>Interest Rate</th>
            <th>Tenure</th>
            <th>EMI Due</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((cust) => (
            <tr key={cust.acno}>
              <td>{cust.acno}</td>
              <td>{new Date(cust.issuedate).toLocaleDateString()}</td>
              <td>{cust.interest}</td>
              <td>{cust.tenure}</td>
              <td>{cust.emidue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerDetails