import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const statuses = [
    { label: "Open", cls: "bg-status-open/15 text-status-open" },
    { label: "Pending", cls: "bg-status-pending/15 text-status-pending" },
    { label: "Resolved", cls: "bg-status-resolved/15 text-status-resolved" },
    { label: "Closed", cls: "bg-status-closed/15 text-status-closed" },
];

const priorities = [
    { label: "Low", cls: "bg-priority-low/15 text-priority-low" },
    { label: "Medium", cls: "bg-priority-medium/15 text-priority-medium" },
    { label: "High", cls: "bg-priority-high/15 text-priority-high" },
    { label: "Urgent", cls: "bg-priority-urgent/15 text-priority-urgent" },
];

export default function Home() {
    return (
        <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 p-6">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight">AllyDesk</h1>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Button variant="outline" asChild>
                        <Link href="/sign-in">Sign in</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/inbox">Open inbox</Link>
                    </Button>
                </div>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Design system check</CardTitle>
                    <CardDescription>Toggle the theme and confirm everything adapts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        <Button>Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="destructive">Destructive</Button>
                    </div>
                    <Input placeholder="Search tickets…" />
                    <div className="flex flex-wrap gap-2">
                        {statuses.map((s) => (
                            <Badge key={s.label} className={`border-transparent ${s.cls}`}>
                                {s.label}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {priorities.map((p) => (
                            <Badge key={p.label} className={`border-transparent ${p.cls}`}>
                                {p.label}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}