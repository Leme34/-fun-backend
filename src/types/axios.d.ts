import { AxiosInstance } from "axios";

declare module "axios" {
  interface AxiosInstance {
    adornUrl: any;
    adornParams: any;
    adornData: any;
  }
}
