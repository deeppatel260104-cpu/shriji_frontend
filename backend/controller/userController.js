const bcrypt = require('bcryptjs');
const db = require('../config/db.js');
const sendToken = require('../utils/sendToken');
const catchAsyncError = require('../middleware/catchAsyncError.js');
const ErrorHandler = require('../utils/errorHandler');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
// Login user
const login = catchAsyncError(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) throw new ErrorHandler('Please enter email and password', 400);

    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];
    if (!user) throw new ErrorHandler('Invalid email or password', 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ErrorHandler('Invalid email or password', 401);

    console.log('[AUTH] Login successful', {
        userId: user.id,
        email: user.email,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        time: new Date().toISOString(),
    });

    await sendToken(user, 200, res, db);
});

// Logout user
const logout = catchAsyncError(async (req, res) => {
    if (req.user) {
        await db.execute('UPDATE users SET refresh_token = NULL WHERE id = ?', [req.user.id]);
    }

    res.clearCookie('token');
    res.clearCookie('refreshToken');

    res.json({ message: 'Logged out successfully' });
});

// Get user details
const getMe = catchAsyncError(async (req, res) => {
    const [rows] = await db.execute('SELECT id, email FROM users WHERE id = ?', [req.user.id]);
    if (!rows.length) return next(new ErrorHandler('User not found', 404));
    res.json(rows[0]);
});

// Forgot password — send reset link via email
const forgotPassword = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;
    if (!email) throw new ErrorHandler('Please provide an email', 400);

    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];
    if (!user) return next(new ErrorHandler('No user found with that email', 404));

    // Generate a secure random token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Save hashed token + expiry to DB
    await db.execute(
        'UPDATE users SET reset_password_token = ?, reset_password_expires = ? WHERE id = ?',
        [hashedToken, expiresAt, user.id]
    );

    // Build reset URL (adjust FRONTEND_URL in your .env)
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Send email via Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // or use host/port for other providers
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `"Support" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: 'Password Reset Request',
        html: `
            <p>You requested a password reset.</p>
            <p>Click the link below to reset your password. This link expires in <strong>15 minutes</strong>.</p>
            <a href="${resetUrl}">${resetUrl}</a>
            <p>If you did not request this, please ignore this email.</p>
        `,
    });

    res.json({ message: 'Password reset link sent to your email' });
});

// Reset password — verify token and update password
const resetPassword = catchAsyncError(async (req, res, next) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) throw new ErrorHandler('Please provide a new password', 400);

    // Hash the incoming token to compare with DB
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const [rows] = await db.execute(
        'SELECT * FROM users WHERE reset_password_token = ? AND reset_password_expires > NOW()',
        [hashedToken]
    );

    const user = rows[0];
    if (!user) return next(new ErrorHandler('Token is invalid or has expired', 400));

    // Hash new password and clear reset fields
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute(
        'UPDATE users SET password = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE id = ?',
        [hashedPassword, user.id]
    );

    res.json({ message: 'Password reset successful. You can now log in.' });
});

module.exports = { login, logout, getMe, forgotPassword, resetPassword };

// async function hashPassword(plainPassword) {
//   const salt = await bcrypt.genSalt(10);
//   const hashed = await bcrypt.hash(plainPassword, salt);
//   return hashed;
// }

// // Example
// hashPassword("Patel.123").then(hash => {
//   console.log("Hashed:", hash);
// });
