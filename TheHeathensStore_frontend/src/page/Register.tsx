import {type FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {register} from "../service/authService.ts";
import {createRegisterUser} from "../types/user.ts";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");

        if (password !== passwordAgain) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        setIsSubmitting(true);

        try {
            await register(createRegisterUser(username, password, email, fullName, address));
            navigate("/login", {replace: true});
        } catch {
            setErrorMessage("Registration failed. Please check your information and try again.");
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
                            <h3 className="mtext-111 cl2 p-b-30 txt-center">Register</h3>

                            <form onSubmit={handleSubmit}>
                                <div className="p-b-20">
                                    <label className="stext-102 cl3" htmlFor="register-username">
                                        Username
                                    </label>
                                    <input
                                        id="register-username"
                                        className="size-111 bor8 stext-102 cl2 p-lr-20"
                                        name="username"
                                        placeholder="Enter your username"
                                        autoComplete="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        disabled={isSubmitting}
                                        required
                                    />
                                </div>

                                <div className="p-b-20">
                                    <label className="stext-102 cl3" htmlFor="register-full-name">
                                        Full Name
                                    </label>
                                    <input
                                        id="register-full-name"
                                        className="size-111 bor8 stext-102 cl2 p-lr-20"
                                        name="fullName"
                                        placeholder="Enter your full name"
                                        autoComplete="name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        disabled={isSubmitting}
                                        required
                                    />
                                </div>

                                <div className="p-b-20">
                                    <label className="stext-102 cl3" htmlFor="register-email">
                                        Email
                                    </label>
                                    <input
                                        id="register-email"
                                        className="size-111 bor8 stext-102 cl2 p-lr-20"
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isSubmitting}
                                        required
                                    />
                                </div>

                                <div className="p-b-20">
                                    <label className="stext-102 cl3" htmlFor="register-address">
                                        Address
                                    </label>
                                    <input
                                        id="register-address"
                                        className="size-111 bor8 stext-102 cl2 p-lr-20"
                                        name="address"
                                        placeholder="Enter your address"
                                        autoComplete="street-address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="p-b-20">
                                    <label className="stext-102 cl3" htmlFor="register-password">
                                        Password
                                    </label>
                                    <input
                                        id="register-password"
                                        className="size-111 bor8 stext-102 cl2 p-lr-20"
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        autoComplete="new-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isSubmitting}
                                        required
                                    />
                                </div>

                                <div className="p-b-20">
                                    <label className="stext-102 cl3" htmlFor="register-password-again">
                                        Password Again
                                    </label>
                                    <input
                                        id="register-password-again"
                                        className="size-111 bor8 stext-102 cl2 p-lr-20"
                                        type="password"
                                        name="passwordAgain"
                                        placeholder="Enter your password again"
                                        autoComplete="new-password"
                                        value={passwordAgain}
                                        onChange={(e) => setPasswordAgain(e.target.value)}
                                        disabled={isSubmitting}
                                        required
                                    />
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
                                    {isSubmitting ? "Creating account..." : "Sign up"}
                                </button>

                                <div className="p-t-20 txt-center">
                                    <span className="stext-102 cl3">Do you have an account?</span>{" "}
                                    <Link to="/login" className="stext-102 cl1">
                                        Login
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

export default Register;

