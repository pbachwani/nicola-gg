export const RollText = ({ children, className = "", style = {} }) => (
  <span className={`roll-text ${className}`} style={style}>
    {" "}
    <span className="roll-inner">
      {" "}
      <span>{children}</span> <span aria-hidden="true">{children}</span>{" "}
    </span>{" "}
  </span>
); // CSS (add to your stylesheet)
