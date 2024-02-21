// Footer.js
import React from "react";
import { Layout, Typography, Tooltip } from "antd";

const { Footer } = Layout;
const { Link } = Typography;

const AppFooter = () => {
  return (
    <Footer id="footer" style={{ textAlign: "center" }}>
      Portal ©2024 Created by{" "}
      <Tooltip title="Github">
        <Link href="https://github.com/CHAUDHARYS1" target="_blank" style={{color:"white", textDecoration:"underline"}}>
          Shital Chaudhary
        </Link>
      </Tooltip>
    </Footer>
  );
};

export default AppFooter;
