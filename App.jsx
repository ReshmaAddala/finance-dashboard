import { useState } from "react";

export default function App() {
  const [role, setRole] = useState("viewer");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const [search, setSearch] = useState("");

  const [data, setData] = useState([
    { id: 1, date: "2026-04-01", amount: 5000, category: "Salary", type: "income" },
    { id: 2, date: "2026-04-02", amount: 200, category: "Food", type: "expense" },
    { id: 3, date: "2026-04-03", amount: 1000, category: "Shopping", type: "expense" },
    { id: 4, date: "2026-04-04", amount: 3000, category: "Freelance", type: "income" }
  ]);

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");

  // Login logic
  const handleLogin = () => {
    if (username === "admin") {
      setRole("admin");
    } else {
      setRole("viewer");
    }
    setIsLoggedIn(true);
  };

  // Add transaction
  const addTransaction = () => {
    if (!amount || !category) return;

    const newItem = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      amount: Number(amount),
      category,
      type
    };

    setData([...data, newItem]);
    setAmount("");
    setCategory("");
  };

  // Delete transaction
  const deleteItem = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  // Calculations
  const income = data
    .filter((d) => d.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = data
    .filter((d) => d.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  // Search filter
  const filteredData = data.filter((d) =>
    d.category.toLowerCase().includes(search.toLowerCase())
  );

  // 🔐 LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <h2>Login</h2>
        <input
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br /><br />
        <button onClick={handleLogin}>Login</button>

        <p style={{ marginTop: 10, fontSize: 12 }}>
          (Use "admin" for admin access)
        </p>
      </div>
    );
  }

  return (
    <div style={{
      padding: 20,
      maxWidth: 700,
      margin: "auto",
      fontFamily: "Arial"
    }}>
      <h1>💰 Finance Dashboard</h1>

      <p><b>Logged in as:</b> {role}</p>

      {/* Summary */}
      <div style={{ marginTop: 20 }}>
        <p>Income: ₹{income}</p>
        <p>Expense: ₹{expense}</p>
        <p>Balance: ₹{income - expense}</p>
      </div>

      {/* Simple Chart */}
      <h3>📊 Overview</h3>
      <div style={{ display: "flex", gap: 20, alignItems: "flex-end", height: 150 }}>
        <div>
          <div style={{
            background: "green",
            height: income / 50,
            width: 50
          }}></div>
          <p>Income</p>
        </div>

        <div>
          <div style={{
            background: "red",
            height: expense / 50,
            width: 50
          }}></div>
          <p>Expense</p>
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginTop: 10 }}
      />

      {/* Add Transaction */}
      {role === "admin" && (
        <div style={{ marginTop: 10 }}>
          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <select onChange={(e) => setType(e.target.value)}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <button onClick={addTransaction}>Add</button>
        </div>
      )}

      {/* Table */}
      <table border="1" style={{ marginTop: 20, width: "100%" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
            {role === "admin" && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {filteredData.map((d) => (
            <tr key={d.id}>
              <td>{d.date}</td>
              <td>{d.amount}</td>
              <td>{d.category}</td>
              <td>{d.type}</td>

              {role === "admin" && (
                <td>
                  <button onClick={() => deleteItem(d.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ marginTop: 20, textAlign: "center" }}>
        Created by Reshma 💙
      </p>
    </div>
  );
}