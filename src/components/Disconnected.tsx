import { Terminal } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

export default function Disconnected() {
  return (
    <Alert>
      <Terminal className='h-4 w-4' />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>Disconnected</AlertDescription>
    </Alert>
  )
}
