import React, { useState } from 'react';
import './App.css';

function App() {
  // Стейт для хранения данных таблицы
  const [tableData, setTableData] = useState([
    ['', '']
  ]);

  // Стейт для хранения сгенерированных комбинаций
  const [combinations, setCombinations] = useState([]);

  // Обработчик изменения данных в таблице
  const handleInputChange = (e, rowIndex, colIndex) => {
    const newTableData = [...tableData];
    newTableData[rowIndex][colIndex] = e.target.value;
    setTableData(newTableData);
  };

  // Обработчик добавления новой строки
  const handleAddRow = () => {
    setTableData([...tableData, ['', '']]);
  };

  // Обработчик генерации комбинаций
  const handleGenerateCombinations = () => {
    const cols = tableData[0].length; // количество столбцов
    const rows = tableData.length; // количество строк

    const axes = [];

    // Преобразуем данные таблицы в массив признаков по каждой оси
    for (let col = 0; col < cols; col++) {
      const axis = [];
      for (let row = 0; row < rows; row++) {
        const value = tableData[row][col];
        if (value.trim() !== '') {
          axis.push(value);
        }
      }
      axes.push(axis);
    }

    // Рекурсивная функция для генерации всех комбинаций
    const generateCombinations = (arrays, prefix = []) => {
      if (arrays.length === 0) return [prefix];

      const first = arrays[0];
      const rest = arrays.slice(1);

      const result = [];

      for (let i = 0; i < first.length; i++) {
        result.push(...generateCombinations(rest, [...prefix, first[i]]));
      }

      return result;
    };

    const allCombinations = generateCombinations(axes);
    setCombinations(allCombinations);
  };

  return (
    <div className="App">
      <h1>Combinator</h1>

      <table>
        <thead>
          <tr>
            {tableData[0].map((_, colIndex) => (
              <th key={colIndex}>Axis {colIndex + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((value, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleAddRow}>Add Row</button>
      <button onClick={handleGenerateCombinations}>Generate Combinations</button>

      {combinations.length > 0 && (
        <div>
          <h2>Generated Combinations</h2>
          <table>
            <thead>
              <tr>
                {combinations[0].map((_, index) => (
                  <th key={index}>Axis {index + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {combinations.map((combination, index) => (
                <tr key={index}>
                  {combination.map((value, subIndex) => (
                    <td key={subIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
