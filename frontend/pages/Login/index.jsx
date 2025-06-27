import "./style.css";


function Login(){
  return (
    <div className="container">
      <form className="form">
        <h1>Login</h1>
        <input placeholder="Email" name="email" type="text"/>
        <input placeholder="Senha" name="senha" type="password"/>
        <button type="button">Entrar</button>
      </form>
    </div>
  );
}

export default Login;