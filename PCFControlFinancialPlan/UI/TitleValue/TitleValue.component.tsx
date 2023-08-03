import React = require("react");
import "./TitleValue.css";

type Props = {
  title: string;
  value: string;
  valueClassName?: string;
  formatValue?: boolean;
  woundTitleClassName?: string;
  titleClassName?: string;
  onValueClick?: any;
  valueClassNameSecondary?: string;
};
const TitleValue = ({
  title,
  value = "-",
  valueClassName = "reviewdata-value",
  formatValue = true,
  woundTitleClassName = "reviewdata-pack",
  titleClassName = "reviewdata-title",
  onValueClick = () => {},
  valueClassNameSecondary,
}: Props) => {
  return (
    <div className={woundTitleClassName}>
      <div className={titleClassName}>{title}</div>
      <div
        className={`${valueClassName} ${valueClassNameSecondary}`}
        onClick={onValueClick}
      >
        {value}{" "}
      </div>
    </div>
  );
};

export default TitleValue;
