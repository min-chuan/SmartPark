import type { RootState } from '@/store';
import { Col, Form, Input, message, Modal, Radio, Row } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { editUser, type UserData } from '../../api/userList';

interface FormProps {
  title: string;
  visible: boolean;
  formData?: UserData;
  hideModal: () => void;
  lodaData: () => void;
}

function UserForm(props: FormProps) {
  const { title, visible, hideModal, lodaData } = props;
  const [form] = Form.useForm();
  const userData = useSelector((state: RootState) => state.user.userData);

  useEffect(() => {
    if (userData) {
      form.setFieldsValue(userData);
    } else {
      form.resetFields();
    }
  }, [visible]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (userData) {
        // 编辑
        values.id = userData.id;
      }
      const res = await editUser(values);
      message.success(res.data);
      hideModal();
      lodaData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      title={title}
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={visible}
      onOk={handleOk}
      onCancel={hideModal}
      width={800}
    >
      <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="客户名称"
              name="name"
              rules={[{ required: true, message: '客户名称不能为空' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="联系电话"
              name="tel"
              rules={[
                { required: true, message: '联系电话不能为空' },
                { pattern: /^1[3-9]\d{9}$/, message: '联系电话格式不正确' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="经营状态"
              name="status"
              rules={[{ required: true, message: '经营状态不能为空' }]}
            >
              <Radio.Group>
                <Radio value="1">营业中</Radio>
                <Radio value="2">暂停营业</Radio>
                <Radio value="3">已关闭</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="所属行业"
              name="business"
              rules={[{ required: true, message: '所属行业不能为空' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                { required: true, message: '邮箱不能为空' },
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '邮箱格式不正确',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="统一信用代码"
              name="creditCode"
              rules={[{ required: true, message: '统一信用代码不能为空' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="工商注册号"
              name="industryNum"
              rules={[{ required: true, message: '工商注册号不能为空' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="组织结构代码"
              name="organizationCode"
              rules={[{ required: true, message: '组织结构代码不能为空' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="法人名"
              name="legalPerson"
              rules={[{ required: true, message: '法人名不能为空' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default React.memo(UserForm);
