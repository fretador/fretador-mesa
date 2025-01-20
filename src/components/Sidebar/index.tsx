import React, { useEffect } from "react";
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
  ClientsBook,
  AlertIcon,
} from "@/utils/icons";
import { useAppSelector } from "@/store/store";
import styles from "./Sidebar.module.css";
import { useRouter } from "next/router";
import { useNotificationCounters } from "@/hooks/notification/useNotificationCounters";

const Sidebar: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const boardUser = useAppSelector((state) => state.auth.boardUser);

  const router = useRouter();
  const routeName = router.pathname.replace("/", "").toUpperCase();

  const MOCK_USER_ID = mockBoardUsers[0].id;
  const [currentUser, setCurrentUser] = React.useState(mockBoardUsers[0]);

  React.useEffect(() => {
    if (boardUser) {
      setCurrentUser(boardUser);
    }
  }, [boardUser]);

  const isMockUser = currentUser?.id === MOCK_USER_ID;

  const { counters, loading: countersLoading, error: countersError, refetch } =
    useNotificationCounters({
      userId: currentUser?.id?.toString(),
      groupKey: currentUser?.profile,
      skip: isMockUser,
    });

  useEffect(() => {
    const handleCountersUpdate = () => {
      refetch();
    };

    window.addEventListener("notificationCountersUpdated", handleCountersUpdate);
    return () => {
      window.removeEventListener("notificationCountersUpdated", handleCountersUpdate);
    };
  }, [refetch]);

  const freightsCount = counters?.freights || 0;
  const driversCount = counters?.drivers || 0;
  const clientsCount = counters?.clients || 0;
  const occurrencesCount = counters?.occurrences || 0;
  const financialCount = counters?.financial || 0;

  if (countersLoading) {
    console.log("Carregando contadores de notificações:", countersLoading);
  }

  if (countersError) {
    console.error("Erro ao buscar contadores de notificações:", countersError);
  }

  return (
    <div>
      <SidebarComp.Root
        user={currentUser}
        className={isRetracted ? styles.retracted : styles.sidebar}
      >
        <SidebarComp.Header user={currentUser} />
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
            badge={isMockUser ? 0 : freightsCount}
          />
          <SidebarComp.Item
            icon={<PersonAddIcon />}
            text="MOTORISTAS"
            isRetracted={isRetracted}
            isFocused={routeName === "MOTORISTAS"}
            badge={isMockUser ? 0 : driversCount}
          />
          <SidebarComp.Item
            icon={<ClientsBook />}
            text="CLIENTES"
            isRetracted={isRetracted}
            isFocused={routeName === "CLIENTES"}
            badge={isMockUser ? 0 : clientsCount}
          />
          <SidebarComp.Item
            icon={<AlertIcon />}
            text="OCORRÊNCIAS"
            isRetracted={isRetracted}
            isFocused={routeName === "OCORRENCIAS"}
            badge={isMockUser ? 0 : occurrencesCount}
          />
          <SidebarComp.Item
            icon={<FinanceIcon />}
            text="FINANCEIRO"
            isRetracted={isRetracted}
            isFocused={routeName === "FINANCEIRO"}
            badge={isMockUser ? 0 : financialCount}
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
    </div>
  );
};

export default Sidebar;
