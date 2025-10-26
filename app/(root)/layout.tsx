import Header from "@/components/Header";
import NavItems from "@/components/NavItems";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={"min-h-screen text-gray-400"}>
      <Header />
      <div className="container py-10">{children}</div>
    </main>
  );
};
export default Layout;
