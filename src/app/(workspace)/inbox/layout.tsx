import { SplitPane } from "@/components/layout/split-pane";

export default function InboxLayout({
  list,
  children,
}: {
  list: React.ReactNode;
  children: React.ReactNode;
}) {
  return <SplitPane list={list} detail={children} />;
}