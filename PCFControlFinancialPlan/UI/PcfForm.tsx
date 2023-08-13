import {
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Typography,
} from "@mui/material";
import React = require("react");
import SearchIcon from "@mui/icons-material/Search";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useState } from "react";
import TitleValue from "./TitleValue/TitleValue.component";
import "./PcfForm.css";
import { data, frenchData } from "./PcfForm.data";
import { AppContext, IAppContext } from "../AppContext";

interface IPcfForm {
  lanaguage: any;
}

const PcfForm = ({ lanaguage }: IPcfForm) => {
  //const isFrench = lanaguage === "1036" ? true : false;
  const contextObj = React.useContext<IAppContext | null>(AppContext);
  const isFrench = false;
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  // React.useEffect(() => {
  //   contextObj?.setAccessToken("accessToken");
  // }, []);

  React.useEffect(() => {
    console.log("Tok", contextObj?.accessToken);
  }, [contextObj?.accessToken]);
  console.log(contextObj?.accessToken);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorConvertEl, setAnchorConvertEl] = useState<Element | null>(null);

  const openConvert = Boolean(anchorConvertEl);
  const handleConvertClose = () => {
    setAnchorConvertEl(null);
  };
  const handleMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget as Element);
  };

  const handleMenuConvert = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorConvertEl(event.currentTarget as Element);
  };

  const value = (id: string) => {
    if (isFrench) {
      return frenchData[id];
    } else {
      return data[id];
    }
  };

  return (
    <>
      <div className="actionContainer">
        <div className="actionMain">
          <h3 className="planTitle">Action</h3>
          <Grid container flexDirection="row" className="mainGridContainer">
            <Grid item xs={4}>
              <Button
                variant="outlined"
                startIcon={<SearchIcon />}
                id="LocalizationOpenID"
                className="buttonOpen"
              >
                {value("LocalizationOpenID")}
              </Button>
            </Grid>
            <Grid item xs={5}>
              <div
                style={{ display: "flex", flexDirection: "row", float: "left" }}
              >
                <Typography style={{ marginTop: "6px" }}>
                  {value("LocalizationRefreshInvesmentID")}
                </Typography>
                <FormControlLabel
                  value="No"
                  control={<Switch color="primary" checked={true} />}
                  label="No"
                  style={{ marginLeft: "20px" }}
                />
              </div>
            </Grid>
          </Grid>
          <Grid container flexDirection="row" className="menuContainer">
            <Grid item xs={6}>
              <div className="menuClass">
                <Typography
                  className="convertDropdwonText"
                  onClick={(event: any) => handleMenu(event)}
                >
                  {value("LocalizationNewPlanID")}
                  <KeyboardArrowDown width="18" height="9" />
                </Typography>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                  sx={{
                    top: "24px",
                  }}
                  classes={{
                    paper: "paperstyle",
                  }}
                >
                  <MenuItem
                    className="manageprofile"
                    classes={{
                      root: "typostyle",
                    }}
                    // onClick={redirectToManageProfile}
                  >
                    {value("LocalizationIndividualID")}
                  </MenuItem>

                  <MenuItem
                    className="manageprofile"
                    classes={{
                      root: "typostyle typoStyle2",
                    }}
                    //onClick={confirmLogout}
                  >
                    {value("LocalizationJointID")}
                  </MenuItem>
                </Menu>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="menuClass">
                <Typography
                  className="convertDropdwonText"
                  onClick={(event: any) => handleMenuConvert(event)}
                >
                  {value("LocalizationConvertID")}
                  <KeyboardArrowDown />
                </Typography>
                <Menu
                  id="menu-appbar1"
                  anchorEl={anchorConvertEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={openConvert}
                  onClose={handleConvertClose}
                  sx={{
                    top: "24px",
                  }}
                  classes={{
                    paper: "paperstyle",
                  }}
                >
                  <MenuItem

                  // onClick={redirectToManageProfile}
                  >
                    {value("LocalizationIndJoinID")}
                  </MenuItem>

                  <MenuItem

                  //onClick={confirmLogout}
                  >
                    Joint to Individual
                  </MenuItem>
                </Menu>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="planContainer">
        <div className="planMain">
          <h3 className="planTitle">Plan information</h3>
          <TitleValue
            title="Has a Plan?"
            value="Yes"
            valueClassNameSecondary="hasPlan"
          />
          <TitleValue
            title={value("LocalizationPlanUpdatedId")}
            value="27/02/2023"
            valueClassNameSecondary="planLast"
          />
          <TitleValue
            title={value("LocalizationPlanTypeId")}
            value="Joint"
            valueClassNameSecondary="planType"
          />
          <TitleValue
            title={value("LocalizationSpouseId")}
            value="LN141971"
            valueClassNameSecondary="spouse"
          />
        </div>
      </div>
    </>
  );
};

export default PcfForm;
