import React from "react";
import { Card } from "antd";
import "./StoryList.scss";


export default function StoryList({ style }) {
  return (
    <div style={style}>
      <Card title="Stoies" size="small">
        Stories from peole you follow will show up here.
      </Card>
    </div>
  )
}
