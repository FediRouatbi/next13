import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import { ThemeProvider } from "@/components/themeProvider";
import AuthLayer from "@/layer/AuthLayer";
import { db } from "@/util/db";
interface LyoutChildren {
  children: React.ReactNode;
}

export default async function Layout({ children }: LyoutChildren) {

    const categories = await db.category.findMany();


  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthLayer>
        <Navbar categories={categories} />
        <main>{children}</main>
        <Footer />
      </AuthLayer>
    </ThemeProvider>
  );
}
