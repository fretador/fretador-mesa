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
  CalculatorIcon,
} from "@/utils/icons";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { resetNotification, NotificationKey } from "@/store/slices/notificationsSlice";
import styles from "./Sidebar.module.css";
import { useRouter } from "next/router";

const Sidebar: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const notifications = useAppSelector((state) => state.notifications);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Extrai o nome da rota atual e converte para caixa alta
  const routeName = router.pathname.replace("/", "").toUpperCase();

  const handleItemClick = (context: NotificationKey) => {
    dispatch(resetNotification(context));
  };

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
          onClick={() => handleItemClick("fretes")}
          badge={notifications.counters.fretes}
        />
        <SidebarComp.Item
          icon={<PersonAddIcon />}
          text="MOTORISTAS"
          isRetracted={isRetracted}
          isFocused={routeName === "MOTORISTAS"}
          onClick={() => handleItemClick("motoristas")}
          badge={notifications.counters.motoristas}
        />
        <SidebarComp.Item
          icon={<ClientsBook />}
          text="CLIENTES"
          isRetracted={isRetracted}
          isFocused={routeName === "CLIENTES"}
          onClick={() => handleItemClick("clientes")}
          badge={notifications.counters.clientes}
        />
        <SidebarComp.Item
          icon={<HelpIcon />}
          text="OCORRÊNCIAS"
          isRetracted={isRetracted}
          isFocused={routeName === "OCORRENCIAS"}
          onClick={() => handleItemClick("ocorrencias")}
          badge={notifications.counters.ocorrencias}
        />
        {/* TODO: Cotações */}
        {/* <SidebarComp.Item
          icon={<CalculatorIcon />}
          text="COTAÇÕES"
          isRetracted={isRetracted}
          isFocused={routeName === "COTACAO"}
          onClick={() => handleItemClick("cotacao")}
          badge={notifications.counters.cotacao}
        /> */}
        <SidebarComp.Item
          icon={<FinanceIcon />}
          text="FINANCEIRO"
          isRetracted={isRetracted}
          isFocused={routeName === "FINANCEIRO"}
          onClick={() => handleItemClick("financeiro")}
          badge={notifications.counters.financeiro}
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