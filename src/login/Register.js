import React, { useState } from 'react';
import { Link, NavLink, Navigate } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        idRole: 1,
        name: '',
        password: '',
        email: ''
    });
    const [passwordRequirements, setPasswordRequirements] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        specialCharacter: false,
        noConsecutiveNumbers: false,
        noConsecutiveLetters: false
    });
    const [passwordError, setPasswordError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (name === 'password') {
            validatePasswordRequirements(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const passwordValid = validatePassword(formData.password);
        if (!passwordValid) {
            setPasswordError('La contraseña no cumple con los requisitos mínimos.');
            return;
        }
        try {
            const response = await fetch('http://localhost:8080/api/residence/v1/userRegistration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log('Usuario registrado exitosamente');

            } else {
                console.error('Error al registrar usuario:', response.statusText);
                // Aquí puedes manejar el caso de que la solicitud no sea exitosa
            }
        } catch (error) {
            console.error('Error de red al registrar usuario:', error);
            // Aquí puedes manejar errores de red u otros errores
        }
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const validatePasswordRequirements = (password) => {
        setPasswordRequirements({
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            specialCharacter: /[@$!%*?&]/.test(password),
            noConsecutiveNumbers: !/\d{2}/.test(password),
            noConsecutiveLetters: !/([a-zA-Z])\1/.test(password)
        });
    };

    return (
        <div>
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <ul>
                    {Object.entries(passwordRequirements).map(([key, value]) => (
                        <li key={key} style={{ textDecoration: value ? 'line-through' : 'none' }}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}: {value ? 'Cumplido' : 'Pendiente'}
                        </li>
                    ))}
                </ul>
                {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
                <button type="submit">Registrarse</button>
            </form>
            <p>¿Ya tienes una cuenta? <Link to="/">Inicia sesión aquí</Link></p>
        </div>
    );
}

export default Register;
