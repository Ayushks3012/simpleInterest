import { TextField, Stack, Button } from '@mui/material'
import { useState } from 'react'



function App() {

  const [interest, setInterest] = useState(0);
  const [principle, setPrinciple] = useState('');
  const [rate, setRate] = useState('');
  const [year, setYear] = useState('');

const [invalidPrinciple,setInvalidPrinciple] = useState(false);
const [invalidRate,setInvalidRate] = useState(false);
const [invalidYear,setInvalidYear] = useState(false);

const validateInput = (inputTg) => {
  const { value, name } = inputTg;
  // console.log(name, value);

  if (name === "principle") {
    setPrinciple(value)
    if(!!value.match(/^\d*\.?\d+$/)) {
      setInvalidPrinciple(false);
    } else {
      setInvalidPrinciple(true);
    }
  } else if (name === "rate") {
    setRate(value)
    if(!!value.match(/^\d*\.?\d+$/)) {
      setInvalidRate(false);
    } else {
      setInvalidRate(true);
    }
  } else if (name === "year") {
    setYear(value)
    if(!!value.match(/^\d*\.?\d+$/)) {
      setInvalidYear(false);
    } else {
      setInvalidYear(true);
    }
  }
}

const handleCalculate = (e) => {
  e.preventDefault();
  if (principle && rate && year){
    setInterest(principle*rate*year/100);
  }else{
    alert("Please fill all fields correctly!");
  }
}
const handleReset = () => {
  setInterest(0);
  setPrinciple(0);
  setRate(0);
  setYear(0);
  setInvalidPrinciple(false);
  setInvalidRate(false);
  setInvalidYear(false);
}

  return (
    <div
      style={{ width: '100%', minHeight: '100vh' }}
      className="d-flex justify-content-center align-items-center bg-dark"
    >
      <div style={{ width: '600px' }} className="bg-light rounded p-5">
        <h1>Simple Interest Calculator</h1>
        <div className="bg-warning p-3 text-light text-center rounded">
          <h1> ₹ {interest} </h1>
          <p className="fw-bolder">Total Simple Interest</p>
        </div>
        <form className="mt-5" onSubmit={e => { e.preventDefault(); }}>
          {/* principle */}
          <div className="mb-3">
            <TextField
              name='principle'
              value={principle || ''}
              onChange={(e) => validateInput(e.target)}
              className="w-100"
              id="outlined-principle"
              label="₹ Principle Amount"
              variant="outlined"
              error={invalidPrinciple}
            />
          </div>
          {/* invalid principle */}
          {invalidPrinciple &&
            <div className="text-danger mb-3 fw-bolder">
              Invalid principle Amount!!
            </div>
          }
          {/* rate */}
          <div className="mb-3">
            <TextField name='rate'
              value={rate || ''}
              onChange={(e) => validateInput(e.target)}
              className="w-100"
              id="outlined-rate"
              label="Interest Rate (%)"
              variant="outlined"
              error={invalidRate}
            />
          </div>
          {/* invalid rate */}
          {invalidRate && 
            <div className="text-danger mb-3 fw-bolder">
              Invalid Rate!!
            </div>
          }
          {/* year */}
          <div className="mb-3">
            <TextField name='year'
              value={year || ''}
              onChange={(e) => validateInput(e.target)}
              className="w-100"
              id="outlined-year"
              label="Time Period(Yr)"
              variant="outlined"
              error={invalidYear}
            />
          </div>
          {/* invalid year */}
          {invalidYear && 
            <div className="text-danger mb-3 fw-bolder">
              Invalid Year!!
            </div>
          }

          <Stack direction="row" spacing={2}>
            <Button
              disabled={invalidPrinciple || invalidRate || invalidYear}
              variant="contained"
              style={{width:'50%',height:'70px'}}
              className="bg-dark"
              onClick={() => {
                if (!invalidPrinciple && !invalidRate && !invalidYear && principle && rate && year) {
                  setInterest(((parseFloat(principle) * parseFloat(rate) * parseFloat(year)) / 100).toFixed(2));
                } else {
                  setInterest(0);
                }
              }}
              type="button"
            >
              Calculate
            </Button>
            <Button
            onClick={handleReset}
              variant="outlined"
              style={{width:'50%',height:'70px'}}
              className="border border-dark text-dark"
            >
              Reset
            </Button>
          </Stack>

        </form>
      </div>
    </div>
  )
}

export default App