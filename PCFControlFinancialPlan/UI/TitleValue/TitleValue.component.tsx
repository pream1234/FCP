import React = require("react");
import "./TitleValue.css";
import { Grid } from "@mui/material";

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
    <Grid className={woundTitleClassName} container>
      <Grid item xs={3}>
        <p className={titleClassName}>{title}</p>
      </Grid>
      <Grid item xs={6}>
        <p
          className={`${valueClassName} ${valueClassNameSecondary}`}
          onClick={onValueClick}
        >
          {" "}
          {value}{" "}
        </p>
      </Grid>
    </Grid>
  );
};

export default TitleValue;
