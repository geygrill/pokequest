import './Auth.css'
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import { useForm } from 'react-hook-form';
import ErrorMessage from "../../components/errorMessage/ErrorMessage.jsx";
import Pokeball from "../../components/pokeball/Pokeball.jsx";
import {Link} from "react-router-dom";
import Button from "../../components/button/Button.jsx";


function Login() {
    const { login } = useContext(AuthContext);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    async function handleFormSubmit(data){
        toggleError(false);
        toggleLoading(true);

        try {
            const response = await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/login', {
                email: data.email,
                password: data.password,
            }, {
                headers: {
                    'novi-education-project-id': '15434519-3993-48e6-93d6-56bf22754409',
                }
            });
            login(response.data);
        } catch(error){
            console.error(error);
            toggleError(true);
        }
        toggleLoading(false);
    }

    return (
        <>
            <div className="outer-content-container auth-page">
                <div className="auth-card">
                    <Pokeball size="medium"/>
                    <h1>Inloggen</h1>

                    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="auth-form">
                        <div className="form-group">
                            <div className="form-label-row">
                                <label htmlFor="email">E-mailadres</label>
                                {errors.email && <span className="form-error">{errors.email.message}</span>}
                            </div>
                            <input
                                id="email"
                                type="email"
                                placeholder="jouw@email.nl"
                                {...register('email', {
                                    required: 'E-mailadres is verplicht',
                                    validate: (value) =>
                                        value.includes('@') && value.includes('.') || 'Ongeldig e-mailadres'                                })}
                            /></div>

                        <div className="form-group">
                            <div className="form-label-row">
                                <label htmlFor="password">Wachtwoord</label>
                                {errors.password && <span className="form-error">{errors.password.message}</span>}
                            </div>
                            <input
                                id="password"
                                type="password"
                                placeholder="Jouw wachtwoord"
                                {...register('password', {
                                    required: 'Wachtwoord is verplicht'
                                })}
                            />
                        </div>

                        {error && <ErrorMessage>Inloggen mislukt. Controleer je e-mailadres en wachtwoord.</ErrorMessage>}

                        <Button type="submit" variant="red" fullWidth>
                            Inloggen
                        </Button>
                    </form>

                    <p className="auth-page-switch">
                        Nog geen account? <Link to="/register">Registreren</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login;