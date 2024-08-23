import React from "react";
import Botao from "@/components/Botao";
import Body from "@/components/Body";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import styles from "./Motoristas.module.css";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import SearchComponent from "@/components/SearchButton";

const Drivers: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();

  const routeName = router.pathname.replace("/", "").toUpperCase();

  return (
    <AuthenticatedLayout>
      <div className={styles.container}>
        <div>
          <Sidebar />
        </div>

        <div
          className={
            isRetracted ? styles.retractedContentWrapper : styles.contentWrapper
          }
        >
          <div className={styles.header}>
            <Header title={routeName} />
          </div>
          <div className={styles.content}>
            <Body>
              <div>
                <SearchComponent />
              </div>
              <div>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur enim possimus id tempora repellat nam, adipisci aperiam accusamus corrupti, rem laudantium, doloribus commodi? Itaque non exercitationem voluptatem. Eos, reiciendis earum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quia consequuntur laudantium qui, enim cupiditate dolor voluptatem iure consequatur ipsum aliquid ducimus labore doloremque nam cum eos deleniti sequi quam? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum nihil totam dolor doloremque qui delectus debitis corporis doloribus cumque, assumenda pariatur facilis minima praesentium incidunt nisi beatae? Sequi, iste voluptas! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus, libero et esse ullam quas ipsam consequatur odio eum maxime asperiores eligendi dolorem nisi, vero nesciunt, magnam unde quasi impedit assumenda.</p>
              </div>
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Drivers;
