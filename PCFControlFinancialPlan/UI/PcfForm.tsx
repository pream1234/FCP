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

const PcfForm = () => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

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

  return (
    <>
      <div className="actionContainer">
        <div className="actionMain">
          <h3 className="planTitle">Action</h3>
          <Grid container flexDirection="row" className="mainGridContainer">
            <Grid item xs={3}>
              <Button variant="outlined" startIcon={<SearchIcon />}>
                Open Plan
              </Button>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={8}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Typography style={{ marginTop: "6px" }}>
                  Refresh Invesment Data?
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
                <Typography classes={{}} className="userstyle">
                  New Plan
                </Typography>
                <IconButton
                  className="dropArrow"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={(event) => handleMenu(event)}
                  color="inherit"
                  sx={{ height: "9px" }}
                >
                  <KeyboardArrowDown width="18" height="9" />
                </IconButton>
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
                    top: "40px",
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
                    Individual
                  </MenuItem>

                  <MenuItem
                    className="manageprofile"
                    classes={{
                      root: "typostyle typoStyle2",
                    }}
                    //onClick={confirmLogout}
                  >
                    Joint
                  </MenuItem>
                </Menu>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="menuClass">
                <Typography classes={{}} className="userstyle">
                  Convert
                </Typography>
                <IconButton
                  className="dropArrow"
                  aria-label="account of current user"
                  aria-controls="menu-appbar1"
                  aria-haspopup="true"
                  onClick={(event) => handleMenuConvert(event)}
                  color="inherit"
                  sx={{ height: "9px" }}
                >
                  <KeyboardArrowDown width="18" height="9" />
                </IconButton>
                <Menu
                  id="menu-appbar1"
                  anchorEl={anchorConvertEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={openConvert}
                  onClose={handleConvertClose}
                  sx={{
                    top: "40px",
                  }}
                  classes={{
                    paper: "paperstyle",
                  }}
                >
                  <MenuItem

                  // onClick={redirectToManageProfile}
                  >
                    Individual to Joint
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
            title="Plan Last Updated"
            value="27/02/2023"
            valueClassNameSecondary="planLast"
          />
          <TitleValue
            title="Plan Type"
            value="Joint"
            valueClassNameSecondary="planType"
          />
          <TitleValue
            title="Spouse"
            value="LN141971"
            valueClassNameSecondary="spouse"
          />
        </div>
      </div>
    </>
  );
};

export default PcfForm;
