import { useState } from 'react';
import './App.css';
import Select from 'react-select';
import options from './options';

function App() {
  const [data, setData] = useState<any>({});
  const [result, setResult] = useState<any>(null);

  const predictPrice = async () => {
    try {
      const response = await fetch("https://laptop-price-prediction-cijf.onrender.com/api/predict-price", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const result = await response.json();
      setResult(result);
    } catch (error) {
      console.error('Error predicting price:', error);
    }
  };

  const inputHandler = (e: any, name: any) => {
    setData({ ...data, [name]: e.target.value });
  };

  const selectHandler = (selectedOption: any, name: any) => {
    setData({ ...data, [name]: selectedOption.value });
  };

  return (
    <>
      <h1 className='title'>Laptop Price Prediction</h1>
      <div className='input-container'>
        <label htmlFor='weight'>Weight:</label>
        <input
          type="text"
          name="weight"
          placeholder="Enter Weight"
          onChange={(e) => inputHandler(e, 'weight')}
        />
      </div>
      <div className='input-container'>
        <label htmlFor='screen_size'>Screen Size:</label>
        <input
          type="text"
          name="screen_size"
          placeholder="Enter Screen Size"
          onChange={(e) => inputHandler(e, 'screen_size')}
        />
      </div>
      <div className='input-container'>
        <label htmlFor='company'>Company:</label>
        <Select
          onChange={(selectedOption) => selectHandler(selectedOption, 'company')}
          name="company"
          placeholder="Select Company"
          options={options.company}
        />
      </div>
      <div className='input-container'>
        <label htmlFor='type'>Type:</label>
        <Select
          onChange={(selectedOption) => selectHandler(selectedOption, 'type')}
          name="type"
          placeholder="Select Type"
          options={options.type}
        />
      </div>
      <div className='input-container'>
        <label htmlFor='ram'>RAM:</label>
        <Select
          onChange={(selectedOption) => selectHandler(selectedOption, 'ram')}
          name="ram"
          placeholder="Select RAM (GB)"
          options={options.ram}
        />
      </div>
      <div className='input-container'>
        <label htmlFor='touchscreen'>Touchscreen:</label>
        <Select
          onChange={(selectedOption) => selectHandler(selectedOption, 'touchscreen')}
          name="touchscreen"
          placeholder="Select Touchscreen"
          options={options?.touchscreen}
        />
      </div>
      <div className='input-container'>
        <label htmlFor='ips'>IPS:</label>
        <Select
          onChange={(selectedOption) => selectHandler(selectedOption, 'ips')}
          name="ips"
          placeholder="Select IPS"
          options={options.ips}
        />
      </div>
      <div className='input-container'>
        <label htmlFor='resolution'>Resolution:</label>
        <Select
          onChange={(selectedOption) => selectHandler(selectedOption, 'resolution')}
          name="resolution"
          placeholder="Select Resolution"
          options={options.resolution}
        />
      </div>
      <div className='input-container'>
        <label htmlFor='cpu'>CPU:</label>
        <Select
          onChange={(selectedOption) => selectHandler(selectedOption, 'cpu')}
          name="cpu"
          placeholder="Select CPU Brand"
          options={options.cpu}
        />
      </div>
      <div className='input-container'>
        <label htmlFor='hdd'>HDD:</label>
        <Select
          onChange={(selectedOption) => selectHandler(selectedOption, 'hdd')}
          name="hdd"
          placeholder="Select HDD (GB)"
          options={options.hdd}
        />
      </div>
      <div className='input-container'>
        <label htmlFor='ssd'>SSD:</label>
        <Select
          onChange={(selectedOption) => selectHandler(selectedOption, 'ssd')}
          name="ssd"
          placeholder="Select SSD (GB)"
          options={options.ssd}
        />
      </div>
      <div className='input-container'>
        <label htmlFor='gpu'>GPU:</label>
        <Select
          onChange={(selectedOption) => selectHandler(selectedOption, 'gpu')}
          name="gpu"
          placeholder="Select GPU Brand"
          options={options.gpu}
        />
      </div>
      <div className='input-container'>
        <label htmlFor='os'>OS:</label>
        <Select
          onChange={(selectedOption) => selectHandler(selectedOption, 'os')}
          name="os"
          placeholder="Select OS"
          options={options.os}
        />
      </div>
      <button className='calculate-button' onClick={predictPrice}>
        Predict
      </button>

      {result && (
        <div className="result-container">
          <p>Predicted Laptop Price is {result.data[2].price}</p>
        </div>
      )}
    </>
  );
}

export default App;
