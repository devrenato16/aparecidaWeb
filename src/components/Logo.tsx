import { HTMLProps } from "react";
import logo from "../assets/logo.png";

interface LogoProps extends HTMLProps<HTMLImageElement> {
  className?: string;
}

const Logo = ({ className = "h-20 w-20", ...props }: LogoProps) => {
  return (
    <img
      src={logo} // Certifique-se de que o caminho está correto
      alt="Logo da Paróquia"
      style={{ width: "50px", height: "50px" }}
      className={className}
      {...props}
    />
  );
};

export default Logo;
