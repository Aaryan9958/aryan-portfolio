import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Linkedin, Github, Mail as MailIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import PageTransition from '../components/PageTransition';
import Footer from '../components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (submitStatus) setSubmitStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://formspree.io/f/mykgpqkv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        toast({
          title: "Message sent successfully!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        setFormData({
          name: '',
          email: '',
          company: '',
          message: '',
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
      toast({
        title: "Error sending message",
        description: "Please try again or reach out via email directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen text-white relative overflow-x-hidden">
        {/* Metallic background - clean, no backdrop */}
        <div 
          className="fixed inset-0 z-0"
          style={{
            background: 'linear-gradient(180deg, #0A1016 0%, #1C2731 50%, #0A1016 100%)',
          }}
        />
        
        {/* Subtle ambient glow */}
        <div 
          className="fixed inset-0 z-0"
          style={{
            background: 'radial-gradient(circle at 30% 50%, rgba(144, 170, 186, 0.03) 0%, transparent 50%)',
          }}
        />

        <div className="relative z-10 pt-32 pb-12 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-12 lg:mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#B7CBD7] mb-4">Let&apos;s Connect</h1>
              <p className="text-lg md:text-xl text-[#758DA1]">
                Have a project in mind or just want to chat about data? Drop me a message.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="glass-card rounded-xl p-6 lg:p-8"
              >
                <h2 className="text-2xl lg:text-3xl font-bold text-[#B7CBD7] mb-6">Send a Message</h2>
                
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-lg bg-[#303F4C]/50 border border-[#5D7386]/50 flex items-center gap-3"
                  >
                    <CheckCircle className="text-[#90AABA]" size={20} />
                    <span className="text-[#90AABA] text-sm">Message sent successfully! I&apos;ll get back to you soon.</span>
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-lg bg-[#303F4C]/50 border border-red-500/30 flex items-center gap-3"
                  >
                    <AlertCircle className="text-red-400" size={20} />
                    <span className="text-red-300 text-sm">Failed to send. Please try again or email directly.</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#90AABA] mb-2">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-[#0A1016] border-[#303F4C] text-[#B7CBD7] placeholder:text-[#465969] focus:border-[#5D7386] focus:ring-[#5D7386]/20"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#90AABA] mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-[#0A1016] border-[#303F4C] text-[#B7CBD7] placeholder:text-[#465969] focus:border-[#5D7386] focus:ring-[#5D7386]/20"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-[#90AABA] mb-2">
                      Company (Optional)
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-[#0A1016] border-[#303F4C] text-[#B7CBD7] placeholder:text-[#465969] focus:border-[#5D7386] focus:ring-[#5D7386]/20"
                      placeholder="Your company"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#90AABA] mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="bg-[#0A1016] border-[#303F4C] text-[#B7CBD7] placeholder:text-[#465969] focus:border-[#5D7386] focus:ring-[#5D7386]/20 resize-none"
                      placeholder="Tell me about your project or inquiry..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#303F4C] to-[#465969] hover:from-[#465969] hover:to-[#5D7386] text-[#B7CBD7] font-semibold py-5 text-base flex items-center justify-center gap-2 border border-[#5D7386]/30 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[#5D7386]/30 border-t-[#90AABA] rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} />
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="space-y-6"
              >
                <div className="glass-card rounded-xl p-6 lg:p-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-[#B7CBD7] mb-4">Connect With Me</h2>
                  <p className="text-[#758DA1] leading-relaxed mb-6 text-sm lg:text-base">
                    I&apos;m always open to discussing new opportunities, collaborations, or just having a conversation about data analytics and business strategy.
                  </p>

                  <div className="space-y-3">
                    <a
                      href="https://www.linkedin.com/in/aryan-bansal9/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-[#0A1016] rounded-lg border border-[#303F4C]/50 hover:border-[#5D7386] transition-all group"
                    >
                      <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#303F4C] to-[#465969] flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#90AABA]/10 transition-all">
                        <Linkedin size={22} className="text-[#90AABA]" />
                      </div>
                      <div>
                        <p className="text-[#B7CBD7] font-semibold">LinkedIn</p>
                        <p className="text-[#5D7386] text-sm">Connect professionally</p>
                      </div>
                    </a>

                    <a
                      href="https://github.com/Aaryan9958"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-[#0A1016] rounded-lg border border-[#303F4C]/50 hover:border-[#5D7386] transition-all group"
                    >
                      <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#303F4C] to-[#465969] flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#90AABA]/10 transition-all">
                        <Github size={22} className="text-[#90AABA]" />
                      </div>
                      <div>
                        <p className="text-[#B7CBD7] font-semibold">GitHub</p>
                        <p className="text-[#5D7386] text-sm">View my code</p>
                      </div>
                    </a>

                    <a
                      href="mailto:aryan.bansal@simon.rochester.edu"
                      className="flex items-center gap-4 p-4 bg-[#0A1016] rounded-lg border border-[#303F4C]/50 hover:border-[#5D7386] transition-all group"
                    >
                      <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#303F4C] to-[#465969] flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#90AABA]/10 transition-all">
                        <MailIcon size={22} className="text-[#90AABA]" />
                      </div>
                      <div>
                        <p className="text-[#B7CBD7] font-semibold">Email</p>
                        <p className="text-[#5D7386] text-sm">aryan.bansal@simon.rochester.edu</p>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-6 lg:p-8 relative overflow-hidden">
                  {/* Metallic top accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#465969] via-[#90AABA] to-[#465969]" />
                  
                  <h3 className="text-xl lg:text-2xl font-bold text-[#B7CBD7] mb-3">
                    Currently Seeking Opportunities
                  </h3>
                  <p className="text-[#758DA1] leading-relaxed text-sm lg:text-base">
                    I&apos;m actively looking for full-time Business Analyst and Data Analyst roles starting December 2025. If you&apos;re hiring or know someone who is, I&apos;d love to connect!
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="mt-20">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
