const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/user');

app.use(cors());
app.use(bodyParser.json());

// ✅ Serve static files like index.html
app.use(express.static(path.join(__dirname, 'public')));

// ✅ User routes
app.use('/api/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
