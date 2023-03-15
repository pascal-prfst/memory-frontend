import classes from "./Overlay.module.css";

type PropTypes = {
  closeModal: () => void;
};

function Overlay({ closeModal }: PropTypes) {
  return <div onClick={closeModal} className={classes.overlay}></div>;
}

export default Overlay;
