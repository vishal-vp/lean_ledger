import { accountBalanceAtom } from "@/atoms/accounts";
import { Form, Input, InputNumber, Modal, message } from "antd";
import { useAtom } from "jotai";

import styles from "./index.module.scss";

export const AccountBalanceEditModal = ({ isModalOpen, onClose }) => {
  const [form] = Form.useForm();
  const [accountBalance, setAccountBalance] = useAtom(accountBalanceAtom);

  async function handleOk() {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      setAccountBalance(Number(values?.balance));
      handleClose();
    } catch {
      message.error(
        "Error saving the data. Please check the form and try again!"
      );
    }
  }

  function handleClose() {
    form.resetFields();
    onClose();
  }

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleClose}
      onClose={handleClose}
      onOk={handleOk}
    >
      <Form
        form={form}
        initialValues={{ balance: accountBalance }}
        className={styles.accountBalanceEditForm}
      >
        <Form.Item name="balance">
          <InputNumber prefix="₹" className={styles.balanceInput} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
