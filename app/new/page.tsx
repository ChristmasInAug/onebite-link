import AppShell from "@/components/AppShell";
import NewLinkForm from "@/components/NewLinkForm";
import { folders } from "@/lib/mock-data";

export default function NewLinkPage() {
  return (
    <AppShell>
      <NewLinkForm folders={folders} />
    </AppShell>
  );
}
