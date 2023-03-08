import PropTypes from 'prop-types';
import Avatar from "boring-avatars";

export const BoringAvatar = ({ size , wallet, variant }: any) => {
  return (
    <Avatar
      size={size}
      name={wallet}
      variant={variant}
      colors={["#6B7280", "#2A7886", "#512B58", "#B2BDC3", "#000"]}
    />
  );
};

BoringAvatar.propTypes = {
    size: PropTypes.number,
    wallet: PropTypes.string.isRequired,
    variant: PropTypes.string
}

BoringAvatar.defaultProps = {
    size: 100,
    variant: "beam"
}