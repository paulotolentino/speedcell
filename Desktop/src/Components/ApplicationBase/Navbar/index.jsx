import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  NavbarStyle,
  NavbarDiv,
  NavbarItem,
  Logo,
  LogoDiv,
} from "./Navbar_style";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import ReceiptOutlinedIcon from "@material-ui/icons/ReceiptOutlined";
import StorageOutlinedIcon from "@material-ui/icons/StorageOutlined";
import FaceOutlinedIcon from "@material-ui/icons/FaceOutlined";
import AttachMoneyOutlinedIcon from "@material-ui/icons/AttachMoneyOutlined";
import SpeedCell from "../../../Assets/logo/marca.png";

const Navbar = () => {
  const [selectedMenu, setSelectedMenu] = useState("");

  const history = useHistory();

  const onNavbarSelect = (selectedMenuParam) => {
    if (selectedMenuParam !== selectedMenu) {
      history.push({
        pathname: `/${selectedMenuParam}`,
      });

      setSelectedMenu(selectedMenuParam);
    }
  };

  useEffect(() => {
    setSelectedMenu("Sales");
    onNavbarSelect("Sales");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavbarStyle>
      <LogoDiv>
        <Logo src={SpeedCell} alt="Logo" />
      </LogoDiv>
      <p></p>
      <NavbarDiv>
        <div>
          <NavbarItem
            onClick={() => onNavbarSelect("Sales")}
            isSelected={selectedMenu === "Sales"}
          >
            <ShoppingCartOutlinedIcon fontSize="large" />
            Vendas
          </NavbarItem>
          <NavbarItem
            onClick={() => onNavbarSelect("OSs")}
            isSelected={selectedMenu === "OSs"}
          >
            <ReceiptOutlinedIcon fontSize="large" />
            OSs
          </NavbarItem>
          <NavbarItem
            onClick={() => onNavbarSelect("Storage")}
            isSelected={
              selectedMenu === "Storage" || selectedMenu === "CreateProduct"
            }
          >
            <StorageOutlinedIcon fontSize="large" />
            Estoque
          </NavbarItem>
          <NavbarItem
            onClick={() => onNavbarSelect("Clients")}
            isSelected={selectedMenu === "Clients"}
          >
            <FaceOutlinedIcon fontSize="large" />
            Clientes
          </NavbarItem>
          <NavbarItem
            onClick={() => onNavbarSelect("Summary")}
            isSelected={selectedMenu === "Summary"}
          >
            <AttachMoneyOutlinedIcon fontSize="large" />
            Resumo
          </NavbarItem>
        </div>
      </NavbarDiv>
    </NavbarStyle>
  );
};

export default Navbar;
