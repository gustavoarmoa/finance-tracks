import { z } from "zod";
import { AccountForm } from "@/features/accounts/components/account-form";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { useGetAccount } from "@/features/accounts/api/use-get-account";
import { insertAccountSchema } from "@/db/schema";
import { useEditAccount } from "@/features/accounts/api/use-edit-account"; 
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account"; 

import { useConfirm } from "@/hooks/use-confirm";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";

const formSchema = insertAccountSchema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditAccountSheet = () => {
    const {isOpen, onClose, id } = useOpenAccount();

    // Question confirmation to user
    const [ConfirmDialog, confirm] = useConfirm(
        "Estás seguro?",
        "Vas a eliminar esta cuent ?"
    )

    // Fetching account
    const accountQuery = useGetAccount(id);

    // Edit account
    const editMutation = useEditAccount(id);

    // Delete account
    const deleteMutation = useDeleteAccount(id);

    const isPending = editMutation.isPending || deleteMutation.isPending;

    const isLoading = accountQuery.isLoading;

    const onSubmit = (values: FormValues) => {
        // here we call de function to create the crud
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
    }

    const onDelete = async () => {
        const ok = await confirm();

        if(ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose();
                }
            })
        }
    }

    const defaultValues = accountQuery.data ? {
        name: accountQuery.data.name
    } : {
        name: "",
    };

    return (
        <>
            <ConfirmDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-4">
                    <SheetHeader>
                        <SheetTitle>
                            Editar cuenta
                        </SheetTitle>
                        <SheetDescription>
                            Editar una cuenta existente
                        </SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-4 text-muted-foreground animate-spin"/>
                        </div>
                    ): (
                        <AccountForm 
                            id={id}
                            onSubmit={onSubmit} 
                            disabled={isPending} 
                            defaultValues={defaultValues}
                            onDelete={onDelete}
                        />
                    )}
                </SheetContent>
            </Sheet>
        </>
    )
}