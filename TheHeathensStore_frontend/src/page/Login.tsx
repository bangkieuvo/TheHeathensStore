import {type FormEvent, useState} from "react";
import {Link} from "react-router-dom";

const Login = () => {
    const [username, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const loginSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
        <section className="bg0 p-t-75 p-b-120">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="p-lr-25 p-tb-30 bor1">
                            <h3 className="mtext-111 cl2 p-b-30 txt-center">Login</h3>
                            <form onSubmit={loginSubmit}>
                                <div className="p-b-20">
                                    <label className="stext-102 cl3" htmlFor="login-email">
                                        Username
                                    </label>
                                    <input
                                        id="login-email"
                                        className="size-111 bor8 stext-102 cl2 p-lr-20"
                                        name="username"
                                        placeholder="Enter Username"
                                        value={username}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="p-b-20">
                                    <label className="stext-102 cl3" htmlFor="login-password">
                                        Password
                                    </label>
                                    <input
                                        id="login-password"
                                        className="size-111 bor8 stext-102 cl2 p-lr-20"
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="flex-w flex-sb-m p-b-20">
                                    <label className="flex-c-m stext-102 cl3" htmlFor="login-remember">
                                        <input
                                            id="login-remember"
                                            type="checkbox"
                                            className="m-r-5"
                                            checked={remember}
                                            onChange={(e) => setRemember(e.target.checked)}
                                        />
                                        Remember me
                                    </label>

                                    <a href="/forgot-password" className="stext-102 cl1">
                                        Forgot password?
                                    </a>
                                </div>

                                <button
                                    type="submit"
                                    className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer"
                                >
                                    Login
                                </button>

                                <div className="p-t-20 txt-center">
                                    <span className="stext-102 cl3">Don't have an account?</span>{" "}
                                    <Link to="/register" className="stext-102 cl1">
                                        Register
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;

