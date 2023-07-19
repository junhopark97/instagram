import React, { useState, useEffect } from "react";
import axios from "axios";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const history = useNavigate();
  const [fieldErrors, setFieldErrors] = useState({});

  const onFinish = (values) => {
    // console.log('Success:', values);
    async function foo() {
      const { username, password } = values;

      setFieldErrors({});

      const data = { username, password };
      try {
        await axios.post("http://localhost:8000/accounts/signup/", data);

        notification.open({
          message: "회원가입 성공",
          description: "로그인 페이지로 이동합니다.",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />
        });

        history("/accounts/login");
      } catch (error) {
        if (error.response) {
          notification.open({
            message: "회원가입 실패",
            description: "아이디/비밀번호를 확인해주세요.",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />
          });

          const { data: fieldErrorMessages } = error.response;

          setFieldErrors(
            Object.entries(fieldErrorMessages).reduce((acc, [fieldName, errors]) => {
              // errors : ["m1", "m2"].join(" ") => "m1 m2";
              acc[fieldName] = {
                validateStatus: "error",
                help: errors.join(" "),
              }
              return acc
            }, {})
          )
        }
      }
    }
    foo();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
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
  );
}
