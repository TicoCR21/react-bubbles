import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  let history = useHistory();

  const [ user, setUser ] = useState( { username : "Lambda School", password : "i<3Lambd4" } );

  const onChange = e => setUser( { ...user, [ e.target.name ] : e.target.value  } );

  const onSubmit = e =>
  {
    e.preventDefault();
    axiosWithAuth().post( "/api/login", user )
      .then( response => 
        {
          if( window.localStorage )
            window.localStorage.setItem( "token", response.data.payload );
          //setUser( { username : "", password : "" } );
          history.push( "/bubbles" ); 
        } )
      .catch( error => console.error( "error" ) );
  }

  return (
    <div className = "container" style = { { marginTop : "130px" } } >
      <form className = "col s10" onSubmit = { onSubmit }>
        <div className="row">
          
          <div className="input-field center offset-s3 col s7">
            <input id="username" type="text" name = "username" value = { user.username } onChange = { onChange } />
            <label htmlFor = "username">Username</label>
          </div>

          <div className="input-field center offset-s3 col s7">
            <input id="password" type="password" name = "password" value = { user.password } onChange = { onChange } />
            <label htmlFor = "password">Password</label>
          </div>

          <div className="input-field center offset-s3 col s7">
            <button className="waves-effect waves-light btn-small deep-purple darken-4">Login</button>  
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
