import { DollarSign, TrendingUp, FileText, CreditCard } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import StatsCard from "@/components/StatsCard";

const revenueData = [
  { month: "Jan", receita: 45000, despesas: 12000 },
  { month: "Fev", receita: 48000, despesas: 13000 },
  { month: "Mar", receita: 52000, despesas: 12500 },
  { month: "Abr", receita: 51000, despesas: 14000 },
  { month: "Mai", receita: 55000, despesas: 13500 },
  { month: "Jun", receita: 58000, despesas: 14500 },
];

const transactions = [
  { id: "INV-001", client: "Tech Solutions", amount: "R$ 599,00", status: "pago", date: "25/10/2025" },
  { id: "INV-002", client: "Loja do João", amount: "R$ 199,00", status: "pago", date: "24/10/2025" },
  { id: "INV-003", client: "Digital Store", amount: "R$ 199,00", status: "pendente", date: "23/10/2025" },
  { id: "INV-004", client: "Empresa ABC", amount: "R$ 0,00", status: "trial", date: "22/10/2025" },
  { id: "INV-005", client: "Home Decor", amount: "R$ 299,00", status: "pago", date: "21/10/2025" },
  { id: "INV-006", client: "Fashion Store", amount: "R$ 199,00", status: "atrasado", date: "15/10/2025" },
];

const statusConfig = {
  pago: { label: "Pago", variant: "default" as const, color: "bg-success" },
  pendente: { label: "Pendente", variant: "secondary" as const, color: "bg-warning" },
  atrasado: { label: "Atrasado", variant: "destructive" as const, color: "bg-destructive" },
  trial: { label: "Trial", variant: "outline" as const, color: "bg-muted" },
};

export default function Financeiro() {
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
          title="Receita Total"
          value="R$ 58.000,00"
          change="▲ 5.4% vs. mês anterior"
          changeType="positive"
          icon={DollarSign}
        />
        <StatsCard
          title="Despesas"
          value="R$ 14.500,00"
          change="▲ 7.4% vs. mês anterior"
          changeType="negative"
          icon={TrendingUp}
        />
        <StatsCard
          title="Lucro Líquido"
          value="R$ 43.500,00"
          change="▲ 4.8% vs. mês anterior"
          changeType="positive"
          icon={FileText}
        />
        <StatsCard
          title="Faturas Pendentes"
          value="8"
          change="▼ 2 vs. mês anterior"
          changeType="positive"
          icon={CreditCard}
        />
      </div>

      {/* Revenue Chart */}
      <Card className="p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Receitas vs Despesas</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
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
            <Line type="monotone" dataKey="receita" stroke="hsl(var(--success))" strokeWidth={2} name="Receita" />
            <Line type="monotone" dataKey="despesas" stroke="hsl(var(--destructive))" strokeWidth={2} name="Despesas" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Transactions Table */}
      <Card className="shadow-card">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Transações Recentes</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Fatura</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                <TableCell className="font-medium">{transaction.client}</TableCell>
                <TableCell className="font-semibold">{transaction.amount}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${statusConfig[transaction.status as keyof typeof statusConfig].color}`}></div>
                    <span className="text-sm font-medium">
                      {statusConfig[transaction.status as keyof typeof statusConfig].label}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{transaction.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
