import { Book, MessageCircle, FileText, Video, HelpCircle, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const quickLinks = [
  {
    icon: Book,
    title: "Documentação",
    description: "Guias completos e referências de API",
    link: "#",
  },
  {
    icon: Video,
    title: "Tutoriais em Vídeo",
    description: "Aprenda assistindo nossos tutoriais",
    link: "#",
  },
  {
    icon: MessageCircle,
    title: "Chat com Suporte",
    description: "Fale com nossa equipe em tempo real",
    link: "#",
  },
  {
    icon: FileText,
    title: "Base de Conhecimento",
    description: "Artigos e soluções para problemas comuns",
    link: "#",
  },
];

const faqs = [
  {
    question: "Como adiciono um novo cliente?",
    answer: "Para adicionar um novo cliente, acesse a página de Clientes e clique no botão '+ Adicionar Cliente' no canto superior direito. Preencha os dados solicitados e clique em Salvar.",
  },
  {
    question: "Como funciona a cobrança dos planos?",
    answer: "A cobrança é feita mensalmente através do cartão de crédito cadastrado. Você receberá um email com a fatura 5 dias antes do vencimento. O pagamento é processado automaticamente na data de vencimento.",
  },
  {
    question: "Como personalizar o email enviado aos clientes?",
    answer: "Acesse Configurações > Email e edite os templates disponíveis. Você pode personalizar o conteúdo, cores e adicionar sua logo. As alterações são aplicadas imediatamente.",
  },
  {
    question: "Posso exportar os dados dos clientes?",
    answer: "Sim! Na página de Clientes, clique no botão 'Exportar CSV' para baixar uma planilha com todos os dados. Você pode filtrar os clientes antes de exportar para obter exatamente o que precisa.",
  },
  {
    question: "Como configurar notificações personalizadas?",
    answer: "Vá em Configurações > Notificações e ative/desative os tipos de alerta que deseja receber. Você pode escolher receber por email, push notification ou ambos.",
  },
  {
    question: "O que fazer se um pagamento falhar?",
    answer: "O sistema tentará cobrar automaticamente nos próximos 3 dias. Se persistir, o cliente será notificado por email. Você pode ver todos os pagamentos com problemas na aba Financeiro.",
  },
  {
    question: "Como funciona o período de trial?",
    answer: "O trial é de 14 dias sem necessidade de cartão de crédito. Após esse período, o cliente precisa escolher um plano para continuar usando o serviço. Todos os dados são mantidos.",
  },
  {
    question: "Posso integrar com outros sistemas?",
    answer: "Sim! Disponibilizamos uma API REST completa. Acesse Configurações > API para obter suas chaves de acesso e consulte nossa documentação técnica para detalhes de integração.",
  },
];

export default function Ajuda() {
  return (
    <div className="space-y-6 max-w-5xl">
      {/* Search */}
      <Card className="p-6 shadow-card text-center">
        <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Como podemos ajudar?</h2>
        <p className="text-muted-foreground mb-4">Busque por tutoriais, documentação ou entre em contato</p>
        <div className="max-w-xl mx-auto">
          <Input placeholder="Buscar por ajuda..." className="h-12" />
        </div>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={index} className="p-6 shadow-card hover:shadow-elevated transition-shadow cursor-pointer group">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Card>
          );
        })}
      </div>

      {/* FAQ */}
      <Card className="p-6 shadow-card">
        <h3 className="text-xl font-semibold text-foreground mb-4">Perguntas Frequentes</h3>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>

      {/* Contact Support */}
      <Card className="p-6 shadow-card bg-gradient-card">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <MessageCircle className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">Ainda precisa de ajuda?</h3>
            <p className="text-muted-foreground mb-4">
              Nossa equipe de suporte está disponível de segunda a sexta, das 9h às 18h.
            </p>
            <div className="flex gap-3">
              <Button className="bg-primary hover:bg-primary/90">
                <MessageCircle className="w-4 h-4 mr-2" />
                Iniciar Chat
              </Button>
              <Button variant="outline">
                Enviar Email
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Resources */}
      <Card className="p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recursos Úteis</h3>
        <div className="space-y-3">
          <a href="#" className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors">
            <div className="flex items-center gap-3">
              <Book className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Guia de Início Rápido</p>
                <p className="text-sm text-muted-foreground">Configure sua conta em 5 minutos</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </a>

          <a href="#" className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors">
            <div className="flex items-center gap-3">
              <Video className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Tour pela Plataforma</p>
                <p className="text-sm text-muted-foreground">Vídeo de 10 minutos mostrando os recursos</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </a>

          <a href="#" className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Documentação da API</p>
                <p className="text-sm text-muted-foreground">Referência completa para desenvolvedores</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </a>
        </div>
      </Card>
    </div>
  );
}
