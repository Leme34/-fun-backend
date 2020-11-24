import { Cookies } from "vue-cookies-ts";

declare module "vue/types/vue" {
  interface Vue {
    $cookies: Cookies;

    isAuth(key: string): void;
  }
}
