import { AlertCircle, AlertTriangle } from "lucide-react";

interface AlertItemProps {
  type: "error" | "warning";
  message: string;
}

export default function AlertItem({ type, message }: AlertItemProps) {
  const Icon = type === "error" ? AlertCircle : AlertTriangle;
  const colorClass = type === "error" ? "text-destructive" : "text-warning";
  const bgClass = type === "error" ? "bg-destructive/10" : "bg-warning/10";

  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg ${bgClass}`}>
      <Icon className={`w-5 h-5 mt-0.5 ${colorClass}`} />
      <div className="flex-1">
        <span className={`text-sm font-medium ${colorClass} uppercase`}>[{type === "error" ? "ERRO" : "AVISO"}]</span>
        <p className="text-sm text-foreground mt-1">{message}</p>
      </div>
    </div>
  );
}
