"use client";

import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";

import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

type Props = {
    id: string;
}

export const Actions = ({id}: Props) => {
    const { onOpen } = useOpenAccount();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} className="size-8 p-0">
                        <MoreHorizontal className="size-4 "/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem
                        disabled={false}
                        onClick={() => onOpen(id)}
                    >
                        <Edit className="size-4 mr-2"/>
                        Editar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}