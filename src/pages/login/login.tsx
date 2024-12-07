const LoginPage = () => {
    return (
        <>
            <h1>Sign In</h1>
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Password" />
            <button>Login</button>
            <label htmlFor="remember-me">Remember Me</label>
            <input type="checkbox" id="remember-me" />
            <a href="#">Forgot password</a>
        </>
    )
}

export default LoginPage