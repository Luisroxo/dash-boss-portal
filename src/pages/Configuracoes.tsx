import { Save, Key, Bell, Mail, Shield, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Configuracoes() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* General Settings */}
      <Card className="p-6 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Configurações Gerais</h3>
            <p className="text-sm text-muted-foreground">Configure as opções básicas da plataforma</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="company-name">Nome da Empresa</Label>
            <Input id="company-name" placeholder="SuperAdmin Inc." defaultValue="SuperAdmin Inc." />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="support-email">Email de Suporte</Label>
            <Input id="support-email" type="email" placeholder="suporte@superadmin.com" defaultValue="suporte@superadmin.com" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="timezone">Fuso Horário</Label>
            <Select defaultValue="america-sao-paulo">
              <SelectTrigger id="timezone">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="america-sao-paulo">América/São Paulo (GMT-3)</SelectItem>
                <SelectItem value="america-new-york">América/Nova York (GMT-5)</SelectItem>
                <SelectItem value="europe-london">Europa/Londres (GMT+0)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Notificações</h3>
            <p className="text-sm text-muted-foreground">Configure quando e como receber alertas</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="new-clients">Novos Clientes</Label>
              <p className="text-sm text-muted-foreground">Receber notificação quando um novo cliente se cadastrar</p>
            </div>
            <Switch id="new-clients" defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="payment-failures">Falhas de Pagamento</Label>
              <p className="text-sm text-muted-foreground">Alertar sobre problemas com cobranças</p>
            </div>
            <Switch id="payment-failures" defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="system-alerts">Alertas do Sistema</Label>
              <p className="text-sm text-muted-foreground">Notificações sobre problemas técnicos</p>
            </div>
            <Switch id="system-alerts" defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="weekly-reports">Relatórios Semanais</Label>
              <p className="text-sm text-muted-foreground">Receber resumo de métricas por email</p>
            </div>
            <Switch id="weekly-reports" />
          </div>
        </div>
      </Card>

      {/* API Configuration */}
      <Card className="p-6 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Key className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Configuração de API</h3>
            <p className="text-sm text-muted-foreground">Gerencie chaves de API e webhooks</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="api-key">Chave de API Principal</Label>
            <div className="flex gap-2">
              <Input id="api-key" type="password" value="sk_live_********************************" readOnly />
              <Button variant="outline">Regenerar</Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="webhook-url">URL do Webhook</Label>
            <Input id="webhook-url" placeholder="https://seu-dominio.com/webhook" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="webhook-secret">Secret do Webhook</Label>
            <Input id="webhook-secret" type="password" placeholder="whsec_****************************" />
          </div>
        </div>
      </Card>

      {/* Email Settings */}
      <Card className="p-6 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Configurações de Email</h3>
            <p className="text-sm text-muted-foreground">Configure templates e remetentes</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="from-name">Nome do Remetente</Label>
            <Input id="from-name" placeholder="SuperAdmin" defaultValue="SuperAdmin" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="from-email">Email do Remetente</Label>
            <Input id="from-email" type="email" placeholder="noreply@superadmin.com" defaultValue="noreply@superadmin.com" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email-footer">Rodapé dos Emails</Label>
            <Textarea
              id="email-footer"
              placeholder="Texto do rodapé..."
              defaultValue="© 2025 SuperAdmin. Todos os direitos reservados."
              rows={3}
            />
          </div>
        </div>
      </Card>

      {/* Database */}
      <Card className="p-6 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Database className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Backup e Manutenção</h3>
            <p className="text-sm text-muted-foreground">Configure backups automáticos</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-backup">Backup Automático</Label>
              <p className="text-sm text-muted-foreground">Criar backup diário às 3h da manhã</p>
            </div>
            <Switch id="auto-backup" defaultChecked />
          </div>

          <Separator />

          <div className="grid gap-2">
            <Label htmlFor="backup-retention">Retenção de Backups</Label>
            <Select defaultValue="30">
              <SelectTrigger id="backup-retention">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="7">7 dias</SelectItem>
                <SelectItem value="30">30 dias</SelectItem>
                <SelectItem value="90">90 dias</SelectItem>
                <SelectItem value="365">1 ano</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-2">
            <Button variant="outline">Criar Backup Manual</Button>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          <Save className="w-4 h-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
}
