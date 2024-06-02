import { z } from "zod";

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction"; 
import { useCreateTransaction } from "@/features/transactions/api/use-create-transaction";
import { insertTransactionSchema } from "@/db/schema";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

const formSchema = insertTransactionSchema.omit({
    id: true,
})

type FormValues = z.input<typeof formSchema>;

export const NewTransactionSheet = () => {
    const {isOpen, onClose } = useNewTransaction();

    const mutation = useCreateTransaction();

    const onSubmit = (values: FormValues) => {
        // here we call de function to create the crud
        mutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
    }
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        Nueva transaction
                    </SheetTitle>
                    <SheetDescription>
                        Cria una transaction cuenta para registrar tus transacciones
                    </SheetDescription>
                </SheetHeader>
                <p>TODO: Transaction Form</p>
            </SheetContent>
        </Sheet>
    )
}