import Footer from "@/components/shared/Footer"
import Header from "@/components/shared/Header"
import ChatBot from "./ChatBot";

declare global {
  interface Window {
    botpressWebChat: any;
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {



  // https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2024/12/01/11/20241201111753-CAYW0AER.json
  return (
    <div className="flex h-screen flex-col">
      <ChatBot  />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
