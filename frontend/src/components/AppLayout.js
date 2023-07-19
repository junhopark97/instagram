import React from "react";
import { Input, Menu } from "antd";
import "./AppLayout.scss";
import StoryList from "./StoryList";
import SuggestionList from "./SuggestionList";
import LogoImage from "assets/logo.png";

function AppLayout({ children }) {
  return (
    <>
      <div className="app">
        <div className="header">
          <h1 className="page-title">
            <img src={LogoImage} alt="logo" />
          </h1>
          <div className="search"><Input.Search placeholder="입력해 주세요" /></div>
          <div className="topanav">
            <Menu mode="horizontal">
              <Menu.Item key="메뉴1">메뉴1</Menu.Item>
              <Menu.Item key="메뉴2">메뉴2</Menu.Item>
              <Menu.Item key="메뉴3">메뉴3</Menu.Item>
            </Menu>
          </div>
        </div>
        <div className="contents">{children}</div>
        <div className="sidebar">
          <StoryList style={{ marginBottom: "1rem" }} />
          <SuggestionList style={{ marginBottom: "1rem" }} />
        </div>
        <div className="footer">
          &copy; 2023. django with react
        </div>
      </div>
    </>
  )
}

export default AppLayout;
