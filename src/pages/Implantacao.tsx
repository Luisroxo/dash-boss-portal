import { Copy, Check, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Implantacao() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const widgetCode = `<script src="https://cdn.seudominio.com/widget.js"></script>
<div id="vitrine-widget" data-client-id="seu-id-cliente"></div>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(widgetCode);
    setCopied(true);
    toast({
      title: "Código copiado!",
      description: "O código do widget foi copiado para a área de transferência.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Implantação e Integração</h1>
        <p className="text-muted-foreground mt-2">
          Configure domínios personalizados e gere widgets para integração da vitrine white label.
        </p>
      </div>

      <Tabs defaultValue="domain" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="domain">Domínio</TabsTrigger>
          <TabsTrigger value="widget">Widget</TabsTrigger>
          <TabsTrigger value="docs">Documentação</TabsTrigger>
        </TabsList>

        <TabsContent value="domain" className="space-y-6">
          <Card className="p-6 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Configuração de Domínio Personalizado</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="domain">Domínio Personalizado</Label>
                <Input
                  id="domain"
                  placeholder="loja.seudominio.com"
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Digite o domínio ou subdomínio que deseja usar para sua vitrine.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <h4 className="font-semibold text-sm text-foreground">Configuração DNS Necessária:</h4>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-3 gap-2 font-medium text-muted-foreground">
                    <span>Tipo</span>
                    <span>Nome</span>
                    <span>Valor</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                    <span>CNAME</span>
                    <span>loja</span>
                    <span>cdn.seuservico.com</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                    <span>TXT</span>
                    <span>_verification</span>
                    <span>verify-12345678</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button>Verificar Domínio</Button>
                <Button variant="outline">Salvar Configuração</Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Domínios Configurados</h3>
            <div className="space-y-3">
              {[
                { domain: "loja.techsolutions.com", status: "Ativo", ssl: "Válido" },
                { domain: "shop.fashionstore.com", status: "Ativo", ssl: "Válido" },
                { domain: "store.homedecore.com", status: "Pendente", ssl: "Aguardando" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{item.domain}</p>
                    <p className="text-xs text-muted-foreground mt-1">SSL: {item.ssl}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "Ativo" 
                        ? "bg-success/10 text-success" 
                        : "bg-warning/10 text-warning"
                    }`}>
                      {item.status}
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="widget" className="space-y-6">
          <Card className="p-6 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Gerador de Widget</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="client-id">ID do Cliente</Label>
                <Input
                  id="client-id"
                  placeholder="12345678-abcd-efgh"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="widget-theme">Tema do Widget</Label>
                <select
                  id="widget-theme"
                  className="w-full mt-2 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="light">Claro</option>
                  <option value="dark">Escuro</option>
                  <option value="auto">Automático</option>
                </select>
              </div>

              <div>
                <Label htmlFor="widget-layout">Layout</Label>
                <select
                  id="widget-layout"
                  className="w-full mt-2 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="grid">Grade</option>
                  <option value="list">Lista</option>
                  <option value="carousel">Carrossel</option>
                </select>
              </div>

              <Button>Gerar Widget</Button>
            </div>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Código do Widget</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar
                  </>
                )}
              </Button>
            </div>
            <div className="bg-muted/80 p-4 rounded-lg">
              <pre className="text-xs font-mono text-foreground whitespace-pre-wrap">
                {widgetCode}
              </pre>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Copie este código e cole-o no HTML da página onde deseja exibir a vitrine virtual.
            </p>
          </Card>

          <Card className="p-6 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Configurações Avançadas</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Carregar produtos automaticamente</p>
                  <p className="text-xs text-muted-foreground">Carrega os produtos assim que o widget é inicializado</p>
                </div>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Ativar modo responsivo</p>
                  <p className="text-xs text-muted-foreground">Adapta o layout automaticamente para dispositivos móveis</p>
                </div>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Habilitar analytics</p>
                  <p className="text-xs text-muted-foreground">Rastreia visualizações e interações com os produtos</p>
                </div>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="docs" className="space-y-6">
          <Card className="p-6 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Guia de Instalação</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold text-foreground mb-2">1. Configurar o Domínio</h4>
                <p>
                  Acesse o painel DNS do seu provedor de domínio e adicione os registros CNAME e TXT conforme
                  mostrado na aba "Domínio". Aguarde a propagação DNS (pode levar até 48 horas).
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">2. Gerar o Widget</h4>
                <p>
                  Use o gerador na aba "Widget" para criar o código personalizado. Configure as opções de acordo
                  com o design do seu site e copie o código gerado.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">3. Inserir no Site</h4>
                <p>
                  Cole o código do widget no HTML da sua página, preferencialmente antes do fechamento da tag
                  &lt;/body&gt;. O widget será carregado automaticamente.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">4. Testar a Integração</h4>
                <p>
                  Acesse seu site e verifique se a vitrine está sendo exibida corretamente. Teste a navegação,
                  busca e visualização de produtos.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Perguntas Frequentes</h3>
            <div className="space-y-4">
              {[
                {
                  q: "Quanto tempo leva para o domínio ser ativado?",
                  a: "A ativação do domínio depende da propagação DNS, que pode levar de 15 minutos a 48 horas.",
                },
                {
                  q: "Posso usar múltiplos domínios para o mesmo cliente?",
                  a: "Sim, você pode configurar quantos domínios precisar. Cada um deve ser verificado individualmente.",
                },
                {
                  q: "O widget funciona em todas as plataformas?",
                  a: "Sim, o widget é compatível com qualquer site HTML, incluindo WordPress, Shopify, Wix e outros.",
                },
                {
                  q: "Como personalizar o design do widget?",
                  a: "Use as configurações avançadas na aba Widget ou adicione CSS personalizado no seu site.",
                },
              ].map((faq, index) => (
                <div key={index} className="border-b border-border pb-4 last:border-0">
                  <h4 className="font-semibold text-foreground mb-2">{faq.q}</h4>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 shadow-card bg-primary/5 border-primary/20">
            <h3 className="text-lg font-semibold text-foreground mb-2">Precisa de Ajuda?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Nossa equipe de suporte está pronta para auxiliar com a configuração e integração.
            </p>
            <div className="flex gap-3">
              <Button variant="default">Abrir Ticket de Suporte</Button>
              <Button variant="outline">Documentação Completa</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
