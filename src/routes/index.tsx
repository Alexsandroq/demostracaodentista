import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Star,
  Clock,
  Baby,
  Smile,
  HeartHandshake,
  MapPin,
  Phone,
  ToyBrick,
  Sparkles,
  ShieldCheck,
  Navigation,
  Rainbow,
} from "lucide-react";
import draBianca from "@/assets/dra-bianca.jpg";
import clinicaKids from "@/assets/clinica-kids.jpg";

const WHATSAPP_URL =
  "https://wa.me/5518996586696?text=" +
  encodeURIComponent(
    "Olá, Dra. Maria Bianca! Gostaria de agendar uma consulta para meu filho(a).",
  );
const ADDRESS = "Av. Nove de Julho, 772 - Centro, Assis - SP, 19800-020";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ADDRESS);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Odontopediatra em Assis-SP | Dra. Maria Bianca" },
      {
        name: "description",
        content:
          "Dra. Maria Bianca, odontopediatra em Assis-SP. Consultas sem medo, brinquedoteca, carinho e paciência — inclusive com pacientes atípicos. 5,0 no Google (36 avaliações).",
      },
      { property: "og:title", content: "Odontopediatra em Assis-SP | Dra. Maria Bianca" },
      {
        property: "og:description",
        content:
          "Atendimento infantil acolhedor, lúdico e sem trauma no Centro de Assis-SP. Agende pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dentist",
          name: "Dra. Maria Bianca – Odontopediatria",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Av. Nove de Julho, 772 - Centro",
            addressLocality: "Assis",
            addressRegion: "SP",
            postalCode: "19800-020",
            addressCountry: "BR",
          },
          telephone: "+55-18-99658-6696",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5.0",
            reviewCount: "36",
          },
          openingHours: "Mo-Fr 08:00-18:00",
        }),
      },
    ],
  }),
  component: LandingPage,
});

