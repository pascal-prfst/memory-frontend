import { Link } from "react-router-dom";

import classes from "./Button.module.css";

type ButtonProps = {
  children: string | JSX.Element | JSX.Element[];
  to?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  inverted?: true;
  className?: string;
  type?: string;
};

function Button({ children, to, onClick, inverted }: ButtonProps) {
  if (to) {
    return (
      <Link className={`${classes.button} ${inverted && classes.inverted} ${classes.link}`} to={to}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${classes.button} ${inverted && classes.inverted}`}>
      {children}
    </button>
  );
}

export default Button;
