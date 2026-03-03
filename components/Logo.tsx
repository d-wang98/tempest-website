import Image from "next/image";
import logoImg from "@/assets/logo.png";

export function Logo() {
  return (
    <Image
      src={logoImg}
      alt="Tempest Logo"
      width={130}
      height={45}
      className="object-contain"
    />
  );
}
