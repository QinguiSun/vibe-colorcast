import { PodcastDemo } from "@/components/PodcastDemo";
import { Headphones, Sparkles, Zap, Palette } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "实时色彩映射",
    description: "AI分析音频情绪，转化为流动的色彩心电图",
  },
  {
    icon: Headphones,
    title: "一键跳转播放",
    description: "点击色彩块直达精彩片段，告别从头找起",
  },
  {
    icon: Palette,
    title: "一键生成海报",
    description: "自动生成情绪色彩海报，助力内容传播",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-emotion-quote/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-emotion-knowledge/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emotion-story/20 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI Hackathon 2024</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              播客
              <span className="bg-gradient-to-r from-emotion-quote via-emotion-insight to-emotion-knowledge bg-clip-text text-transparent">
                色彩笔记
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              用AI分析播客的情绪波动和核心价值点，
              <br className="hidden sm:block" />
              把它们转化成流动的色彩，让听播客更有趣、更高效
            </p>

            {/* Color Legend Preview */}
            <div className="flex justify-center gap-3 mb-12 flex-wrap">
              {[
                { color: "bg-emotion-excitement", label: "兴奋" },
                { color: "bg-emotion-insight", label: "干货" },
                { color: "bg-emotion-serious", label: "深度" },
                { color: "bg-emotion-story", label: "故事" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border shadow-sm"
                >
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Demo Section */}
      <section className="container mx-auto px-4 py-12 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">体验色彩笔记</h2>
            <p className="text-muted-foreground">
              粘贴播客链接，一键生成情绪可视化
            </p>
          </div>

          <PodcastDemo />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            色彩即内容
          </h2>

          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { color: "bg-emotion-quote", label: "红色", desc: "金句必听" },
              { color: "bg-emotion-knowledge", label: "蓝色", desc: "知识干货" },
              { color: "bg-emotion-story", label: "绿色", desc: "案例趣味" },
              { color: "bg-emotion-casual", label: "灰色", desc: "闲聊可跳" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div
                  className={`w-20 h-20 rounded-2xl ${item.color} mx-auto mb-4 shadow-lg`}
                />
                <h4 className="font-semibold mb-1">{item.label}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-muted-foreground mt-8 max-w-lg mx-auto">
            不用看文字，一眼就能找到自己想听的内容
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            <span className="font-semibold text-primary">PodColor</span> · 用Vibe Coding优化Podcast
          </p>
          <p className="mt-2">AI Hackathon 2024</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
