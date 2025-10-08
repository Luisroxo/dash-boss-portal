import { useState } from "react";
import { Search, Download, Eye, Edit, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface Cliente {
  id: string;
  name: string;
  email: string;
  status: "ativo" | "trial" | "cancelado";
  plan: string;
  mrr: string;
  lojistas: number;
  signupDate: string;
}

const clientes: Cliente[] = [
  {
    id: "1",
    name: "Loja do João",
    email: "joao@email.com",
    status: "ativo",
    plan: "Pro",
    mrr: "R$ 199",
    lojistas: 58,
    signupDate: "15/08/2024",
  },
  {
    id: "2",
    name: "Empresa ABC",
    email: "contato@abc.com",
    status: "trial",
    plan: "Pro",
    mrr: "R$ 0",
    lojistas: 5,
    signupDate: "01/10/2025",
  },
  {
    id: "3",
    name: "Negócio Fechado",
    email: "saiu@email.com",
    status: "cancelado",
    plan: "Básico",
    mrr: "R$ 0",
    lojistas: 12,
    signupDate: "03/04/2024",
  },
  {
    id: "4",
    name: "Tech Solutions",
    email: "tech@solutions.com",
    status: "ativo",
    plan: "Enterprise",
    mrr: "R$ 599",
    lojistas: 142,
    signupDate: "12/02/2024",
  },
  {
    id: "5",
    name: "Digital Store",
    email: "store@digital.com",
    status: "ativo",
    plan: "Pro",
    mrr: "R$ 199",
    lojistas: 34,
    signupDate: "28/05/2024",
  },
];

const statusConfig = {
  ativo: { label: "Ativo", color: "bg-success" },
  trial: { label: "Trial", color: "bg-warning" },
  cancelado: { label: "Cancelado", color: "bg-destructive" },
};

export default function Clientes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [planFilter, setPlanFilter] = useState("todos");
  const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set());

  const filteredClientes = clientes.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || client.status === statusFilter;
    const matchesPlan = planFilter === "todos" || client.plan === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const toggleClient = (id: string) => {
    const newSelected = new Set(selectedClients);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedClients(newSelected);
  };

  const toggleAll = () => {
    if (selectedClients.size === filteredClientes.length) {
      setSelectedClients(new Set());
    } else {
      setSelectedClients(new Set(filteredClientes.map((c) => c.id)));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Clientes</h2>
        <Button className="bg-primary hover:bg-primary/90">+ Adicionar Cliente</Button>
      </div>

      {/* Filters Bar */}
      <Card className="p-4 shadow-card">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, email ou domínio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="trial">Trial</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>

          {/* Plan Filter */}
          <Select value={planFilter} onValueChange={setPlanFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Plano" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="Básico">Básico</SelectItem>
              <SelectItem value="Pro">Pro</SelectItem>
              <SelectItem value="Enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>

          {/* Export Button */}
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
        </div>
      </Card>

      {/* Table */}
      <Card className="shadow-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedClients.size === filteredClientes.length && filteredClientes.length > 0}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead>MRR</TableHead>
              <TableHead>Lojistas</TableHead>
              <TableHead>Data de Inscrição</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClientes.map((client) => (
              <TableRow key={client.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedClients.has(client.id)}
                    onCheckedChange={() => toggleClient(client.id)}
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{client.name}</p>
                    <p className="text-sm text-muted-foreground">{client.email}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${statusConfig[client.status].color}`}></div>
                    <span className="text-sm font-medium">{statusConfig[client.status].label}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{client.plan}</Badge>
                </TableCell>
                <TableCell className="font-medium">{client.mrr}</TableCell>
                <TableCell>{client.lojistas}</TableCell>
                <TableCell className="text-muted-foreground">{client.signupDate}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <UserCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
