"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
  {
    question: "How much does a tattoo cost?",
    answer: "Tattoo pricing varies greatly depending on size, detail, placement, and artist. Our shop minimum is $100. For larger pieces, artists may charge an hourly rate. We recommend booking a consultation for an accurate quote.",
  },
  {
    question: "Do I need an appointment?",
    answer: "Appointments are highly recommended to ensure artist availability and dedicated time for your piece. We do accept walk-ins if an artist has an opening, but availability is not guaranteed. It's best to call ahead or book online.",
  },
  {
    question: "How do I prepare for my tattoo session?",
    answer: "Get a good night's sleep, eat a healthy meal beforehand, and stay hydrated. Avoid alcohol and blood thinners for at least 24 hours prior. Wear comfortable clothing that allows easy access to the tattoo area. Bring a valid ID.",
  },
  {
    question: "What is the aftercare process?",
    answer: "Your artist will provide detailed aftercare instructions specific to your tattoo. Generally, this involves keeping the tattoo clean, applying a thin layer of recommended ointment, and avoiding sun exposure, soaking in water, and picking at scabs.",
  },
  {
    question: "Is it painful to get a tattoo?",
    answer: "Pain levels vary depending on individual tolerance, placement, and tattoo size/style. Some areas are more sensitive than others. Our artists are experienced in making the process as comfortable as possible. We can discuss pain management options during your consultation.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="bg-muted text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
            <p className="text-sm font-body uppercase tracking-wider text-primary mb-2">Got Questions?</p>
            <h2 className="text-4xl lg:text-5xl font-headline font-bold text-primary">Frequently Asked</h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4 font-body">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border/50 rounded-lg shadow-lg">
                <AccordionTrigger className="px-6 py-4 text-left text-lg font-semibold text-foreground hover:text-primary hover:no-underline transition-colors [&[data-state=open]>svg]:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0 text-base text-foreground/80 leading-relaxed">
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
