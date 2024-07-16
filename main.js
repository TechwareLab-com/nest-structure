const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;
const CODE_RABBIT_API_KEY = 'cr-a750697e67078f25a833cb25159e180c730ffd71cd3ea256f0dfad0802';
const CODE_RABBIT_URL = 'https://api.coderabbit.ai/analyze';

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  const event = req.body;

  const aiRequest = {
    apiKey: CODE_RABBIT_API_KEY,
    data: {
      repository: event.repository.name,
      commits: event.commits,
    },
  };

  try {
    const response = await axios.post(CODE_RABBIT_URL, aiRequest);
    console.log('Code Rabbit AI response:', response.data);

    // Handle the response from Code Rabbit AI

    res.status(200).send('Webhook processed successfully');
  } catch (error) {
    console.error('Error interacting with Code Rabbit AI:', error);
    res.status(500).send('Error processing webhook');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
