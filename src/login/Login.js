import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/residence/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log('Inicio de sesión exitoso');
                setLoggedIn(true);
            } else {
                const errorText = await response.text();
                setError(errorText);
                console.error('Error al iniciar sesión:', errorText);
            }
        } catch (error) {
            setError('Error de red al iniciar sesión');
            console.error('Error de red al iniciar sesión:', error);
        }
    };

    if (loggedIn) {
        return <Navigate to="/home" />;
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <button type="submit">Iniciar sesión</button>
                {error && <div>Error: {error}</div>}
            </form>
            <p>No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
        </div>
    );
}

export default Login;
