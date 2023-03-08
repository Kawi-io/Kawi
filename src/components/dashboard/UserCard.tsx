import { Card, Col, Row, Text } from "@nextui-org/react";
import Avatar from "boring-avatars";
import { useRouter } from "next/router";
import { BoringAvatar } from '../BoringAvatar';

export const UserCard = ({ wallet, name, email }: any) => {

  const router = useRouter();

  return (
    <Card css={{ w: "100%", h: "180px" }} isPressable isHoverable onPress={() => router.push(`profile/${wallet}`)}>
      <Card.Body  css={{ backgroundColor: "$white" }}>
        <Row justify="center" align="center">
          <Col css={{ padding: "2%" }}>
            <BoringAvatar wallet={wallet} />
          </Col>
          <Row justify="center" align="center">
            <Col>
              <Text h3 color="black">
                {name}
              </Text>
              <Text color="#525252" size={12}>
                {email}
              </Text>
            </Col>
          </Row>
        </Row>
      </Card.Body>
    </Card>
  );
};
