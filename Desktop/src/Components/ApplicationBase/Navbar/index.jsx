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
    setSelectedMenu("Summary");
    onNavbarSelect("Summary");
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
            onClick={() => onNavbarSelect("Summary")}
            isSelected={selectedMenu === "Summary"}
          >
            <AttachMoneyOutlinedIcon fontSize="large" />
            Resumo
          </NavbarItem>
          <NavbarItem
            onClick={() => onNavbarSelect("Sales")}
            isSelected={selectedMenu === "Sales" || selectedMenu === "FormSale"}
          >
            <ShoppingCartOutlinedIcon fontSize="large" />
            Vendas
          </NavbarItem>
          <NavbarItem
            onClick={() => onNavbarSelect("OSs")}
            isSelected={selectedMenu === "OSs" || selectedMenu === "FormOs"}
          >
            <ReceiptOutlinedIcon fontSize="large" />
            OSs
          </NavbarItem>
          <NavbarItem
            onClick={() => onNavbarSelect("Storage")}
            isSelected={
              selectedMenu === "Storage" || selectedMenu === "FormProduct"
            }
          >
            <StorageOutlinedIcon fontSize="large" />
            Estoque
          </NavbarItem>
          <NavbarItem
            onClick={() => onNavbarSelect("Clients")}
            isSelected={
              selectedMenu === "Clients" || selectedMenu === "FormClient"
            }
          >
            <FaceOutlinedIcon fontSize="large" />
            Clientes
          </NavbarItem>
        </div>
      </NavbarDiv>
    </NavbarStyle>
  );
};

export default Navbar;
