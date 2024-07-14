import { accountBalanceAtom } from "@/atoms/accounts";
import { Form, Modal, message } from "antd";
import { useAtom } from "jotai";

import styles from "./index.module.scss";
import { FORM_ERROR_MESSAGES } from "@/utils/constants";
import { CurrencyInput } from "@/components/CurrencyInput";

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
      message.error(FORM_ERROR_MESSAGES.FORM_VALIDATION_ERROR);
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
        <Form.Item name="balance" rules={[{ required: true }]}>
          <CurrencyInput />
        </Form.Item>
      </Form>
    </Modal>
  );
};
