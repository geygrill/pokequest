import './Register.css'
import axios from "axios";

function Register() {
    async function handleSubmit(e){
        e.preventDefault();
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
        <>
            <form onSubmit={handleSubmit}>
                <button type="submit">Registreren</button>
            </form>
        </>
    )
}

export default Register;