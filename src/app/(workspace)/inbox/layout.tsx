import { cookies } from "next/headers";

import { SplitPane } from "@/components/layout/split-pane";
import { LIST_WIDTH_COOKIE, parseListWidth } from "@/components/layout/split-pane-config";

export default async function InboxLayout({
  list,
  children,
}: {
  list: React.ReactNode;
  children: React.ReactNode;
}) {
  const store = await cookies();
  const initialListWidth = parseListWidth(store.get(LIST_WIDTH_COOKIE)?.value);

  return (
    <>
      <h1 className="sr-only">Inbox</h1>
      <SplitPane list={list} detail={children} initialListWidth={initialListWidth} />
    </>
  );
}