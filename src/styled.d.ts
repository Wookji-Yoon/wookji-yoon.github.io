// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    fontColor: string;
    bgColor: string;
    accentColor: string;
  }
}
