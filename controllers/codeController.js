const Code = require('../models/code');

// Function to generate a new code
exports.generateCode = async (req, res) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  try {
    const newCode = new Code({ code });
    await newCode.save();
    res.status(200).json({ code: newCode.code });
  } catch (error) {
    res.status(500).json({ error: 'Error generating code' });
  }
};

// Function to verify and use a code
exports.useCode = async (req, res) => {
  const { code } = req.body;

  try {
    const foundCode = await Code.findOne({ code });

    if (!foundCode) {
      return res.status(400).json({ error: 'Enter a valid code' });
    }

    if (foundCode.used) {
      return res.status(400).json({ error: 'This code has already been used' });
    }

    // Check if the code is expired
    const currentTime = new Date();
    if (currentTime - foundCode.createdAt > 60000) { // 60000 ms = 60 seconds
      return res.status(400).json({ error: 'The code has expired' });
    }

    // Mark the code as used
    foundCode.used = true;
    await foundCode.save();

    res.status(200).json({ message: 'Code is correct' });
  } catch (error) {
    res.status(500).json({ error: 'Error verifying code' });
  }
};
