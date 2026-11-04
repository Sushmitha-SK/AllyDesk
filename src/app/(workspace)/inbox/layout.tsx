import { SplitPane } from "@/components/layout/split-pane";

export default function InboxLayout({
  list,
  children,
}: {
  list: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <h1 className="sr-only">Inbox</h1>
      <SplitPane list={list} detail={children} />
    </>
  );
}