import Form from "../form";

const Modal = ({ visible, setVisible, modal, setModal, token, setToken }) => {
  return (
    <div className="modal-root">
      <Form
        visible={visible}
        setVisible={setVisible}
        modal={modal}
        setModal={setModal}
        token={token}
        setToken={setToken}
      />
    </div>
  );
};

export default Modal;
