import Navbar from '@/components/shared/Navbar';
import FloatingChatButtons from '@/components/shared/FloatingChatButtons';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <FloatingChatButtons />
    </div>
  );
}
