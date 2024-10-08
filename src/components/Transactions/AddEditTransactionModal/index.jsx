import { CATEGORIES_ACTIONS, categoriesAtom } from "@/atoms/categories";
import { TRANSACTIONS_ACTIONS, transactionsAtom } from "@/atoms/transactions";
import { CurrencyInput } from "@/components/CurrencyInput";
import { FORM_ERROR_MESSAGES, TRANSACTION_TYPES } from "@/utils/constants";
import { DatePicker, Form, Input, Modal, Select, message } from "antd";
import dayjs from "dayjs";
import { useAtom } from "jotai";

export const AddEditTransactionModal = ({
  onClose,
  transactionBeingEdited,
}) => {
  const [form] = Form.useForm();
  const [categories, dispatchCategories] = useAtom(categoriesAtom);
  const dispatchTransactions = useAtom(transactionsAtom)[1];

  async function handleSubmit() {
    try {
      await form.validateFields();
      const fieldsValue = form.getFieldValue();
      const newTransactionData = {
        ...fieldsValue,
        date: fieldsValue?.date?.toISOString(),
      };
      if (transactionBeingEdited) {
        dispatchTransactions({
          type: TRANSACTIONS_ACTIONS.EDIT,
          transactionBeingEdited,
          updatedTransactionData: newTransactionData,
        });
        if (transactionBeingEdited?.type === TRANSACTION_TYPES.EXPENSE) {
          dispatchCategories({
            type: CATEGORIES_ACTIONS.UPDATE_EXPENSE,
            newTransactionData,
            oldTransactionData: transactionBeingEdited,
          });
        }
      } else {
        dispatchTransactions({
          type: TRANSACTIONS_ACTIONS.ADD,
          newTransactionData,
        });
        if (newTransactionData?.type === TRANSACTION_TYPES.EXPENSE) {
          dispatchCategories({
            type: CATEGORIES_ACTIONS.LOG_EXPENSE,
            transaction: newTransactionData,
          });
        }
      }
      onClose();
    } catch {
      message.error(FORM_ERROR_MESSAGES.FORM_VALIDATION_ERROR);
    }
  }

  let initialValues = {};
  if (transactionBeingEdited) {
    initialValues = {
      ...transactionBeingEdited,
      date: dayjs(transactionBeingEdited?.date),
    };
  }

  return (
    <Modal
      open={true}
      onCancel={onClose}
      onClose={onClose}
      onOk={handleSubmit}
      title="Add Transaction"
    >
      <Form
        form={form}
        labelCol={{ span: 6 }}
        initialValues={initialValues}
        validateMessages={{
          required: FORM_ERROR_MESSAGES.REQUIRED_FIELD_ERROR,
        }}
      >
        <Form.Item
          label="Date"
          name="date"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker showTime showSecond={false} />
        </Form.Item>
        <Form.Item
          label="Expense Type"
          name="type"
          rules={[
            {
              required: true,
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
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
