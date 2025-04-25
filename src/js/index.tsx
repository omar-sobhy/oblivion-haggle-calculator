import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../site/styles.scss';
import merchants from '../../merchants.json';
import percentageMap from '../../percentage-map.json';

const merchantsData = Object.entries(merchants).sort((lhs, rhs) => {
  if (lhs[0] < rhs[0]) return -1;
  if (lhs[0] === rhs[0]) return 0;
  return 1;
});

function App() {
  const [selected, setSelected] = useState(0);

  const selectedEntry = merchantsData[selected];

  const [merchantName, { mercantileSkill, luck }] = selectedEntry;

  const [playerMercantileSkill, setPlayerMercantileSkill] = useState(10);

  const [playerLuck, setPlayerLuck] = useState(10);

  const [disposition, setDisposition] = useState(40);

  const modifiedDisposition = 0.5 * Math.floor((0.4 * (disposition - 10)) / 4);

  const modifiedMerchantSkill = Math.min(
    Number(mercantileSkill) + 0.4 * (Number(luck) - 50),
    100,
  );

  const modifiedPlayerSkill = Math.min(
    playerMercantileSkill + 0.4 * (playerLuck - 50),
    100,
  );

  const bestValueOffset = Math.floor(
    (modifiedDisposition +
      (100 + modifiedPlayerSkill - modifiedMerchantSkill) / 10) /
      0.55,
  );

  const minimumPercentage = (percentageMap as Record<number, string>)[
    modifiedMerchantSkill
  ];

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
          onChange={(e) => setPlayerMercantileSkill(Number(e.target.value))}
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

        <label>Optimal slider value</label>
        <p>{Number(minimumPercentage) + bestValueOffset}%</p>
      </fieldset>
    </div>
  );
}

const root = createRoot(document.getElementById('app')!);

root.render(<App />);
