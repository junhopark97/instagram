import React, { useEffect, useState } from "react";
import { Card } from "antd";
import Suggestion from "./Suggesion";
import axios from "axios";
import "./SuggestionList.scss";
import { useAppContext } from "store";

export default function SuggestionList({ style }) {
  const { store: { accessToken } } = useAppContext();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    async function fetchUserList() {
      const apiUrl = "http://localhost:8000/accounts/suggestions/";
      const headers = { Authorization: `Bearer ${accessToken}` };
      try {
        const { data } = await axios.get(apiUrl, { headers });
        setUserList(data);

      } catch (error) {
        console.log(error);
      }
    }
    fetchUserList();
  }, [])

  return (
    <div style={style}>
      <Card title="Suggestions for you" size="small">
        {userList.map(suggestionUser => (
          <Suggestion key={suggestionUser.username} suggestionUser={suggestionUser} />
        ))}
        {/* <Suggestion />
        <Suggestion />
        <Suggestion /> */}
      </Card>
    </div>
  )
}
