import Avatar from "boring-avatars";

interface Props {
  size?: number;
  wallet: string;
  variant?: "marble" | "pixel" | "sunset" | "ring" | "bauhaus" | "beam";
}

export const BoringAvatar = ({ size = 100, wallet, variant = "beam" }: Props) => {
  return (
    <Avatar
      size={size}
      name={wallet}
      variant={variant}
      colors={["#6B7280", "#2A7886", "#512B58", "#B2BDC3", "#000"]}
      aria-label={`Avatar for ${wallet}`}
    />
  );
};
