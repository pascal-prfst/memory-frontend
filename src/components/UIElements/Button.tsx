import { Link } from "react-router-dom";

import classes from "./Button.module.css";

type ButtonProps = {
  children: string | JSX.Element | JSX.Element[];
  to?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  inverted?: true;
  className?: string;
  type?: string;
  disabled?: boolean;
};

function Button({ children, to, onClick, inverted, disabled }: ButtonProps) {
  const disabledStyle = {
    color: disabled ? "lightgray" : "",
    border: disabled ? "3px solid lightgray" : "",
  };

  if (to) {
    return (
      <Link className={`${classes.button} ${inverted && classes.inverted} ${classes.link}`} to={to}>
        {children}
      </Link>
    );
  }

  return (
    <button
      style={disabledStyle}
      onClick={onClick}
      disabled={disabled}
      className={`${classes.button}  ${inverted && classes.inverted}`}>
      {children}
    </button>
  );
}

export default Button;
