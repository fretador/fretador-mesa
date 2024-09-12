import { mockBoardUsers } from "@/utils/mocks/mockBoardUsers";
import { SidebarComp } from "../SidebarComp";
import {
  FinanceIcon,
  HelpIcon,
  HomeIcon,
  LogoutIcon,
  PersonAddIcon,
  SettingsIcon,
  SupportIcon,
  TruckIcon,
  WarningIcon,
  ClientsBook,
} from "@/utils/icons";
import { useAppSelector } from "@/store/store";
import styles from "./Sidebar.module.css";
import { useRouter } from "next/router";

const Sidebar: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();

  // Extrai o nome da rota atual e converte para caixa alta
  const routeName = router.pathname.replace("/", "").toUpperCase();

  return (
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
          isFocused={routeName === "HOME"}
        />
        <SidebarComp.Item
          icon={<TruckIcon />}
          text="FRETES"
          isRetracted={isRetracted}
          isFocused={routeName === "FRETES"}
        />
        <SidebarComp.Item
          icon={<PersonAddIcon />}
          text="MOTORISTAS"
          isRetracted={isRetracted}
          isFocused={routeName === "MOTORISTAS"}
        />
        <SidebarComp.Item
          icon={<ClientsBook />}
          text="CLIENTES"
          isRetracted={isRetracted}
          isFocused={routeName === "CLIENTES"}
        />
        <SidebarComp.Item
          icon={<HelpIcon />}
          text="OCORRÊNCIAS"
          isRetracted={isRetracted}
          isFocused={routeName === "OCORRENCIAS"}
        />
        <SidebarComp.Item
          icon={<FinanceIcon />}
          text="FINANCEIRO"
          isRetracted={isRetracted}
          isFocused={routeName === "FINANCEIRO"}
        />
        <SidebarComp.Separator isRetracted={isRetracted} />
        <SidebarComp.Item
          icon={<SettingsIcon />}
          text="CONFIGURAÇÕES"
          isRetracted={isRetracted}
          isFocused={routeName === "CONFIGURACOES"}
        />
        <SidebarComp.Item
          icon={<SupportIcon />}
          text="ATENDIMENTO"
          isRetracted={isRetracted}
          isFocused={routeName === "ATENDIMENTO"}
        />
        <SidebarComp.Item
          icon={<HelpIcon />}
          text="AJUDA"
          isRetracted={isRetracted}
          isFocused={routeName === "AJUDA"}
        />
        <SidebarComp.Item
          icon={<LogoutIcon />}
          text="DESLOGAR"
          isRetracted={isRetracted}
          isFocused={routeName === "DESLOGAR"}
        />
      </SidebarComp.List>
    </SidebarComp.Root>
  );
};

export default Sidebar;
