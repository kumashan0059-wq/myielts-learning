import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Facebook,
  Send,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Calendar,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { usePageSeo } from '../router/RouterContext';
import {
  BRAND_PHONE,
  BRAND_PHONE_CLEAN,
  BRAND_EMAIL,
  BRAND_LOCATION,
  BRAND_FACEBOOK_URL,
  FACEBOOK_FOLLOWERS,
} from '../data/content';
import { fetchJson } from '../utils/apiClient';

export const ContactPage: React.FC = () => {
  usePageSeo({
    title: 'Contact MY IELTS — Consultation & Campus Inquiries | Mirpur, Dhaka',
    description:
      'Contact MY IELTS in Mirpur, Dhaka by phone (01754 544 508), WhatsApp, email (info@myielts.org), or submit an online inquiry for IELTS batches, Spoken English, Study Abroad, and Visa guidance.',
  });

  const [inquiryType, setInquiryType] = useState<'consultation' | 'batch' | 'contact'>('consultation');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'IELTS Academic Preparation',
    destination: 'Canada',
    timing: 'Evening (6:30 PM - 8:30 PM)',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<{ id: string; createdAt: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const data = await fetchJson<{ id: string; createdAt: string }>('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryType,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          destination: formData.destination,
          timing: formData.timing,
          message: formData.message,
        }),
      });
      setSubmittedReceipt({ id: data.id, createdAt: data.createdAt });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Network error. Please call our hotline directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Dark Compact Header */}
      <section className="bg-[#0D0D11] text-white py-14 sm:py-16 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E11D2A]">
              <MessageCircle className="w-4 h-4" />
              <span>Admissions &amp; Student Support Desk</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight">
              Get in Touch With <span className="text-[#E11D2A]">MY IELTS</span>
            </h1>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              Reach our academic counselors in Mirpur, Dhaka for batch enrollment, diagnostic test scheduling, university shortlisting, or student visa documentation reviews.
            </p>
          </div>
        </div>
      </section>

      {/* Main 2-Column Contact Layout */}
      <section className="py-16 sm:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Channels & Mirpur Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200 shadow-xs space-y-5">
              <h2 className="text-xl font-black font-display text-[#0D0D11]">
                Direct Contact Channels
              </h2>

              <div className="space-y-4">
                <a
                  href={`tel:${BRAND_PHONE_CLEAN}`}
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-neutral-50 hover:bg-red-50/50 border border-neutral-200 hover:border-red-200 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E11D2A] text-white flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 block">
                      Hotline &amp; Admissions
                    </span>
                    <span className="text-base font-black text-[#0D0D11] group-hover:text-[#E11D2A] transition-colors">
                      {BRAND_PHONE}
                    </span>
                  </div>
                </a>

                <a
                  href="https://wa.me/8801754544508?text=Hello%20MY%20IELTS,%20I%20would%20like%20to%20book%20a%20consultation."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-neutral-50 hover:bg-emerald-50/60 border border-neutral-200 hover:border-emerald-300 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 block">
                      WhatsApp Direct Chat
                    </span>
                    <span className="text-sm font-bold text-[#0D0D11] group-hover:text-emerald-700">
                      +880 1754-544508 (Instant Message)
                    </span>
                  </div>
                </a>

                <a
                  href={`mailto:${BRAND_EMAIL}`}
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-neutral-50 hover:bg-red-50/50 border border-neutral-200 hover:border-red-200 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#0D0D11] text-white flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#E11D2A]" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 block">
                      Official Email
                    </span>
                    <span className="text-sm font-bold text-[#0D0D11]">{BRAND_EMAIL}</span>
                  </div>
                </a>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E11D2A] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 block">
                      Office &amp; Counseling Hours
                    </span>
                    <p className="text-xs font-semibold text-[#0D0D11] leading-relaxed mt-0.5">
                      Saturday – Thursday: 9:00 AM – 8:30 PM<br />
                      Friday: 2:30 PM – 8:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-600">Social Community</span>
                <a
                  href={BRAND_FACEBOOK_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0D0D11] hover:bg-[#E11D2A] text-white text-xs font-bold transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5 fill-current" />
                  <span>{FACEBOOK_FOLLOWERS} Facebook</span>
                </a>
              </div>
            </div>

            {/* Mirpur, Dhaka Location Card + Map Embed */}
            <div className="bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-xs">
              <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-5 h-5 text-[#E11D2A]" />
                  <div>
                    <h3 className="text-sm font-bold text-[#0D0D11]">Mirpur Executive Campus</h3>
                    <p className="text-xs text-neutral-500">{BRAND_LOCATION}</p>
                  </div>
                </div>
                <a
                  href="https://www.openstreetmap.org/?mlat=23.8041&mlon=90.3667#map=14/23.8041/90.3667"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#E11D2A] hover:underline"
                >
                  <span>Open Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="h-56 w-full bg-neutral-100">
                <iframe
                  title="Mirpur, Dhaka Campus Area Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=90.3400%2C23.7880%2C90.3920%2C23.8220&layer=mapnik&marker=23.8041%2C90.3667"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Real Persisted Inquiry & Consultation Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-100 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E11D2A]">
                    Online Request Desk
                  </span>
                  <h2 className="text-2xl font-black font-display text-[#0D0D11] mt-0.5">
                    Send an Inquiry or Book Consultation
                  </h2>
                </div>
                <Calendar className="w-6 h-6 text-[#E11D2A] shrink-0 hidden sm:block" />
              </div>

              {submittedReceipt ? (
                <div className="py-10 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-red-50 text-[#E11D2A] border border-red-200 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="text-2xl font-black font-display text-[#0D0D11]">
                      Inquiry Submitted Successfully
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      Thank you, <strong className="text-[#0D0D11]">{formData.name}</strong>. Our advisor will reach out at{' '}
                      <strong className="text-[#E11D2A]">{formData.phone}</strong> during office hours.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-left max-w-md mx-auto space-y-1.5">
                    <p><strong>Reference ID:</strong> {submittedReceipt.id.slice(0, 8).toUpperCase()}</p>
                    <p><strong>Program / Topic:</strong> {formData.service}</p>
                    <p><strong>Target Country:</strong> {formData.destination}</p>
                    <p><strong>Preferred Slot:</strong> {formData.timing}</p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedReceipt(null);
                        setFormData((prev) => ({ ...prev, message: '' }));
                      }}
                      className="px-6 py-3 rounded-xl bg-[#0D0D11] text-white text-xs font-bold cursor-pointer hover:bg-neutral-800"
                    >
                      Submit Another Inquiry
                    </button>
                    <a
                      href={`https://wa.me/8801754544508?text=${encodeURIComponent(
                        `Hi MY IELTS, I submitted an inquiry (${submittedReceipt.id.slice(0, 8)}) for ${formData.service}.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Continue on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Inquiry Purpose Switcher */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-2">
                      Inquiry Type
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'consultation', label: 'Free Consultation' },
                        { id: 'batch', label: 'Batch Admission' },
                        { id: 'contact', label: 'General Question' },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setInquiryType(tab.id as 'consultation' | 'batch' | 'contact')}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                            inquiryType === tab.id
                              ? 'bg-[#0D0D11] text-white border-[#E11D2A]'
                              : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Tanvir Ahmed"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-[#E11D2A] focus:ring-2 focus:ring-red-100 text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g., 01754 000 000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-[#E11D2A] focus:ring-2 focus:ring-red-100 text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-[#E11D2A] focus:ring-2 focus:ring-red-100 text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                        Service / Program
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-[#E11D2A] text-sm bg-white outline-none"
                      >
                        <option value="IELTS Academic Preparation">IELTS Academic</option>
                        <option value="IELTS General Training">IELTS General Training</option>
                        <option value="IELTS Mock Tests">IELTS Mock Tests</option>
                        <option value="Spoken English & Fluency">Spoken English</option>
                        <option value="Study Abroad Consultation">Study Abroad</option>
                        <option value="Student Visa Services">Visa Services</option>
                        <option value="Work Permit Guidance">Work Permit</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                        Target Country
                      </label>
                      <select
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-[#E11D2A] text-sm bg-white outline-none"
                      >
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="USA">USA</option>
                        <option value="Germany & Europe">Germany &amp; Europe</option>
                        <option value="Other / Undecided">Other / Undecided</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                      Preferred Callback / Batch Timing
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {[
                        'Morning (10 AM - 12 PM)',
                        'Afternoon (3 PM - 5 PM)',
                        'Evening (6:30 PM - 8:30 PM)',
                        'Weekend (Fri & Sat)',
                      ].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData({ ...formData, timing: slot })}
                          className={`p-2.5 rounded-xl border text-left cursor-pointer transition-colors ${
                            formData.timing === slot
                              ? 'border-[#E11D2A] bg-red-50 text-[#E11D2A] font-bold'
                              : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                      Your Academic Background or Question
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share your target band score, current education level, preferred intake, or any specific question..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-[#E11D2A] focus:ring-2 focus:ring-red-100 text-sm outline-none resize-y"
                    />
                  </div>

                  {errorMsg && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 px-6 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white font-bold text-sm shadow-lg shadow-red-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
