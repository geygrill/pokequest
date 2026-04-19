import './Login.css'
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";

function Login() {
    const { login } = useContext(AuthContext);

    async function handleSubmit(e){
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
            console.log(response.data);
        } catch(error){
            console.error(error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <button type="submit">Inloggen</button>
            </form>
        </>
    )
}

export default Login;