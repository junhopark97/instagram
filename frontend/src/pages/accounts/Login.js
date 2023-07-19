import React, { useState, useEffect } from "react";
import axios from "axios";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { Card, Form, Input, Button, notification } from "antd";
// import { useNavigate } from "react-router-dom";
// import useLocalStorage from "utils/useLocalStorage";
import { useAppContext, setToken } from "store";
import { useLocation, useNavigate } from "react-router-dom";


export default function Login() {
  const history = useNavigate();
  // const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
  const { dispatch } = useAppContext();
  const location = useLocation();
  const [fieldErrors, setFieldErrors] = useState({});

  const { from: loginRedirectUrl } = location.state || { from: { pathname: "/" } }


  const onFinish = (values) => {
    // console.log('Success:', values);
    async function foo() {
      const { username, password } = values;

      setFieldErrors({});

      const data = { username, password };
      try {
        const response = await axios.post("http://localhost:8000/accounts/token/", data);
        const { data: { access: accessToken } } = response

        dispatch(setToken(accessToken));
        // setAccessToken(accessToken)
        // console.log('accessToken :', accessToken);

        notification.open({
          message: "로그인 성공",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />
        });

        history(loginRedirectUrl);
      } catch (error) {
        if (error.response) {
          notification.open({
            message: "로그인 실패",
            description: "아이디/암호를 확인해주세요.",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />
          });

          const { data: fieldsErrorMessages } = error.response;
          // fieldsErrorMessages => { username: "m1 m2", password: [] }
          // python: mydict.items()
          setFieldErrors(
            Object.entries(fieldsErrorMessages).reduce(
              (acc, [fieldName, errors]) => {
                acc[fieldName] = {
                  validateStatus: "error",
                  help: Array.isArray(errors) ? errors.join(" ") : ""
                };
                return acc;
              },
              {}
            )
          );
          //   Object.entries(fieldsErrorMessages).reduce(
          //     (acc, [fieldName, errors]) => {
          //       // errors : ["m1", "m2"].join(" ") => "m1 "m2"
          //       acc[fieldName] = {
          //         validateStatus: "error",
          //         help: errors.join(" ")
          //       };
          //       return acc;
          //     },
          //     {}
          //   )
          // );
        }
      }
    }
    foo();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card title='로그인'>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: 'Please input your username!' },
            { min: 5, message: "5글자 이상 입력해 주세요." }
          ]}
          hasFeedback
          {...fieldErrors.username}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
          hasFeedback
          {...fieldErrors.password}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
