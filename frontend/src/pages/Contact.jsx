import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Linkedin, Github, Mail as MailIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import PageTransition from '../components/PageTransition';
import SectionWrapper from '../components/SectionWrapper';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mykgpqkv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
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
      <div className="page-container bg-[#05060A] text-white">
        <SectionWrapper className="relative pt-32 pb-16 px-6 lg:px-12" isHero={true}>
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">Let's Connect</h1>
              <p className="text-xl text-[#9CA3AF]">
                Have a project in mind or just want to chat about data? Drop me a message.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="bg-[#0B0F1A]/80 backdrop-blur-md rounded-xl p-8 border border-[#3FB5B5]/20"
              >
                <h2 className="text-3xl font-bold text-white mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#F5F5F7] mb-2">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-[#05060A] border-[#3FB5B5]/30 text-white placeholder:text-[#9CA3AF] focus:border-[#3FB5B5]"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#F5F5F7] mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-[#05060A] border-[#3FB5B5]/30 text-white placeholder:text-[#9CA3AF] focus:border-[#3FB5B5]"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-[#F5F5F7] mb-2">
                      Company (Optional)
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-[#05060A] border-[#3FB5B5]/30 text-white placeholder:text-[#9CA3AF] focus:border-[#3FB5B5]"
                      placeholder="Your company"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#F5F5F7] mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="bg-[#05060A] border-[#3FB5B5]/30 text-white placeholder:text-[#9CA3AF] focus:border-[#3FB5B5] resize-none"
                      placeholder="Tell me about your project or inquiry..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#3FB5B5] hover:bg-[#3FB5B5]/90 text-[#05060A] font-semibold py-6 text-lg flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send size={20} />
                  </Button>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="space-y-8"
              >
                <div className="bg-[#0B0F1A]/80 backdrop-blur-md rounded-xl p-8 border border-[#3FB5B5]/20">
                  <h2 className="text-3xl font-bold text-white mb-6">Connect With Me</h2>
                  <p className="text-[#F5F5F7] leading-relaxed mb-8">
                    I'm always open to discussing new opportunities, collaborations, or just having a conversation about data analytics and business strategy.
                  </p>

                  <div className="space-y-4">
                    <a
                      href="https://www.linkedin.com/in/aryan-bansal9/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-[#05060A] rounded-lg border border-[#3FB5B5]/30 hover:border-[#3FB5B5]/60 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#3FB5B5] to-[#4B6AFF] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Linkedin size={24} className="text-[#05060A]" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">LinkedIn</p>
                        <p className="text-[#9CA3AF] text-sm">Connect professionally</p>
                      </div>
                    </a>

                    <a
                      href="https://github.com/Aaryan9958"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-[#05060A] rounded-lg border border-[#3FB5B5]/30 hover:border-[#3FB5B5]/60 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#3FB5B5] to-[#4B6AFF] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Github size={24} className="text-[#05060A]" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">GitHub</p>
                        <p className="text-[#9CA3AF] text-sm">View my code</p>
                      </div>
                    </a>

                    <a
                      href="mailto:aryan.bansal@simon.rochester.edu"
                      className="flex items-center gap-4 p-4 bg-[#05060A] rounded-lg border border-[#3FB5B5]/30 hover:border-[#3FB5B5]/60 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#3FB5B5] to-[#4B6AFF] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <MailIcon size={24} className="text-[#05060A]" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">Email</p>
                        <p className="text-[#9CA3AF] text-sm">aryan.bansal@simon.rochester.edu</p>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#3FB5B5]/20 to-[#4B6AFF]/20 rounded-xl p-8 border border-[#3FB5B5]/40">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Currently Seeking Opportunities
                  </h3>
                  <p className="text-[#F5F5F7] leading-relaxed">
                    I'm actively looking for full-time Business Analyst and Data Analyst roles starting December 2025. If you're hiring or know someone who is, I'd love to connect!
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </PageTransition>
  );
}
