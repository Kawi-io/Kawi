import { Modal, Row, Text } from "@nextui-org/react";

interface CustomModalProps {
  visible?: boolean;
  close: () => void;
  title: string;
  text: string;
  titleColor?: string;
}

/**
 * @title Titulo que aparece en el modal
 * @text Texto a mostrar en el modal
 * @titleColor Color del titulo
 *
 */
export const CustomModal: React.FC<CustomModalProps> = ({
  visible = false,
  close,
  title,
  text,
  titleColor = "primary",
}: any) => {
  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={close}
    >
      <Modal.Header>
        <Text id="modal-title" size={20} color={titleColor}>
          {title}
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Row justify="center">
          <Text size={14}>{text}</Text>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
