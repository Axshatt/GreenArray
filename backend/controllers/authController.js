// Authentication logic
exports.login = (req, res) => {
  const User = require('../../models/User');
  const jwt = require('jsonwebtoken');

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }
  User.findOne({ email })
    .then(async user => {
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      // Generate JWT
      const token = jwt.sign(
        { userId: user._id, email: user.email, is_admin: user.is_admin, is_seller: user.is_seller },
        process.env.JWT_SECRET || 'supersecret',
        { expiresIn: '7d' }
      );
      res.json({
        token,
        user: {
          email: user.email,
          full_name: user.full_name,
          is_admin: user.is_admin,
          is_seller: user.is_seller
        }
      });
    })
    .catch(err => {
      res.status(500).json({ error: 'Login failed' });
    });
};


const User = require('../../models/User');

exports.signup = async (req, res) => {
  try {
    const { email, password, full_name, is_admin, is_seller } = req.body;
    if (!email || !password || !full_name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    const user = new User({ email, password, full_name, is_admin, is_seller });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user: { email: user.email, full_name: user.full_name, is_admin: user.is_admin, is_seller: user.is_seller } });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

exports.profile = (req, res) => {
  // TODO: Implement profile logic
  res.send('Profile logic not implemented');
};
