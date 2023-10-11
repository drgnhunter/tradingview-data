import express from 'express';

const app = express();
const PORT = 3000;

const bitcoinData = {
  bid: 3000,
  ask: 27021,
  last_updated: '2023-10-11T08:32:02.072Z',
  // ... other data fields
};

app.get('/bitcoinData', (req, res) => {
  res.json(bitcoinData);
});

app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
});
