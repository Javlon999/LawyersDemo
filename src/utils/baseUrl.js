import axios from "axios";
import { authHeader } from '../redux/helpers';


export default axios.create({
 
  headers: {...authHeader(),
    "Content-type": "application/json",
  }
});