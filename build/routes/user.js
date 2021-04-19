"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const models_1 = require("../models");
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/login', (req, res) => {
    res.render('user/login');
});
router.get('/signup', (req, res) => {
    res.render('user/signup');
});
router.get('/me', (req, res) => {
    res.render('user/profile', { user: req.user });
});
router.post('/signup', async (req, res) => {
    try {
        const { password, ...userData } = req.body;
        const encryptedPassword = await utils_1.encryptPassword(password);
        const user = new models_1.User({ ...userData, password: encryptedPassword });
        await user.save();
        res.redirect('/user/login');
    }
    catch (err) {
        res.status(500).json({ message: 'something went wrong' });
    }
});
router.post('/login', passport_1.default.authenticate('local', {
    failureRedirect: '/user/login',
}), (req, res) => {
    res.redirect(req.session.returnTo || '/user/me');
});
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
router.get('/profile', (req, res) => {
    res.render('profile', { user: req.user });
});
exports.userRouter = router;
//# sourceMappingURL=user.js.map