import { SectionHeading } from "@/components/SectionHeading";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

export const AccountsSummary = () => {
  return (
    <SectionHeading
      title={"Balance"}
      value={"$100"}
      actionButtons={[
        <Button icon={<EditOutlined />} />,
        <Button icon={<PlusOutlined />} />,
      ]}
    />
  );
};
