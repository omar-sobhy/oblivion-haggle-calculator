import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../site/styles.scss';
import merchants from '../../merchants.json';
import { useLocalStorage } from 'react-use';

const merchantsData = Object.entries(merchants).sort((lhs, rhs) => {
  if (lhs[0] < rhs[0]) return -1;
  if (lhs[0] === rhs[0]) return 0;
  return 1;
});

function App() {
  const [selected, setSelected] = useState(0);

  const selectedEntry = merchantsData[selected];

  const [merchantName, { mercantileSkill, luck }] = selectedEntry;

  const [playerMercantileSkill, setPlayerMercantileSkill] = useLocalStorage(
    'playerMercantileSkill',
    10,
  );

  const [playerLuck, setPlayerLuck] = useLocalStorage('playerLuck', 50);

  const [disposition, setDisposition] = useLocalStorage('disposition', 40);

  const [minimumSellValue, setMinimumSellValue] = useLocalStorage(
    'minimumSellValue',
    40,
  );

  const modifiedDisposition = 0.5 * Math.floor((0.4 * (disposition! - 10)) / 4);

  const modifiedMerchantSkill = Math.min(
    Number(mercantileSkill) + 0.4 * (Number(luck) - 50),
    100,
  );

  const modifiedPlayerSkill = Math.min(
    playerMercantileSkill! + 0.4 * (playerLuck! - 50),
    100,
  );

  const bestValueOffset = Math.floor(
    (modifiedDisposition +
      (100 + modifiedPlayerSkill - modifiedMerchantSkill) / 10) /
      0.55,
  );

  return (
    <div className='container is-max-tablet fixed-grid'>
      <fieldset className='grid calculator-container p-3'>
        <legend>Oblivion Haggle Calculator</legend>

        <label>Merchant name</label>
        <select
          value={selected}
          onChange={(e) => {
            setSelected(Number(e.target.value));
          }}
        >
          {merchantsData.map(([merchantName], index) => {
            return <option value={index}>{merchantName}</option>;
          })}
        </select>

        <label>Merchant Mercantile skill</label>
        <p>{mercantileSkill}</p>

        <label>Merchant Luck level</label>
        <p>{luck}</p>

        <label>Mercantile skill</label>
        <input
          type='number'
          defaultValue={playerMercantileSkill}
          onChange={(e) => {
            document.cookie;
            setPlayerMercantileSkill(Number(e.target.value));
          }}
        ></input>

        <label>Luck level</label>
        <input
          type='number'
          defaultValue={playerLuck}
          onChange={(e) => setPlayerLuck(Number(e.target.value))}
        ></input>

        <label>Disposition towards player</label>
        <input
          type='number'
          defaultValue={disposition}
          onChange={(e) => setDisposition(Number(e.target.value))}
        ></input>

        <label>Minimum sell % value</label>
        <input
          type='number'
          defaultValue={minimumSellValue}
          onChange={(e) => setMinimumSellValue(Number(e.target.value))}
        ></input>

        <label>Optimal slider value</label>
        <p>{minimumSellValue! + bestValueOffset}%</p>
      </fieldset>
      <div className='content'>
        <h2>Usage</h2>
        <ol>
          <li>Select the merchant you are trading with</li>
          <li>Input your Mercantile skill in the "Mercantile skill" field</li>
          <li>Input your Luck level in the "Luck level" field"</li>
          <li>
            Input the merchant's disposition in the "Disposition towards player"
            field
          </li>
          <li>
            Move the haggle slider all the way to the left, then input the
            displayed value in the "Minimum sell % value" field
          </li>
        </ol>
        The "Optimal slider value" will automatically update as you update the
        rest of the fields
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('app')!);

root.render(<App />);
