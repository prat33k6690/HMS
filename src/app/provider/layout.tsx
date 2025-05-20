import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface layoutProvideProps {
  children: ReactNode;
}

export const LayoutContext = createContext(null);

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvide: React.FC<layoutProvideProps> = ({ children }) => {
  const [screenWidth, setScreenWidth] = useState<any>(window.innerWidth);
  const [isLoader, setIsLoader] = useState(false);
  const [isSidebar, setIsSidebar] = useState(false);
  const [apiServiceSelectedMenus, setApiServiceSelecedMenus] =
    useState<any>(null);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setScreenWidth(window.innerWidth);
      });
    };
  }, [window.innerWidth]);

  const handleLoader = (flag: boolean) => {
    setIsLoader(flag);
  };

  const handleSidebar = (flag: boolean) => {
    setIsSidebar(flag);
  };

  const contextVal: any = {
    screenWidth: screenWidth,
    handleLoader: handleLoader,
    isLoader: isLoader,
    handleSidebar: handleSidebar,
    isSidebar: isSidebar,
    apiServiceSelectedMenus: apiServiceSelectedMenus,
    setApiServiceSelecedMenus: setApiServiceSelecedMenus,
  };

  return (
    <LayoutContext.Provider value={contextVal}>
      {children}
    </LayoutContext.Provider>
  );
};
