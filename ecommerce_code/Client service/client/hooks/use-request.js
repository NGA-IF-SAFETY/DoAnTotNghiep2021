import axios from 'axios';
import { useState } from 'react';
import { encode } from '../services/encrytedData';

const userRequested = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {

    try {
      setErrors(null);
      const bodyRep = await encode(body)
      const response = await axios[method](url, { ...bodyRep, ...props })

      if (onSuccess) {
        onSuccess(response.data);
      }

      console.log(response.data);

      return response.data;

    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Ooops....</h4>
          <ul className="my-0" style={{paddingLeft: 0}}>
            {err.response.data.errors.map((err) => (
              <li style={{display: 'contents'}} key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
      console.log(err);
    }
  };

  return { doRequest, errors };
};

export default userRequested;