import { DollarSign, Users, TrendingDown, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import StatsCard from "@/components/StatsCard";
import AlertItem from "@/components/AlertItem";

const mrrData = [
  { month: "Jan", value: 12500 },
  { month: "Fev", value: 13200 },
  { month: "Mar", value: 13800 },
  { month: "Abr", value: 14100 },
  { month: "Mai", value: 14750 },
  { month: "Jun", value: 15250 },
];

const clientsData = [
  { month: "Jan", value: 18 },
  { month: "Fev", value: 22 },
  { month: "Mar", value: 19 },
  { month: "Abr", value: 25 },
  { month: "Mai", value: 28 },
  { month: "Jun", value: 31 },
];

const recentClients = [
  { name: "Tech Solutions", plan: "Pro", date: "25/10/2025" },
  { name: "Boutique Fashion", plan: "Básico", date: "24/10/2025" },
  { name: "Food Express", plan: "Pro", date: "23/10/2025" },
  { name: "Digital Agency", plan: "Enterprise", date: "22/10/2025" },
  { name: "Home Decor", plan: "Pro", date: "21/10/2025" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Date Filter */}
      <div className="flex items-center gap-4">
        <Select defaultValue="30">
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="7">Últimos 7 dias</SelectItem>
            <SelectItem value="30">Últimos 30 dias</SelectItem>
            <SelectItem value="90">Últimos 90 dias</SelectItem>
            <SelectItem value="365">Último ano</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="MRR"
          value="R$ 15.250,00"
          change="▲ 3.5% vs. período anterior"
          changeType="positive"
          icon={DollarSign}
        />
        <StatsCard
          title="Clientes Ativos"
          value="128"
          change="▲ 5 novos no período"
          changeType="positive"
          icon={Users}
        />
        <StatsCard
          title="Churn Rate"
          value="4.2%"
          change="▼ 0.5% (melhora)"
          changeType="positive"
          icon={TrendingDown}
        />
        <StatsCard
          title="Total de Lojistas"
          value="2.450"
          change="▲ 150 novos no período"
          changeType="positive"
          icon={Store}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MRR Chart */}
        <Card className="p-6 shadow-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Crescimento da Receita (MRR)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mrrData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Clients Chart */}
        <Card className="p-6 shadow-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Novos Clientes por Mês</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={clientsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Tables and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Clients */}
        <Card className="p-6 shadow-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Últimas Inscrições</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentClients.map((client, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.plan}</TableCell>
                  <TableCell className="text-muted-foreground">{client.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Alerts */}
        <Card className="p-6 shadow-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Alertas e Notificações</h3>
          <div className="space-y-3">
            <AlertItem type="error" message="Falha na API de pagamento - 3 tentativas falharam" />
            <AlertItem type="warning" message="Servidor com 90% de uso de memória" />
            <AlertItem type="warning" message="5 clientes com pagamento pendente há mais de 7 dias" />
          </div>
        </Card>
      </div>
    </div>
  );
}
