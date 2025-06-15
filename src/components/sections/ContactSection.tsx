"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MapPin, Phone, Mail, Clock, CalendarIcon } from 'lucide-react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from 'react';
import { submitBooking, getBlockedDates } from '@/lib/actions';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  bookingDate: z.date({ required_error: "Please select a date for your booking." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const [blockedDateStrings, setBlockedDateStrings] = useState<string[]>([]);
  const [isLoadingBlockedDates, setIsLoadingBlockedDates] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      bookingDate: undefined,
    },
  });

  useEffect(() => {
    async function fetchBlockedDates() {
      setIsLoadingBlockedDates(true);
      try {
        const dates = await getBlockedDates();
        setBlockedDateStrings(dates);
      } catch (error) {
        console.error("Failed to fetch blocked dates:", error);
        toast({
          title: "Error",
          description: "Could not load unavailable dates. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingBlockedDates(false);
      }
    }
    fetchBlockedDates();
  }, [toast]);

  const disabledDatesMatcher = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to start of day
    if (date < today) return true; // Disable past dates
    
    const dateString = date.toISOString().split('T')[0];
    return blockedDateStrings.includes(dateString);
  };


  async function onSubmit(data: ContactFormValues) {
    const result = await submitBooking(data);
    if (result.success) {
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. We'll get back to you soon regarding your booking.",
        variant: "default",
      });
      form.reset();
    } else {
      toast({
        title: "Submission Failed",
        description: result.message || "Could not send your message. Please try again.",
        variant: "destructive",
      });
    }
  }

  if (!mounted) return null;

  return (
    <section id="contact" className="bg-muted text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-sm font-body uppercase tracking-wider text-primary mb-2">Connect With Us</p>
          <h2 className="text-4xl lg:text-5xl font-headline font-bold text-primary">Book Your Session</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          <div className="lg:col-span-2">
            <Card className="shadow-xl bg-card border-border/50 rounded-lg">
              <CardHeader>
                <CardTitle className="text-3xl font-headline text-primary">Send Us A Message</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 font-body">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/80">Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Name" {...field} className="bg-background border-border/70 focus:border-primary focus:ring-primary text-base" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/80">Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@example.com" {...field} className="bg-background border-border/70 focus:border-primary focus:ring-primary text-base"/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                     <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/80">Phone (Optional)</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="Your Phone Number" {...field} className="bg-background border-border/70 focus:border-primary focus:ring-primary text-base"/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground/80">Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Tattoo Inquiry, Consultation, etc." {...field} className="bg-background border-border/70 focus:border-primary focus:ring-primary text-base"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bookingDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-foreground/80">Preferred Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal bg-background border-border/70 hover:bg-muted",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={isLoadingBlockedDates ? () => true : disabledDatesMatcher}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground/80">Your Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Describe your tattoo idea, placement, preferred artist, etc." rows={5} {...field} className="bg-background border-border/70 focus:border-primary focus:ring-primary text-base"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 uppercase tracking-wider font-semibold rounded-none py-3" disabled={form.formState.isSubmitting || isLoadingBlockedDates}>
                      {form.formState.isSubmitting ? 'Sending...' : (isLoadingBlockedDates ? 'Loading Dates...' : 'Send Message & Request Date')}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8 font-body">
            <Card className="shadow-xl bg-card border-border/50 rounded-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-headline text-primary">Contact Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 text-sm">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-0.5">Visit Us</h4>
                    <p className="text-foreground/80">12 Agiou Spyridonos, Corfu Town, 49100, Greece</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-0.5">Call Us</h4>
                    <p className="text-foreground/80 hover:text-accent transition-colors"><a href="tel:+12345678900">(123) 456-78900</a></p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-0.5">Email Us</h4>
                    <p className="text-foreground/80 hover:text-accent transition-colors"><a href="mailto:email@myemail.com">email@myemail.com</a></p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-xl bg-card border-border/50 rounded-lg">
               <CardHeader>
                <CardTitle className="text-2xl font-headline text-primary">Studio Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-foreground/80">
                <div className="flex items-center"><Clock size={16} className="mr-2 text-primary"/> <p><strong>Mon - Fri:</strong> 10:00 AM - 08:00 PM</p></div>
                <div className="flex items-center"><Clock size={16} className="mr-2 text-primary"/> <p><strong>Saturday:</strong> 11:00 AM - 07:00 PM</p></div>
                <div className="flex items-center"><Clock size={16} className="mr-2 text-primary"/> <p><strong>Sunday:</strong> Closed</p></div>
                <p className="mt-3 text-xs"><em>Appointments highly recommended. Walk-ins subject to availability.</em></p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
