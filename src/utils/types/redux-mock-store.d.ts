import { Store } from "redux";
import { MockStoreEnhanced } from "redux-mock-store";

declare module "redux-mock-store" {
  export default function configureStore(
    middlewares?: any[]
  ): (state?: any) => MockStoreEnhanced<Store>;
}
