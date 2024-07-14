import { categoriesAtom } from "@/atoms/categories";
import { CurrencyInput } from "@/components/CurrencyInput";
import { CATEGORY_TYPES, FORM_ERROR_MESSAGES } from "@/utils/constants";
import { Form, Input, Modal, Radio, message } from "antd";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";

export const AddEditCategoryModal = ({
  isOpen,
  onClose,
  categoryBeingEdited,
}) => {
  const [form] = Form.useForm();
  const setCategories = useSetAtom(categoriesAtom);

  function handleClose() {
    form.resetFields();
    onClose();
  }

  async function handleSubmit() {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      if (categoryBeingEdited) {
        setCategories((existingCategories) => [
          ...existingCategories?.filter(
            ({ id }) => id !== categoryBeingEdited?.id
          ),
          {
            ...existingCategories?.find(
              ({ id }) => id === categoryBeingEdited?.id
            ),
            ...values,
          },
        ]);
      } else {
        setCategories((existingCategories) => [
          ...existingCategories,
          {
            id: nanoid(),
            createdAt: new Date().toISOString(),
            ...values,
          },
        ]);
      }
      onClose();
    } catch {
      message.error(FORM_ERROR_MESSAGES.FORM_VALIDATION_ERROR);
    }
  }

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      onClose={handleClose}
      onOk={handleSubmit}
    >
      <Form
        form={form}
        initialValues={categoryBeingEdited && { ...categoryBeingEdited }}
      >
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