/* ---------- helpers ---------- */

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function WhatsCta({
  children,
  className = "",
  pulse = false,
  variant = "whatsapp",
}: {
  children: ReactNode;
  className?: string;
  pulse?: boolean;
  variant?: "whatsapp" | "coral" | "outline";
}) {
  const styles: Record<string, string> = {
    whatsapp: "bg-whatsapp text-whatsapp-foreground shadow-lg shadow-whatsapp/25",
    coral: "bg-coral text-coral-foreground shadow-lg shadow-coral/30",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
  };
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2.5 rounded-2xl px-7 py-4 font-display text-base font-700 transition-all hover:-translate-y-0.5 active:translate-y-0 ${styles[variant]} ${pulse ? "animate-pulse-ring" : ""} ${className}`}
    >
      {children}
      <WhatsAppIcon className="h-5 w-5 shrink-0 transition-transform group-hover:rotate-6" />
    </a>
  );
}

function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`flex gap-0.5 ${className}`} aria-label="5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-star text-star" />
      ))}
    </span>
  );
}

const NAV = [
  ["Atendimento", "#atendimento"],
  ["Serviços", "#servicos"],
  ["A Dra.", "#sobre"],
  ["Avaliações", "#avaliacoes"],
  ["Contato", "#localizacao"],
] as const;

/* ---------- página ---------- */

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ===== TOPO ===== */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
          <a href="#topo" className="flex min-w-0 items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-coral text-coral-foreground animate-wiggle">
              <Smile className="h-6 w-6" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-display text-lg font-700 text-primary">
                Dra. Maria Bianca
              </span>
              <span className="block text-[11px] font-600 uppercase tracking-[0.18em] text-muted-foreground">
                Odontopediatria
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm font-600 text-muted-foreground transition-colors hover:text-coral"
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-display text-sm font-700 text-primary-foreground transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Agendar <WhatsAppIcon className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section id="topo" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 -top-24 h-80 w-80 animate-blob bg-accent/60 blur-[2px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-40 h-72 w-72 animate-blob bg-secondary/70"
          style={{ animationDelay: "-4s" }}
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-sun px-4 py-2 text-xs font-700 uppercase tracking-wider text-sun-foreground">
              <Rainbow className="h-4 w-4" /> Consultório que acolhe todas as famílias
            </span>

            <h1 className="mt-5 font-display text-4xl font-800 leading-[1.1] text-primary sm:text-[3.4rem]">
              O primeiro dentista da sua criança pode ser{" "}
              <span className="relative inline-block text-coral">
                uma boa lembrança
                <svg
                  viewBox="0 0 300 14"
                  className="absolute -bottom-1 left-0 h-3 w-full text-sun"
                  aria-hidden="true"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9C60 3 120 3 180 7c40 2 80 3 118-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              A Dra. Maria Bianca cuida dos dentinhos com paciência, brincadeira e muito
              carinho — no Centro de Assis-SP. Atendimento especializado também para crianças
              autistas e pacientes atípicos.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsCta pulse>Agendar no WhatsApp</WhatsCta>
              <a
                href="#servicos"
                className="inline-flex items-center justify-center rounded-2xl border-2 border-primary/25 px-7 py-4 font-display text-base font-700 text-primary transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                Ver atendimentos
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="inline-flex items-center gap-2 rounded-2xl bg-card px-4 py-2.5 shadow-sm">
                <Stars />
                <span className="text-sm font-700">5,0 no Google</span>
                <span className="text-sm text-muted-foreground">• 36 avaliações</span>
              </span>
              <span className="inline-flex items-center gap-2 text-sm font-600 text-muted-foreground">
                <Clock className="h-4 w-4 text-coral" /> Seg a Sex • fecha às 18:00
              </span>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-4 animate-blob bg-coral/25"
            />
            <img
              src={draBianca}
              alt="Dra. Maria Bianca atendendo uma criança em seu consultório de odontopediatria em Assis-SP"
              width={896}
              height={1024}
              className="relative mx-auto w-full max-w-md rounded-[2.5rem] object-cover shadow-2xl"
            />
            <div className="animate-float-soft absolute -bottom-5 left-2 flex items-center gap-3 rounded-2xl bg-card px-4 py-3 shadow-xl sm:left-6">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                <ToyBrick className="h-5 w-5" />
              </span>
              <span className="text-sm leading-tight">
                <span className="block font-display font-700">Brinquedoteca</span>
                <span className="text-muted-foreground">enquanto você espera</span>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== FAIXA DE ATENDIMENTO ===== */}
      <section id="atendimento" className="bg-primary">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-12 sm:grid-cols-3">
          {[
            { icon: Baby, title: "Do bebê ao adolescente", text: "Da primeira dentinha à troca dos dentes permanentes." },
            { icon: HeartHandshake, title: "Pacientes atípicos", text: "Manejo cuidadoso para crianças autistas e com necessidades especiais." },
            { icon: ShieldCheck, title: "Sem trauma, sem susto", text: "Abordagem lúdica que transforma o medo em curiosidade." },
          ].map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 110}>
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-foreground/12 text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <h2 className="font-display text-lg font-700 text-primary-foreground">{title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-primary-foreground/75">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== SERVIÇOS ===== */}
      <section id="servicos" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <Reveal className="max-w-2xl">
          <p className="font-display text-sm font-700 uppercase tracking-[0.2em] text-coral">
            Atendimentos
          </p>
          <h2 className="mt-2 font-display text-3xl font-800 text-primary sm:text-4xl">
            Cuidado completo, no ritmo da criança
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Smile,
              title: "Primeira consulta",
              text: "Visita de adaptação, sem procedimentos: a criança conhece o consultório brincando.",
            },
            {
              icon: Sparkles,
              title: "Prevenção e limpeza",
              text: "Aplicação de flúor, selante e orientação de escovação para pais e filhos.",
            },
            {
              icon: ToyBrick,
              title: "Restaurações infantis",
              text: "Tratamento de cáries com técnicas rápidas, confortáveis e sem dor.",
            },
            {
              icon: Baby,
              title: "Odontologia para bebês",
              text: "Acompanhamento desde os primeiros dentinhos, amamentação e chupeta.",
            },
            {
              icon: HeartHandshake,
              title: "Pacientes atípicos",
              text: "Atendimento adaptado, com tempo e comunicação específicos para cada criança.",
            },
            {
              icon: ShieldCheck,
              title: "Urgências infantis",
              text: "Traumas, quedas e dor de dente avaliados com prioridade e acolhimento.",
            },
          ].map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 3) * 90}>
              <article className="card-lift h-full rounded-3xl border border-border bg-card p-7">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-xl font-700">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="flex flex-col items-center gap-5 overflow-hidden rounded-[2rem] bg-accent px-7 py-9 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h3 className="font-display text-2xl font-700 text-accent-foreground">
                Quer tirar uma dúvida antes de marcar?
              </h3>
              <p className="mt-1 text-sm font-600 text-accent-foreground/80">
                Fale direto com a equipe da Dra. Bianca pelo WhatsApp — resposta rápida.
              </p>
            </div>
            <WhatsCta variant="coral" className="shrink-0">
              Conversar agora
            </WhatsCta>
          </div>
        </Reveal>
      </section>

      {/* ===== SOBRE ===== */}
      <section id="sobre" className="bg-muted">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:py-24 lg:grid-cols-[1fr_1.05fr]">
          <Reveal>
            <img
              src={clinicaKids}
              alt="Recepção com espaço lúdico do consultório da Dra. Maria Bianca em Assis-SP"
              width={1600}
              height={1000}
              loading="lazy"
              className="w-full rounded-[2rem] object-cover shadow-xl"
            />
          </Reveal>
          <Reveal delay={100}>
            <p className="font-display text-sm font-700 uppercase tracking-[0.2em] text-coral">
              Quem cuida
            </p>
            <h2 className="mt-2 font-display text-3xl font-800 text-primary sm:text-4xl">
              Dra. Maria Bianca
            </h2>
            <p className="mt-1 font-600 text-muted-foreground">
              Cirurgiã-dentista • Odontopediatria
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Atender criança exige mais do que técnica: exige escuta, tempo e afeto. É assim
              que a Dra. Maria Bianca conduz cada consulta no Centro de Assis — explicando cada
              passo em linguagem de criança, respeitando o tempo de cada uma e transformando o
              consultório em um lugar seguro.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Seu consultório também é reconhecido pelo acolhimento a famílias LGBTQ+ e pelo
              cuidado com crianças autistas e pacientes atípicos — porque todo mundo merece
              uma consulta tranquila.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <WhatsCta>Falar com a Dra. Bianca</WhatsCta>
              <span className="inline-flex items-center gap-2 font-600">
                <Stars /> 5,0 • 36 avaliações
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== DEPOIMENTOS ===== */}
      <section id="avaliacoes" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <Reveal className="text-center">
          <div className="inline-flex items-center gap-4 rounded-3xl bg-card px-6 py-4 shadow-lg">
            <span className="font-display text-5xl font-800 text-coral">5,0</span>
            <span className="text-left leading-tight">
              <Stars />
              <span className="mt-1 block text-sm font-600 text-muted-foreground">
                36 avaliações no Google
              </span>
            </span>
          </div>
          <h2 className="mt-6 font-display text-3xl font-800 text-primary sm:text-4xl">
            O que as famílias de Assis dizem
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {[
            {
              name: "Priscila Camargo",
              meta: "Local Guide • 8 meses atrás",
              text: "Dra. Maria Bianca é muito atenciosa e dinâmica com as crianças, meus filhos gostaram muito dela, e ela cuidou muito bem dos dentes deles. Recomendo essa excelente profissional!",
            },
            {
              name: "Cristina Cardoso",
              meta: "10 avaliações • 1 ano atrás",
              text: "Filho autista com dente do siso para tirar. Precisava de um profissional que soubesse lidar com autista. Conheci esse anjo, chamado Bianca. Um ser iluminado que tem amor pelo que faz. Muito atenciosa e com muita paciência.",
            },
            {
              name: "Karine Campana",
              meta: "8 avaliações • 1 ano atrás",
              text: "Atendimento impecável. Dra. Maria Bianca é muito simpática, atenciosa, humana e competente. Clínica aconchegante, nos surpreendemos com a brinquedoteca que facilita quando os pais precisam levar os irmãos na consulta.",
            },
          ].map(({ name, meta, text }, i) => (
            <Reveal key={name} delay={i * 110}>
              <figure className="card-lift flex h-full flex-col rounded-3xl border border-border bg-card p-7">
                <Stars />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  “{text}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-secondary font-display text-base font-700 text-primary">
                    {name[0]}
                  </span>
                  <span className="leading-tight">
                    <span className="block font-display font-700">{name}</span>
                    <span className="block text-xs text-muted-foreground">{meta}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== LOCALIZAÇÃO ===== */}
      <section id="localizacao" className="bg-secondary/50">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
          <Reveal className="max-w-2xl">
            <p className="font-display text-sm font-700 uppercase tracking-[0.2em] text-coral">
              Onde estamos
            </p>
            <h2 className="mt-2 font-display text-3xl font-800 text-primary sm:text-4xl">
              No Centro de Assis, fácil de chegar
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col justify-center gap-5 rounded-3xl bg-card p-8 shadow-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
                  <div>
                    <p className="font-display font-700">Endereço</p>
                    <p className="text-sm text-muted-foreground">
                      Av. Nove de Julho, 772 - Centro
                      <br />
                      Assis - SP, 19800-020
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
                  <div>
                    <p className="font-display font-700">Telefone / WhatsApp</p>
                    <p className="text-sm text-muted-foreground">(18) 99658-6696</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
                  <div>
                    <p className="font-display font-700">Horário</p>
                    <p className="text-sm text-muted-foreground">
                      Segunda a sexta, das 08:00 às 18:00
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-primary px-5 py-3 font-display text-sm font-700 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <Navigation className="h-4 w-4" />
                    Como chegar
                  </a>
                  <WhatsCta className="px-5 py-3 text-sm">Chamar no WhatsApp</WhatsCta>
                </div>
              </div>
            </Reveal>

            <Reveal delay={110}>
              <div className="h-full overflow-hidden rounded-3xl border border-border shadow-sm">
                <iframe
                  title="Mapa — Dra. Maria Bianca, Av. Nove de Julho, 772, Assis-SP"
                  src="https://www.google.com/maps?q=Av.+Nove+de+Julho,+772+-+Centro,+Assis+-+SP,+19800-020&output=embed"
                  className="h-full min-h-[340px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-primary">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-800 text-primary-foreground sm:text-4xl">
              Vamos cuidar desse sorriso?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-primary-foreground/75">
              Agende a consulta do seu filho pelo WhatsApp. Atendimento leve, sem pressa e sem
              medo.
            </p>
            <div className="mt-7">
              <WhatsCta pulse>Agendar consulta</WhatsCta>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-8 border-t border-primary-foreground/15 pt-9 sm:grid-cols-3">
            <div>
              <p className="font-display text-lg font-700 text-primary-foreground">
                Dra. Maria Bianca
              </p>
              <p className="mt-1 text-sm text-primary-foreground/70">
                Odontopediatria
                <br />
                Assis - SP
              </p>
            </div>
            <div>
              <p className="font-display font-700 text-primary-foreground">Links rápidos</p>
              <ul className="mt-2 space-y-1.5">
                {NAV.map(([label, href]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-display font-700 text-primary-foreground">Contato</p>
              <p className="mt-2 text-sm text-primary-foreground/70">
                (18) 99658-6696
                <br />
                Av. Nove de Julho, 772 - Centro
                <br />
                Seg a Sex, 08:00 – 18:00
              </p>
            </div>
          </div>

          <p className="mt-10 text-center text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Dra. Maria Bianca – Odontopediatria. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>

      {/* ===== BOTÃO FLUTUANTE ===== */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="animate-pulse-ring fixed bottom-5 right-5 z-50 grid h-16 w-16 place-items-center rounded-3xl bg-whatsapp text-whatsapp-foreground shadow-xl transition-transform hover:scale-110 active:scale-95"
      >
        <WhatsAppIcon className="h-8 w-8" />
      </a>
    </div>
  );
}
