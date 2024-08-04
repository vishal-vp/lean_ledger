import { categoriesAtom } from "@/atoms/categories";
import { transactionsAtom } from "@/atoms/transactions";
import { CurrencyInput } from "@/components/CurrencyInput";
import { FORM_ERROR_MESSAGES, TRANSACTION_TYPES } from "@/utils/constants";
import { Form, Input, Modal, Select, message } from "antd";
import { useAtomValue, useSetAtom } from "jotai";
import { nanoid } from "nanoid";

export const AddTransactionModal = ({ onClose }) => {
  const [form] = Form.useForm();
  const categories = useAtomValue(categoriesAtom);
  const setTransactions = useSetAtom(transactionsAtom);

  async function handleSubmit() {
    try {
      await form.validateFields();
      const newTransaction = form.getFieldsValue();
      setTransactions((previousTransactions) => [
        ...previousTransactions,
        {
          ...newTransaction,
          id: nanoid(),
          createdAt: new Date().toISOString(),
        },
      ]);
      onClose();
    } catch {
      message.error(FORM_ERROR_MESSAGES.FORM_VALIDATION_ERROR);
    }
  }

  return (
    <Modal open={true} onCancel={onClose} onClose={onClose} onOk={handleSubmit}>
      <Form form={form} labelCol={{ span: 6 }}>
        <Form.Item
          label="Expense Type"
          name="type"
          rules={[
            {
              required: true,
              message: FORM_ERROR_MESSAGES.REQUIRED_FIELD_ERROR,
            },
          ]}
        >
          <Select
            options={Object.values(TRANSACTION_TYPES).map(
              (transactionType) => ({
                value: transactionType,
                label: transactionType,
              })
            )}
          />
        </Form.Item>
        <Form.Item dependencies={["type"]} noStyle>
          {({ getFieldValue }) =>
            getFieldValue("type") === TRANSACTION_TYPES.EXPENSE ? (
              <Form.Item
                label="Category"
                name="categoryId"
                rules={[
                  {
                    required: true,
                    message: FORM_ERROR_MESSAGES.REQUIRED_FIELD_ERROR,
                  },
                ]}
              >
                <Select
                  options={categories?.map((category) => ({
                    label: category?.name,
                    value: category?.id,
                  }))}
                />
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: FORM_ERROR_MESSAGES.REQUIRED_FIELD_ERROR,
            },
          ]}
        >
          <CurrencyInput />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: FORM_ERROR_MESSAGES.REQUIRED_FIELD_ERROR,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
