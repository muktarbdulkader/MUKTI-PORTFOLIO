import { prisma } from "@/lib/db";
import { AdminPage, PageHeader } from "@/components/admin/page";
import { MessagesClient } from "@/components/admin/messages-client";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      inquiryType: true,
      subject: true,
      message: true,
      isRead: true,
      isArchived: true,
      adminReply: true,
      createdAt: true,
    },
  });

  const unread = messages.filter((m) => !m.isRead && !m.isArchived).length;

  return (
    <AdminPage>
      <PageHeader
        title="Messages"
        description={unread > 0 ? `${unread} unread message${unread === 1 ? "" : "s"}` : "Your contact inbox."}
      />
      <div className="mt-8">
        <MessagesClient messages={messages} />
      </div>
    </AdminPage>
  );
}
