import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert } from "antd";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const history = useNavigate();

  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formDisabled, setFormDisabled] = useState(true);
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  const onSubmit = e => {
    e.preventDefault();

    setLoading(true);
    setErrors({});

    axios.post("http://localhost:8000/accounts/signup/", inputs)
      .then(res => {
        console.log("response :", res);
        history("/accounts/login");
      })
      .catch(err => {
        console.log("error :", err);
        if (err.response) {
          setErrors({
            username: (err.response.data.username || []).join(" "),
            password: (err.response.data.password || []).join(" "),
          })
          // console.log("error.response :", err.response);
        }
      })
      .finally(() => {
        setLoading(false);
      })

    console.log('onSubmit', inputs);
  };

  useEffect(() => {
    const isEnabled = Object.values(inputs).every(s => s.length > 0);
    // console.log("changed input :", inputs);
    // const isDisabled = inputs.username.length === 0 || inputs.password.length === 0;
    setFormDisabled(!isEnabled);
  }, [inputs]);

  const onChange = e => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            name="username"
            onChange={onChange}
          />
          {errors.username && <Alert type="error" message={errors.username} />}
        </div>
        <div>
          <input type="password"
            name="password"
            onChange={onChange}
          />
          {errors.password && <Alert type="error" message={errors.password} />}
        </div>
        <input
          type="submit"
          value="회원가입"
          disabled={loading || formDisabled}
        />
      </form>
    </div>
  );
}
