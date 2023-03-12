import { Card, Col, Row, Button, Text } from "@nextui-org/react";

interface NftCardProps {
  title: string;
  symbol?: string;
  image?: string;
  description: string;
  btnText?: string;
  event?: () => void;
}

/**
 *
 * @title Titulo del NFT
 * @ysmbol Simbolo del NFT
 * @image url de la imagen del NFT
 * @description Descripcion del NFT
 * @btnText Texto del boton
 * @event opcional, evento que dispara el boton
 *
 */
export const NftCard: React.FC<NftCardProps> = ({
  title,
  symbol,
  image = "https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg",
  description,
  btnText,
  event,
}: NftCardProps) => {
  return (
    <Card css={{ w: "100%", h: "250px" }}>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={image}
          width="100%"
          height="100%"
          objectFit="cover"
          alt="Card example background"
        />
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          bgBlur: "#ffffff66",
          borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row>
          <Col>
            <Text h3 b size={14}>
              {title}
            </Text>
            <Text small size={12}>
              {description}
            </Text>
            <br></br>
            <Text small  size={12}>
              {symbol}
            </Text>
          </Col>
          <Col>
            <Row justify="flex-end">
              {event ? (
                <Button
                  bordered
                  ghost
                  auto
                  rounded
                  color="secondary"
                  onPress={event}
                >
                  <Text
                    css={{ color: "inherit" }}
                    size={12}
                    weight="bold"
                    transform="uppercase"
                  >
                    {btnText}
                  </Text>
                </Button>
              ) : (
                ""
              )}
            </Row>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};
