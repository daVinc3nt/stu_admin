import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import Wrapper from "@/components/LayoutWrapper";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import * as en from "@/lang/en.json";
import * as vi from "@/lang/vi.json";
import AOS from "aos";
import "aos/dist/aos.css";
import { UserContext } from "@/Context/InfoContext/UserContext";
import cookie from "js-cookie";
function MyApp({ Component, pageProps }: AppProps) {

  const { locale } = useRouter();
  const [info, setInfo] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      if (!cookie.get("token"))
         router.push("/log")
    };
    fetchData();
  }, []);
  // useEffect(() => {
  //   console.log("cái này dùng để check xem còn cookie không");
  //   if (!Cookies.get("connect.sid")) {
  //     if (router.pathname != "/log" && router.pathname != "/") {
  //       router.push("/log");
  //     }
  //   }
  // }, [value]);
  const messages = {
    vi,
    en,
  };
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  });
  return (
    <>
        <UserContext.Provider value={{ info, setInfo }}>
          <IntlProvider locale={locale} messages={messages[locale]}>
            <Wrapper>
              <Component {...pageProps} />
            </Wrapper>
          </IntlProvider>
        </UserContext.Provider>
    </>
  );
}

export default MyApp;
