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
  image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_188493.png&f=1&nofb=1&ipt=95aa70dd7016d7c37751b46707812810af6d7c07cc74ed562523858d98dc25b8&ipo=images",
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
