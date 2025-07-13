const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 9091;
const API_URL = process.env.API_URL || 'http://localhost:9090';

// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'frontend-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, 
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    }
}));

// Middleware para verificar autenticación
function requireAuth(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
}

// Middleware para verificar rol de administrador
function requireAdmin(req, res, next) {
    if (req.session.userRol !== 'administrador') {
        return res.status(403).send('Acceso denegado');
    }
    next();
}

// Configurar axios para incluir cookies
const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

// Rutas de autenticación
app.get('/login', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/');
    }
    res.render('pages/login', { error: null });
});

app.post('/login', async (req, res) => {
    const { correo, password } = req.body;
    try {
        const response = await apiClient.post('/api/auth/login', { correo, password });
        if (response.data.success) {
            req.session.userId = response.data.user.id;
            req.session.userName = response.data.user.nombre;
            req.session.userRol = response.data.user.rol;
            res.redirect('/');
        }
    } catch (error) {
        const errorMessage = error.response?.data?.error || 'Error al iniciar sesión';
        res.render('pages/login', { error: errorMessage });
    }
});

app.get('/register', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/');
    }
    res.render('pages/register', { error: null, success: null });
});

app.post('/register', async (req, res) => {
    const { documento, nombreCompleto, fechaNacimiento, correo, password, rol, telefono } = req.body;
    try {
        const response = await apiClient.post('/api/auth/register', {
            documento, nombreCompleto, fechaNacimiento, correo, password, rol, telefono
        });
        if (response.data.success) {
            res.render('pages/register', { 
                error: null, 
                success: 'Usuario registrado exitosamente. Ya puedes iniciar sesión.' 
            });
        }
    } catch (error) {
        const errorMessage = error.response?.data?.error || 'Error al registrar el usuario';
        res.render('pages/register', { error: errorMessage, success: null });
    }
});

app.get('/logout', async (req, res) => {
    try {
        await apiClient.post('/api/auth/logout');
    } catch (error) {
        console.log('Error al cerrar sesión en API:', error.message);
    }
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

// Rutas principales
app.get('/', requireAuth, async (req, res) => {
    try {
        const response = await apiClient.get('/api/v1/product');
        const products = response.data;
        res.render('pages/index', { 
            products, 
            userName: req.session.userName,
            userRol: req.session.userRol
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.render('pages/index', { 
            products: [], 
            userName: req.session.userName,
            userRol: req.session.userRol,
            error: 'Error al cargar los productos'
        });
    }
});

app.get('/about', (req, res) => {
    res.render('pages/about', { 
        userName: req.session.userName,
        userRol: req.session.userRol
    });
});

// Crear producto
app.post('/product', requireAuth, requireAdmin, async (req, res) => {
    try {
        await apiClient.post('/api/v1/product', req.body);
        res.redirect('/');
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.redirect('/?error=crear');
    }
});

// Editar producto
app.post('/product/:id', requireAuth, requireAdmin, async (req, res) => {
    try {
        // Asegurarse de que la referencia enviada en el body sea la misma que la de la URL
        req.body.referenciaProducto = req.params.id;
        await apiClient.put(`/api/v1/product/${req.params.id}`, req.body);
        res.redirect('/');
    } catch (error) {
        console.error('Error al editar producto:', error);
        res.redirect('/?error=editar');
    }
});

// Eliminar producto
app.post('/product/:id/delete', requireAuth, requireAdmin, async (req, res) => {
    try {
        await apiClient.delete(`/api/v1/product/${req.params.id}`);
        res.redirect('/');
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.redirect('/?error=eliminar');
    }
});

// Ruta 404
app.get('*', (req, res) => {
    res.status(404).render('404', { 
        userName: req.session.userName,
        userRol: req.session.userRol
    });
});

app.listen(PORT, () => {
    console.log(`Frontend corriendo en: http://localhost:${PORT}`);
    console.log(`Conectado a API: ${API_URL}`);
});