"use client";

import { useMountedState } from "react-use";

import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet";

export const SheetProvider = () => {
    const isMounted = useMountedState();

    // To solve hydration problem
    if(!isMounted) return null;

    return (
        <>
            <NewAccountSheet />
        </>
    )
}