import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DialogProps {
  variant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  buttonText: string;
  dialogTitle: string;
  formDialog: () => React.ReactNode;
}

export function DialogComponent({
  variant,
  buttonText,
  dialogTitle,
  formDialog,
}: DialogProps) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant={variant}>{buttonText}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
          {formDialog()}
          
        </DialogContent>
      </form>
    </Dialog>
  );
}
