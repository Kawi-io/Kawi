import { Col, Modal, Row, Text } from "@nextui-org/react";
import { Footer } from "./Footer";

interface CustomModalProps {
  visible?: boolean;
  close: () => void;
  title: string;
  text: string;
  titleColor?: string;
  onAcept?: () => void;
  onCancel?: () => void;
}

/**
 * @visible Muestra si el modal es visible o no
 * @close Funcion de metodo a realizar al cerrar el modal
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
  onAcept = null,
  onCancel = null,
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
      <Modal.Footer>
        {onAcept != null || onCancel != null ? (
          <Row justify="center" align="center">
            <Col>
              <button
                className="
                inline-flex
                items-center
                rounded-full
                px-10
                py-3
                text-sm
                font-medium
                shadow-sm
                focus:outline-none 
                focus:ring-2 
                focus:ring-offset-2
                bg-teal
                hover:bg-teal-900
                focus:ring-teal-500
                text-white
                border-transparent
                w-50
                flex justify-center
                "
                type="button"
                onClick={onAcept}
              >
                Accept
              </button>
            </Col>
            <Col>
              <button
                className="
                inline-flex
                items-center
                rounded-full
                px-10
                py-3
                text-sm
                font-medium
                shadow-sm
                focus:outline-none 
                focus:ring-2 
                focus:ring-offset-2
                border-transparent
                w-50
                flex justify-center
                border
                bg-white
                hover:bg-teal
                focus:ring=teal-900
                hover:text-white
                text-gray-700
                border-teal
                "
                type="button"
                onClick={onCancel}
              >
                Decline
              </button>
            </Col>
          </Row>
        ) : null}
      </Modal.Footer>
    </Modal>
  );
};
