import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { SidebarComp } from "@/components/SidebarComp";
import SidebarCompRoot from "@/components/SidebarComp/SidebarCompRoot";
import Body from "@/components/Body";
import styles from "./Canva.module.css";
import { Row } from "@/components/Row";
import { useAppSelector } from "@/store/store";
import { mockBoardUsers } from "@/utils/mocks/mockBoardUsers";
import {
  HomeIcon,
  TruckIcon,
  PersonAddIcon,
  PeopleIcon,
  WarningIcon,
  FinanceIcon,
  SettingsIcon,
  SupportIcon,
  HelpIcon,
  LogoutIcon,
} from "@/utils/icons";

const Canva: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <SidebarComp.Root
          user={mockBoardUsers[0]}
          className={isRetracted ? styles.retracted : styles.sidebar}
        >
          <SidebarComp.Header user={mockBoardUsers[0]} />
          <SidebarComp.List>
            <SidebarComp.Item
              icon={<HomeIcon />}
              text="HOME"
              isRetracted={isRetracted}
              isFocused={true}
              badge={2}
            />
            <SidebarComp.Item
              icon={<TruckIcon />}
              text="MEUS FRETES"
              isRetracted={isRetracted}
              isFocused={false}
            />
            <SidebarComp.Item
              icon={<PersonAddIcon />}
              text="MOTORISTAS"
              isRetracted={isRetracted}
              isFocused={false}
            />
            <SidebarComp.Item
              icon={<WarningIcon />}
              text="CLIENTES"
              isRetracted={isRetracted}
              isFocused={false}
            />
            <SidebarComp.Item
              icon={<HelpIcon />}
              text="OCORRÊNCIAS"
              isRetracted={isRetracted}
              isFocused={false}
            />
            <SidebarComp.Item
              icon={<FinanceIcon />}
              text="FINANCEIRO"
              isRetracted={isRetracted}
              isFocused={false}
            />
            <SidebarComp.Separator isRetracted={isRetracted} />
            <SidebarComp.Item
              icon={<SettingsIcon />}
              text="CONFIGURAÇÕES"
              isRetracted={isRetracted}
              isFocused={false}
            />
            <SidebarComp.Item
              icon={<SupportIcon />}
              text="ATENDIMENTO"
              isRetracted={isRetracted}
              isFocused={false}
            />
            <SidebarComp.Item
              icon={<HelpIcon />}
              text="AJUDA"
              isRetracted={isRetracted}
              isFocused={false}
            />
            <SidebarComp.Item
              icon={<LogoutIcon />}
              text="DESLOGAR"
              isRetracted={isRetracted}
              isFocused={false}
            />
          </SidebarComp.List>
        </SidebarComp.Root>

        <div
          className={`${styles.content} ${
            isRetracted ? styles.contentRetracted : ""
          }`}
        >
          <Body>
            <Row.Root>
              <Row.FreightDate date={new Date()} />
              <Row.Cte cte="000000" />
              <Row.Route originState="SP" destinyState="RJ" />
              <Row.FreightCode code={"ABC123"} />
            </Row.Root>
          </Body>
        </div>
      </div>
    </div>
  );
};

export default Canva;
