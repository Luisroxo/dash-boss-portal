import { Activity, Server, Database, Globe, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import StatsCard from "@/components/StatsCard";
import AlertItem from "@/components/AlertItem";

const uptimeData = [
  { time: "00:00", uptime: 99.9 },
  { time: "04:00", uptime: 100 },
  { time: "08:00", uptime: 99.8 },
  { time: "12:00", uptime: 100 },
  { time: "16:00", uptime: 99.9 },
  { time: "20:00", uptime: 100 },
  { time: "23:59", uptime: 100 },
];

const services = [
  { name: "API Principal", status: "online", uptime: "99.98%", responseTime: "125ms" },
  { name: "Base de Dados", status: "online", uptime: "99.99%", responseTime: "45ms" },
  { name: "Servidor Web", status: "warning", uptime: "99.85%", responseTime: "230ms" },
  { name: "CDN", status: "online", uptime: "100%", responseTime: "18ms" },
  { name: "Fila de Jobs", status: "online", uptime: "99.92%", responseTime: "89ms" },
];

const logs = [
  { time: "14:32:45", level: "error", message: "Falha na conexão com API de pagamento", service: "Payment API" },
  { time: "14:28:12", level: "warning", message: "Uso de memória acima de 85%", service: "App Server" },
  { time: "14:15:03", level: "info", message: "Deploy completado com sucesso", service: "CI/CD" },
  { time: "14:05:22", level: "warning", message: "Lentidão detectada em queries", service: "Database" },
  { time: "13:58:41", level: "info", message: "Backup automático realizado", service: "Backup Service" },
];

const statusConfig = {
  online: { color: "bg-success", label: "Online" },
  warning: { color: "bg-warning", label: "Atenção" },
  offline: { color: "bg-destructive", label: "Offline" },
};

const logLevelConfig = {
  error: { color: "text-destructive", bg: "bg-destructive/10" },
  warning: { color: "text-warning", bg: "bg-warning/10" },
  info: { color: "text-primary", bg: "bg-primary/10" },
};

export default function Monitoramento() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Uptime (30d)"
          value="99.97%"
          change="▲ 0.02% vs. período anterior"
          changeType="positive"
          icon={Activity}
        />
        <StatsCard
          title="Tempo de Resposta"
          value="127ms"
          change="▼ 15ms vs. período anterior"
          changeType="positive"
          icon={Clock}
        />
        <StatsCard
          title="Requisições/min"
          value="1.2K"
          change="▲ 180 vs. período anterior"
          changeType="neutral"
          icon={Globe}
        />
        <StatsCard
          title="Servidores Ativos"
          value="12/12"
          change="100% disponibilidade"
          changeType="positive"
          icon={Server}
        />
      </div>

      {/* Uptime Chart */}
      <Card className="p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Uptime nas Últimas 24h</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={uptimeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
            <YAxis domain={[99.5, 100]} stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Line type="monotone" dataKey="uptime" stroke="hsl(var(--success))" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Services Status */}
      <Card className="shadow-card">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Status dos Serviços</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Serviço</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Uptime (30d)</TableHead>
              <TableHead>Tempo de Resposta</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.name}>
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${statusConfig[service.status as keyof typeof statusConfig].color}`}></div>
                    <span className="text-sm font-medium">
                      {statusConfig[service.status as keyof typeof statusConfig].label}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Progress value={parseFloat(service.uptime)} className="w-20" />
                    <span className="text-sm font-medium">{service.uptime}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{service.responseTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* System Logs */}
      <Card className="p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Logs do Sistema</h3>
        <div className="space-y-2">
          {logs.map((log, index) => (
            <div key={index} className={`flex items-start gap-3 p-3 rounded-lg ${logLevelConfig[log.level as keyof typeof logLevelConfig].bg}`}>
              <span className="text-xs font-mono text-muted-foreground mt-0.5">{log.time}</span>
              <Badge variant="outline" className={`${logLevelConfig[log.level as keyof typeof logLevelConfig].color} uppercase text-xs`}>
                {log.level}
              </Badge>
              <div className="flex-1">
                <p className="text-sm text-foreground">{log.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{log.service}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* System Alerts */}
      <Card className="p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Alertas Ativos</h3>
        <div className="space-y-3">
          <AlertItem type="warning" message="Servidor com 90% de uso de memória - considere escalar recursos" />
          <AlertItem type="error" message="Falha na API de pagamento - 3 tentativas falharam nas últimas 2 horas" />
        </div>
      </Card>
    </div>
  );
}
