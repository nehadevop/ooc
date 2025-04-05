import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  ProjectOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

export const MainLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible style={{ background: "#141414" }}>
        <div
          className="logo"
          style={{
            height: "64px",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          RFP Analyzer
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ProjectOutlined />}>
            <Link to="/projects">Projects</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#141414", padding: "0 16px" }}>
          <div style={{ float: "right", color: "rgba(255, 255, 255, 0.85)" }}>
            <UserOutlined /> User Name
          </div>
        </Header>
        <Content style={{ margin: "16px", background: "transparent" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
