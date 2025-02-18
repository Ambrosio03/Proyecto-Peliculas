import express from 'express';
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Lógica para registrar al usuario
        const user = { id: 1, username }; // Ejemplo de usuario registrado
        const token = "exampleToken"; // Ejemplo de token
        res.status(201).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar el usuario" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Lógica para iniciar sesión al usuario
        const user = { id: 1, username }; // Ejemplo de usuario autenticado
        const token = "exampleToken"; // Ejemplo de token
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión el usuario" });
    }
});

export default router;
