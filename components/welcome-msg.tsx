"use client";

import { useUser } from "@clerk/nextjs";

export const WelcomeMsg = () => {

    const { user, isLoaded } = useUser();

    return (
        <div className="space-y-2 mb-4">
            <h1 className="text-2xl lg:text-4xl text-white font-medium">
                Bienvenido de vuelta!{isLoaded ? ", " : " "}{user?.firstName} 
            </h1>
            <p className="text-sm text-[#89B6FD] lg:text-base">Este es su resumo financeiro</p>
        </div>
    )
}