import { Card, Table } from "antd";
import { statusIcons } from "../../utils/constants.jsx";

const columns = [
  {
    title: "Project",
    dataIndex: "project",
    key: "project",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (text, record) => (
      <div>
        {statusIcons[record.status]} {text}
      </div>
    ),
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
  },
];

export const RecentActivities = ({ activities }) => (
  <Card
    title={<span style={{ color: "#fff" }}>Recent Activities</span>}
    bordered={false}
    style={{ background: "rgba(255, 255, 255, 0.08)", borderRadius: "8px" }}
  >
    <Table
      columns={columns}
      dataSource={activities}
      pagination={false}
      size="small"
      rowClassName={() => "dark-table-row"}
    />
  </Card>
);
