const User = require('../../models/Users'); // Assurez-vous que le chemin vers votre modèle User est correct
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// @desc Login
// @route POST /auth
// @access Public
const login = async (req, res) => {
    const { mail, password } = req.body;

    if (!mail || !password) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    try {
        const foundUser = await User.findOne({ mail }).exec();

        if (!foundUser) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        const match = await bcrypt.compare(password, foundUser.password);

        if (!match) return res.status(401).json({ message: 'Email ou mot de passe incorrect' });

        const accessToken = jwt.sign(
            {
                UserInfo: {
                    mail: foundUser.mail,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' } //change 15m before deployment
        );

        const refreshToken = jwt.sign(
            { mail: foundUser.mail },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        // Créez un cookie sécurisé avec le token de rafraîchissement
        res.cookie('jwt', refreshToken, {
            httpOnly: true, // accessible uniquement par le serveur web
            secure: true, // https
            sameSite: 'None', // cookie cross-site
            maxAge: 7 * 24 * 60 * 60 * 1000, // expiration du cookie : réglée pour correspondre au rT
        });

        // Envoyer accessToken contenant le nom d'utilisateur et les rôles
        res.json({ accessToken, idUser: foundUser._id, statut: foundUser.statut });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la connexion.' });
    }
};

// @desc Refresh
// @route GET /auth/refresh
// @access Public - car le jeton d'accès a expiré
const refresh = (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.status(401).json({ message: 'Non autorisé cookies' });

    const refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err) => {
            if (err) return res.status(403).json({ message: 'Interdit' });

            const foundUser = await User.findOne({ mail }).exec();

            if (!foundUser) return res.status(401).json({ message: 'Non autorisé user not found' });

            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        mail: foundUser.mail,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );

            res.json({ accessToken });
        }
    );
};

// @desc Logout
// @route POST /auth/logout
// @access Public - juste pour effacer le cookie s'il existe
const logout = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // Pas de contenu
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.json({ message: 'Cookie effacé' });
};

module.exports = {
    login,
    refresh,
    logout,
};
