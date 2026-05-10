import {useState} from "react";
import {Link} from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");

    const handleSubmit = () => {
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
                                        required
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
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer"
                                >
                                    Sign up
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

