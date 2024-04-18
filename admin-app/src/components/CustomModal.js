import React from "react";

import { Modal } from "antd";

const CustomModal = (props) => {
  const { open, hideModal, performAction, title } = props;

  return (
    <Modal
      title="Confirmation"
      open={open}
      onOk={performAction}
      onCancel={hideModal}
      okText="Ok"
      cancel
      Text="Cancel"
    >
      <p>{title}</p>
    </Modal>
  );
};

export default CustomModal;
