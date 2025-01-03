import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import EditModal from "@/components/modals/EditModal";
import RegisterModal from "@/components/modals/RegisterModal";
import LoginModal from "@/components/modals/LoginModal";
import Layout from "@/components/Layout";
import PostModal from "@/components/modals/PostModal";
import EditPostModal from "@/components/modals/EditPostModal";



export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <EditPostModal />
      <PostModal />
      <EditModal />
      <RegisterModal/>
      <LoginModal/>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </SessionProvider>
  )
}
