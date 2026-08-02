import {type FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {login} from "../service/authService.ts";
import {createLoginUser} from "../types/user.ts";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const loginSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");
        setIsSubmitting(true);

        try {
            await login(createLoginUser(username, password));
            navigate("/", {replace: true});
        } catch {
            setErrorMessage("Login failed. Please check your account and password.");
        } finally {
            setIsSubmitting(false);
        }
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
                                        Username, email or phone
                                    </label>
                                    <input
                                        id="login-email"
                                        className="size-111 bor8 stext-102 cl2 p-lr-20"
                                        name="username"
                                        placeholder="Enter username, email or phone"
                                        autoComplete="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        disabled={isSubmitting}
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
                                        disabled={isSubmitting}
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
                                            disabled={isSubmitting}
                                        />
                                        Remember me
                                    </label>

                                    <a href="/forgot-password" className="stext-102 cl1">
                                        Forgot password?
                                    </a>
                                </div>

                                {errorMessage && (
                                    <div className="alert alert-danger" role="alert">
                                        {errorMessage}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer"
                                    disabled={isSubmitting}
                                    aria-busy={isSubmitting}
                                >
                                    {isSubmitting ? "Logging in..." : "Login"}
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

