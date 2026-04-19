import './Login.css'
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import { useForm } from 'react-hook-form';
import ErrorMessage from "../../components/errorMessage/ErrorMessage.jsx";

function Login() {
    const { login } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    async function handleFormSubmit(e){
        e.preventDefault();
        try {
            const response = await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/login', {
                email: 'dev@dev',
                password: 'dev',
            }, {
                headers: {
                    'novi-education-project-id': '15434519-3993-48e6-93d6-56bf22754409',
                }
            });
            login(response.data);
        } catch(error){
            console.error(error);
        }
    }

    return (
        <>
            <div className="outer-content-container login-page">
                <div className="login-card">
                    <div className="pokeball-icon" aria-hidden="true"></div>
                    <h1>Inloggen</h1>

                    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="auth-form">
                        <div className="form-group">
                            <div className="form-label-rij">
                                <label htmlFor="email">E-mailadres</label>
                                {errors.email && <span className="form-fout">{errors.email.message}</span>}
                            </div>
                            <input
                                id="email"
                                type="email"
                                placeholder="jouw@email.nl"
                                {...register('email', {
                                    required: 'E-mailadres is verplicht',
                                    validate: (value) =>
                                        value.includes('@') || 'Email moet een @ bevatten',
                                })}
                            /></div>

                        <div className="form-group">
                            <div className="form-label-rij">
                                <label htmlFor="password">Wachtwoord</label>
                                {errors.password && <span className="form-fout">{errors.password.message}</span>}
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

                        {errors && <ErrorMessage>Inloggen mislukt. Controleer je e-mailadres en wachtwoord.</ErrorMessage>}

                        <button type="submit" className="btn-submit">
                            Inloggen
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;