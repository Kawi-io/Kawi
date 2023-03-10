import { Container, Loading, Row } from "@nextui-org/react";
import { useEffect } from "react";

interface Props {
  visible?: boolean;
}

const ModalLoader: React.FC<Props> = ({ visible = false }: any) => {
  // useEffect(() => {
  //   if (loading) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "unset";
  //   }
  // }, [loading]);

  return (
    <>
      {visible && (
        <Container className="py-24">
          <Row justify="center" align="center">
            <Loading>Loading</Loading>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ModalLoader;
