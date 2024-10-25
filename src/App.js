import "./App.css";
import {useState} from "react";

function App() {
  const [showResult, setShowResult] = useState(false);
  const [formData, setFormData] = useState([{salary:0,PF:0,bonus:0}]);
  const [netSalary, setNetSalary] = useState();

  const handleChange = (e) => {
    e.preventDefault();
    const newPay = e.target.value;
    console.log(e.target.name)
    setFormData({...formData,[e.target.name]:newPay});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/poster", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({salary: parseFloat(formData.salary),
          PF: parseFloat(formData.PF),
          bonus: parseFloat(formData.bonus)
        }),
      });
      const result = await response.json();
      console.log(result);
      setShowResult(true);
      setNetSalary(result.netSalary);
    } catch (error) {
      console.error("error submiting form", error);
    }
  };

  return (
  <div>
    <div className="App bg-white">
      <h1>Quick Salary Estimator</h1>
      <fieldset>
        <form onSubmit={handleSubmit}>
          <label>Enter your Salary: </label>
          <br></br>
          <input type="number" name="salary" min={10000} value={formData.salary} onChange={handleChange}></input>
          <br></br>
          {/* trying */}
          <label>Contribution to provident fund : </label>
          <br></br>
          <input type="number" name="PF" min={2} max={20} value={formData.PF} onChange={handleChange}></input>
          <br></br>
          <label>Bonus : </label>
          <br></br>
          <input type="number" name="bonus" min={5000} value={formData.bonus} onChange={handleChange}></input>
          <br></br>
          <button type="submit">Enter Amount</button>
        </form>
      </fieldset>
      <div className="result-modal">
        {showResult && (
          <div>
            <h2>Net Salary(Take Home): </h2>
            <h2>${netSalary?.toFixed(2) || "Calculating..."}</h2>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default App;
