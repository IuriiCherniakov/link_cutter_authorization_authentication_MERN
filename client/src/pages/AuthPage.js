import {useHttp} from "../hooks/http.hook";
import {useEffect, useState} from "react";
import {useMessage} from "../hooks/message.hook";

function AuthPage() {
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState( {
        email: '', password: ''
    } )

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError])


    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    };

    const registerHandler = async () => {
        try {
           const data = await request('/api/auth/register', 'POST', {...form});
           message(data.message)
            console.log('DATA', data);
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            message(data.message)
            console.log('DATA', data);
        } catch (e) {}
    }



    return (
        <div className='row'>
            <div className="col s6 offset-s3">
                <h1>Cut your link</h1>
            </div>
            <div className="row">
                <div className="col s12 m6">
                    <div className="card blue darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Authorization</span>
                            <div>

                                <div className="input-field">
                                    <input
                                        placeholder="Email"
                                        id="email"
                                        type="text"
                                        name="email"
                                        className="yellow-input"
                                        onChange={changeHandler}
                                    />
                                        <label htmlFor="email">Email</label>
                                </div>
                                <div className="input-field">
                                    <input
                                        placeholder="Password"
                                        id="password"
                                        type="password"
                                        name="password"
                                        className="yellow-input"
                                        onChange={changeHandler}

                                    />
                                    <label htmlFor="password">Password</label>
                                </div>

                            </div>
                        </div>
                        <div className="card-action">
                            <button
                                className="btn yellow darken-4"
                                style={{marginRight: 10}}
                                disabled={loading}
                                onClick={loginHandler}

                            >
                                Log In
                            </button>

                            <button
                                className="btn grey lighten-1 black-text"
                                onClick={registerHandler}
                                disabled={loading}
                            >
                                Registration
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
);
}

export default AuthPage;