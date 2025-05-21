
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqItems = [
  {
    id: "faq-1",
    question: "What is DayDigest?",
    answer: "DayDigest is an AI-powered platform designed to help you reflect on your daily activities, gain insights, and focus on what matters most for personal and professional growth. It offers features like AI daily summaries, personalized focus recommendations, and engaging reflection prompts.",
  },
  {
    id: "faq-2",
    question: "How does the AI daily summary feature work?",
    answer: "Our advanced AI analyzes the accomplishments and insights you provide for the day. It then generates a concise, easy-to-read summary, highlighting key achievements and takeaways, helping you quickly recap your progress.",
  },
  {
    id: "faq-3",
    question: "Are the focus recommendations truly personalized?",
    answer: "Yes! The AI takes into account your past accomplishments, reflections, and stated goals (if provided) to generate focus recommendations tailored to your specific needs and priorities for the upcoming day.",
  },
  {
    id: "faq-4",
    question: "Can I use DayDigest for free?",
    answer: "Absolutely! DayDigest offers a Free plan with core features like AI daily summaries (limited) and basic reflection prompts. For more advanced features and unlimited access, you can upgrade to our Pro plan.",
  },
  {
    id: "faq-5",
    question: "Is my data secure with DayDigest?",
    answer: "We take data security and privacy very seriously. All your data is encrypted and stored securely. We are committed to protecting your personal information and ensuring it's used only to provide and improve the DayDigest service.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-transparent scroll-mt-20 animate-in fade-in slide-in-from-bottom-12 duration-700 ease-out">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? We&apos;ve got answers. If you don&apos;t find what you&apos;re looking for, feel free to reach out to our support team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item) => (
              <AccordionItem 
                key={item.id} 
                value={item.id} 
                className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg px-6 transition-all duration-300 ease-out hover:border-primary/50"
              >
                <AccordionTrigger className="text-lg font-medium text-foreground text-left hover:no-underline [&[data-state=open]>svg]:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pt-2 pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
