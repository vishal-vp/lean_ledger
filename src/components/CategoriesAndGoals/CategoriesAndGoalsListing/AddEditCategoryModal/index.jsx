import { CATEGORIES_ACTIONS, categoriesAtom } from "@/atoms/categories";
import { CurrencyInput } from "@/components/CurrencyInput";
import { CATEGORY_TYPES, FORM_ERROR_MESSAGES } from "@/utils/constants";
import { Form, Input, Modal, Radio, message } from "antd";
import { useAtom } from "jotai";

export const AddEditCategoryModal = ({
  isOpen,
  onClose,
  categoryBeingEdited,
}) => {
  const [form] = Form.useForm();
  const categoriesDispatch = useAtom(categoriesAtom)[1];

  function handleClose() {
    form.resetFields();
    onClose();
  }

  async function handleSubmit() {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      if (categoryBeingEdited) {
        categoriesDispatch({
          type: CATEGORIES_ACTIONS.EDIT,
          categoryBeingEdited,
          updatedCategoryData: values,
        });
      } else {
        categoriesDispatch({
          type: CATEGORIES_ACTIONS.ADD,
          newCategoryData: values,
        });
      }
      onClose();
    } catch {
      message.error(FORM_ERROR_MESSAGES.FORM_VALIDATION_ERROR);
    }
  }

  let initialValues = { amountPending: 0 };
  if (categoryBeingEdited) {
    initialValues = { ...categoryBeingEdited };
  }

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      onClose={handleClose}
      onOk={handleSubmit}
    >
      <Form form={form} initialValues={initialValues}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Budget"
          name="budgetAmount"
          rules={[{ required: true }]}
        >
          <CurrencyInput />
        </Form.Item>
        <Form.Item
          label="Balance"
          name="amountPending"
          rules={[{ required: true }]}
        >
          <CurrencyInput />
        </Form.Item>
        <Form.Item name="type" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value={CATEGORY_TYPES.MONTHLY}>
              {CATEGORY_TYPES.MONTHLY}
            </Radio>
            <Radio value={CATEGORY_TYPES.YEARLY}>{CATEGORY_TYPES.YEARLY}</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};
