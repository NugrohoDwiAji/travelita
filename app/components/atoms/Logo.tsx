import Image from "next/image";

type LogoProps = {
  /** Custom SVG icon logo Travelita – siluet pesawat + gelombang laut */
  customIcon?: string;
};

/** SVG icon logo Travelita – siluet pesawat + gelombang laut */
export default function Logo({ customIcon }: LogoProps) {
  return (
    <div>
      {customIcon || (
        <Image
          src="/logo/logo-nobg.png"
          alt="Travelita logo"
          width={40}
          height={40}
          style={{ width: "auto", height: "40px" }}
        />
      )}
    </div>
  );
}
