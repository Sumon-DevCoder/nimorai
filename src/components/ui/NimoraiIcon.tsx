import Image from "next/image";
import { cn } from "@/lib/utils";

export type IconName =
  | "token"
  | "nft"
  | "coin"
  | "ide"
  | "platform"
  | "chain"
  | "affiliate"
  | "license";

const ICONS: Record<IconName, string> = {
  token: "/assets/nimorai-icons/token.svg",
  nft: "/assets/nimorai-icons/nft.svg",
  coin: "/assets/nimorai-icons/coin.svg",
  ide: "/assets/nimorai-icons/ide.svg",
  platform: "/assets/nimorai-icons/platform.svg",
  chain: "/assets/nimorai-icons/chain.svg",
  affiliate: "/assets/nimorai-icons/affiliate.svg",
  license: "/assets/nimorai-icons/license.svg",
};

/** Renders the original NIMORAI SVG icon set from `/public/assets/nimorai-icons`. */
export function NimoraiIcon({
  name,
  size = 20,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={ICONS[name]}
      alt=""
      width={size}
      height={size}
      aria-hidden="true"
      className={cn("select-none shrink-0", className)}
    />
  );
}

