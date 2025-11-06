// @ts-nocheck
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Wallet, 
  TrendingUp, 
  Target, 
  Award,
  BarChart3,
  Shield,
  Zap
} from 'lucide-react';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'var(--gradient-primary)' }}>
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Wallet className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Transforme sua vida financeira
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              FinanceGo é mais que um app de controle financeiro. É sua jornada gamificada 
              rumo à liberdade financeira com metas, conquistas e insights inteligentes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 text-lg px-8"
                onClick={() => navigate('/auth')}
              >
                Começar Agora
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-primary hover:bg-white/10 text-lg px-8"
              >
                Ver Demonstração
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Por que escolher o FinanceGo?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Desenvolvido com base em pesquisas sobre educação financeira e gamificação
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="text-center shadow-lg" style={{ boxShadow: 'var(--shadow-elegant)' }}>
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ background: 'var(--gradient-primary)' }}>
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Controle Total</h3>
              <p className="text-muted-foreground">
                Registre receitas e despesas com categorização inteligente. 
                Visualize gráficos e relatórios detalhados.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg" style={{ boxShadow: 'var(--shadow-elegant)' }}>
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ background: 'var(--gradient-success)' }}>
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Metas Personalizadas</h3>
              <p className="text-muted-foreground">
                Defina objetivos financeiros e acompanhe seu progresso em tempo real. 
                Conquiste suas metas passo a passo.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg" style={{ boxShadow: 'var(--shadow-elegant)' }}>
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ background: 'var(--gradient-primary)' }}>
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Gamificação</h3>
              <p className="text-muted-foreground">
                Ganhe pontos, suba de nível e desbloqueie conquistas. 
                Torne sua jornada financeira divertida e motivadora.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg" style={{ boxShadow: 'var(--shadow-elegant)' }}>
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ background: 'var(--gradient-success)' }}>
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Insights Inteligentes</h3>
              <p className="text-muted-foreground">
                Receba alertas e notificações personalizadas sobre seus hábitos financeiros.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg" style={{ boxShadow: 'var(--shadow-elegant)' }}>
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ background: 'var(--gradient-primary)' }}>
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Segurança Total</h3>
              <p className="text-muted-foreground">
                Seus dados financeiros protegidos com criptografia de ponta. 
                Privacidade é nossa prioridade.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg" style={{ boxShadow: 'var(--shadow-elegant)' }}>
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ background: 'var(--gradient-success)' }}>
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Perfis Adaptativos</h3>
              <p className="text-muted-foreground">
                Sistema adaptado ao seu perfil financeiro, moderado ou impulsivo.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'var(--gradient-primary)' }}>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para começar sua jornada financeira?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já transformaram suas finanças com o FinanceGo
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 text-lg px-8"
            onClick={() => navigate('/auth')}
          >
            Criar Conta Grátis
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 FinanceGo. Desenvolvido com base em pesquisa acadêmica sobre educação financeira.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;