import Image from "next/image";

export function LogoMark({ size = 36 }: { size?: number }) {
  const blocks = [
    { x: 0, y: 0, fill: "#2DAAFF" }, { x: 1, y: 0, fill: "#2DAAFF" }, { x: 2, y: 0, fill: "#55DCFF" },
    { x: 1, y: 1, fill: "#0073FF" }, { x: 2, y: 1, fill: "#2DAAFF" }, { x: 3, y: 1, fill: "#2DAAFF" },
    { x: 1, y: 2, fill: "#55DCFF" }, { x: 2, y: 2, fill: "#2DAAFF" },
    { x: 2, y: 3, fill: "#2DAAFF" },
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 4 4" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {blocks.map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width="1" height="1" fill={b.fill} />
      ))}
    </svg>
  );
}

export function Logo() {
  return (
    <Image
      src="/assets/images/logo_blacktext.png"
      alt="Tempest"
      width={120}
      height={32}
      priority
    />
  );
}

export function LogoWhite() {
  return (
    <Image
      src="/assets/images/tempest_logo_white.png"
      alt="Tempest"
      width={120}
      height={32}
      priority
    />
  );
}
