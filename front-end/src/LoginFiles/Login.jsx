import logo from "./../Components/Images/google-icon.png";
const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="text-center p-8">
        <h1 className="text-3xl font-bold mb-3 text-gray-300">Continue with</h1>
        <button className="p-2 transition-transform transform hover:scale-110 shadow-lg bg-gray-800 hover:bg-gray-700 rounded-full transition-color duration-400 ease-in-out">
          <a href="http://localhost:8080/oauth2/authorization/google"><img src={logo} width={60} alt="Google Logo" /></a>
        </button>
        <p className="mx-auto mt-4 text-gray-300 text-md font-medium">
          Protecting your data is our top priority.<br/>We use <b>OAuth 2.0</b>,<br/> a secure authorization framework,<br/>to ensure your information stays safe.<br/>
          With <b>OAuth 2.0</b>, your credentials are never shared,<br /> and you have full control over access permissions.<br /><i><b>Your security matters to us.</b></i>
        </p>
      </div>
    </div>
  );
}

export default Login;
