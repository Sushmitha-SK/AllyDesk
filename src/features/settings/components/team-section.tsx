import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/format";
import type { TeamMember } from "../queries";
import { RoleSelect } from "./role-select";

export function TeamSection({ team, currentAgentId }: { team: TeamMember[]; currentAgentId: string }) {
    return (
        <ul className="divide-y rounded-lg border">
            {team.map((member) => (
                <li key={member.id} className="flex items-center gap-3 p-3">
                    <Avatar className="size-8 shrink-0">
                        {member.avatarUrl && <AvatarImage src={member.avatarUrl} alt="" />}
                        <AvatarFallback className="text-xs">{getInitials(member.name)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                            {member.name}
                            {member.id === currentAgentId && (
                                <span className="ml-1.5 text-xs font-normal text-muted-foreground">(you)</span>
                            )}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">{member.email}</p>
                    </div>
                    <RoleSelect
                        agentId={member.id}
                        name={member.name}
                        role={member.role}
                        disabled={member.id === currentAgentId}
                    />
                </li>
            ))}
        </ul>
    );
}