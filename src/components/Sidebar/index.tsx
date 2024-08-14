import { mockBoardUsers } from "@/utils/mocks/mockBoardUsers";
import { SidebarComp } from "../SidebarComp";

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
</SidebarComp.Root>;
