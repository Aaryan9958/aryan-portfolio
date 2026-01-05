import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Linkedin, Github, Mail as MailIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import PageTransition from '../components/PageTransition';
import Footer from '../components/Footer';

// Import JSON data
import contactData from '../content/contact.json';

// Icon mapping
const iconMap = {
  Linkedin,
  Github,
  Mail: MailIcon,
};

export default function Contact() {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { toast } = useToast();

  // Get data from JSON with defaults
  const pageTitle = contactData.pageTitle || "Let's Connect";
  const pageSubtitle = contactData.pageSubtitle || '';
  const formConfig = contactData.form || {};
  const connectSection = contactData.connectSection || {};
  const opportunityCard = contactData.opportunityCard || {};

  // Initialize form data based on fields
  useEffect(() => {
    const initialData = {};
    (formConfig.fields || []).forEach(field => {
      initialData[field.name] = '';
    });
    setFormData(initialData);
  }, []);

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
      const response = await fetch(formConfig.endpoint || 'https://formspree.io/f/mykgpqkv', {
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
          description: formConfig.successMessage || "Thank you for reaching out.",
        });
        // Reset form
        const resetData = {};
        (formConfig.fields || []).forEach(field => {
          resetData[field.name] = '';
        });
        setFormData(resetData);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
      toast({
        title: "Error sending message",
        description: formConfig.errorMessage || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen text-white relative overflow-x-hidden">
        <div 
          className="fixed inset-0 z-0"
          style={{
            background: 'linear-gradient(180deg, #0A1016 0%, #1C2731 50%, #0A1016 100%)',
          }}
        />
        
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#B7CBD7] mb-4">{pageTitle}</h1>
              <p className="text-lg md:text-xl text-[#758DA1]">{pageSubtitle}</p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="glass-card rounded-xl p-6 lg:p-8"
              >
                <h2 className="text-2xl lg:text-3xl font-bold text-[#B7CBD7] mb-6">{formConfig.title || 'Send a Message'}</h2>
                
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-lg bg-[#303F4C]/50 border border-[#5D7386]/50 flex items-center gap-3"
                  >
                    <CheckCircle className="text-[#90AABA]" size={20} />
                    <span className="text-[#90AABA] text-sm">{formConfig.successMessage}</span>
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-lg bg-[#303F4C]/50 border border-red-500/30 flex items-center gap-3"
                  >
                    <AlertCircle className="text-red-400" size={20} />
                    <span className="text-red-300 text-sm">{formConfig.errorMessage}</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {(formConfig.fields || []).map((field, index) => (
                    <div key={field.name}>
                      <label htmlFor={field.name} className="block text-sm font-medium text-[#90AABA] mb-2">
                        {field.label} {field.required && '*'}
                      </label>
                      {field.type === 'textarea' ? (
                        <Textarea
                          id={field.name}
                          name={field.name}
                          required={field.required}
                          value={formData[field.name] || ''}
                          onChange={handleChange}
                          rows={field.rows || 5}
                          className="bg-[#0A1016] border-[#303F4C] text-[#B7CBD7] placeholder:text-[#465969] focus:border-[#5D7386] focus:ring-[#5D7386]/20 resize-none"
                          placeholder={field.placeholder}
                        />
                      ) : (
                        <Input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          required={field.required}
                          value={formData[field.name] || ''}
                          onChange={handleChange}
                          className="bg-[#0A1016] border-[#303F4C] text-[#B7CBD7] placeholder:text-[#465969] focus:border-[#5D7386] focus:ring-[#5D7386]/20"
                          placeholder={field.placeholder}
                        />
                      )}
                    </div>
                  ))}

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
                        {formConfig.submitButton || 'Send Message'}
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
                  <h2 className="text-2xl lg:text-3xl font-bold text-[#B7CBD7] mb-4">{connectSection.title || 'Connect With Me'}</h2>
                  <p className="text-[#758DA1] leading-relaxed mb-6 text-sm lg:text-base">
                    {connectSection.description}
                  </p>

                  <div className="space-y-3">
                    {(connectSection.socialLinks || []).map((link, index) => {
                      const Icon = iconMap[link.icon] || MailIcon;
                      return (
                        <a
                          key={index}
                          href={link.url}
                          target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 p-4 bg-[#0A1016] rounded-lg border border-[#303F4C]/50 hover:border-[#5D7386] transition-all group"
                        >
                          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#303F4C] to-[#465969] flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#90AABA]/10 transition-all">
                            <Icon size={22} className="text-[#90AABA]" />
                          </div>
                          <div>
                            <p className="text-[#B7CBD7] font-semibold">{link.platform}</p>
                            <p className="text-[#5D7386] text-sm">{link.subtitle}</p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {opportunityCard.title && (
                  <div className="glass-card rounded-xl p-6 lg:p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#465969] via-[#90AABA] to-[#465969]" />
                    
                    <h3 className="text-xl lg:text-2xl font-bold text-[#B7CBD7] mb-3">
                      {opportunityCard.title}
                    </h3>
                    <p className="text-[#758DA1] leading-relaxed text-sm lg:text-base">
                      {opportunityCard.description}
                    </p>
                  </div>
                )}
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
