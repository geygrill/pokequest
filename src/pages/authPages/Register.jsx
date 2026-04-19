import '../registerPage/Register.css'
import axios from "axios";
import Pokeball from "../../components/pokeball/Pokeball.jsx";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {Link} from "react-router-dom";
import ErrorMessage from "../../components/errorMessage/ErrorMessage.jsx";

function Register() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    async function handleFormSubmit(data){
        toggleError(false);
        toggleLoading(true);
        try {
            await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/users', {
                    email: 'email@email.nl',
                    password: 'email123',
                    roles: ['admin'],
                },
                {
                    headers: {
                        'novi-education-project-id': '15434519-3993-48e6-93d6-56bf22754409',
                    },
                }
            );
        } catch(error){
            console.error(error);
        }
    }

    return (
        <div className="outer-content-container auth-page">
            <div className="auth-card">
                <Pokeball size="medium" />
                <h1>Account aanmaken</h1>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="auth-form" noValidate>
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
                                    value.includes('@') && value.includes('.') || 'Ongeldig e-mailadres'                            })}
                        />
                    </div>

                    <div className="form-group">
                        <div className="form-label-row">
                            <label htmlFor="password">Wachtwoord</label>
                            {errors.password && <span className="form-error">{errors.password.message}</span>}
                        </div>
                        <input
                            id="password"
                            type="password"
                            placeholder="Minimaal 6 tekens"
                            {...register('password', {
                                required: 'Wachtwoord is verplicht',
                                minLength: {
                                    value: 6,
                                    message: 'Minimaal 6 tekens'
                                },
                            })}
                        />
                    </div>

                    <div className="form-group">
                        <div className="form-label-row">
                            <label htmlFor="passwordConfirmation">Wachtwoord herhalen</label>
                            {errors.passwordConfirmation && <span className="form-error">{errors.passwordConfirmation.message}</span>}
                        </div>
                        <input

                            id="passwordConfirmation"
                            type="password"
                            placeholder="Herhaal je wachtwoord"
                            {...register('passwordConfirmation', {
                                required: 'Herhaal je wachtwoord',
                                validate: value =>
                                    value === watch('password') || 'Wachtwoorden komen niet overeen',
                            })}
                        />
                    </div>

                    {error && <ErrorMessage>Registreren mislukt.</ErrorMessage>}

                    <button type="submit" className="btn-submit">
                        Acount aanmaken
                    </button>
                </form>

                <p className="auth-page-switch">
                    Al een account? <Link to="/login">Inloggen</Link>
                </p>
            </div>
        </div>
    )
}

export default Register;