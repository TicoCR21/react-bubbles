import axios from "axios";

export default () =>
  axios.create( { headers : { authorization : window.localStorage ? window.localStorage.getItem( "token" ) : "" }, baseURL : "http://localhost:5000" } );