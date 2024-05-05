import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../utils/network-data";

function UseRegister() {
    const navigate = useNavigate();

    async function onRegisterHandler(user) {
        const { error } = await register(user);

        if (!error) {
            alert("akun sudah dibuat");
            navigate('/');
        }
    }

    return onRegisterHandler;
}

export default UseRegister;