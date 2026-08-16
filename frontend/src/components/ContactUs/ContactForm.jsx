import React from 'react'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { submitContactForm } from '../../actions/contactActions';
import { CONTACT_RESET, CLEAR_ERRORS, CLEAR_MESSAGE } from '../../constants/contactConstants';

const COUNTRY_OPTIONS = [
  { code: "+91", flag: "🇮🇳", label: "IN" },
  { code: "+1",  flag: "🇺🇸", label: "US" },
  { code: "+44", flag: "🇬🇧", label: "UK" },
  { code: "+86", flag: "🇨🇳", label: "CN" },
];

const MAX_LENGTHS = {
  "+91": 10,
  "+1":  10,
  "+44": 10,
  "+86": 11,
};

const EMPTY_FORM = {
  name: "",
  email: "",
  number: "",
  message: "",
  countryCode: "+91",
};

const ContactForm = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contactForm);

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [banner, setBanner] = useState(null); // { type: 'success'|'error', msg: string }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "number") {
      let cleaned = value.replace(/\D/g, "");
      const maxDigits = MAX_LENGTHS[formData.countryCode] || 15;
      if (cleaned.length > maxDigits) cleaned = cleaned.substring(0, maxDigits);
      setFormData((prev) => ({ ...prev, number: cleaned }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountrySelect = (code) => {
    setFormData((prev) => ({ ...prev, countryCode: code, number: "" }));
    setDropdownOpen(false);
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Full name is required.";
    if (!formData.email.trim()) errors.email = "Email is required.";
    const maxDigits = MAX_LENGTHS[formData.countryCode] || 15;
    if (!formData.number || formData.number.length < maxDigits)
      errors.number = `Enter a valid ${maxDigits}-digit number.`;
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setBanner(null);

    const finalData = {
      name: formData.name,
      email: formData.email,
      number: `${formData.countryCode} ${formData.number}`,
      message: formData.message,
    };
    dispatch(submitContactForm(finalData));
  };

  useEffect(() => {
    if (error) {
      setBanner({ type: "error", msg: error });
      dispatch({ type: CLEAR_ERRORS });
    }
  }, [error]);

  const selectedCountry = COUNTRY_OPTIONS.find((c) => c.code === formData.countryCode) || COUNTRY_OPTIONS[0];

  const inputBase = {
    backgroundColor: '#f7f3ee',
    border: '1px solid #d5c9bc',
    color: '#0d0b08',
  };

  const inputProps = (name) => ({
    onFocus: (e) => (e.target.style.borderColor = '#B8935A'),
    onBlur:  (e) => (e.target.style.borderColor = fieldErrors[name] ? '#c0392b' : '#d5c9bc'),
    style: {
      ...inputBase,
      borderColor: fieldErrors[name] ? '#c0392b' : '#d5c9bc',
    },
  });

  return (
     <section className="flex justify-center px-6 pb-16">
        <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6 items-stretch">

          {/* Left – Dark Promo Card */}
          <div
            className="md:w-[60%] rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden min-h-[390px]"
            style={{ backgroundColor: '#2c2420' }}
          >
            <div className="absolute top-0 left-8 w-16 h-[3px] rounded-full" style={{ backgroundColor: '#B8935A' }} />

            <svg
              className="absolute bottom-10 right-[-20px] opacity-10 pointer-events-none"
              width="260" height="260" viewBox="0 0 260 260"
              fill="none" xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="200" cy="200" r="130" stroke="#B8935A" strokeWidth="1" fill="none" />
              <line x1="80" y1="240" x2="230" y2="60" stroke="#B8935A" strokeWidth="1" />
              <circle cx="230" cy="58" r="4" fill="#B8935A" />
            </svg>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold leading-snug max-w-[230px]" style={{ color: '#f7f3ee' }}>
                We're here to capture your perfect moments
              </h2>
            </div>

            <div className="mt-10">
              <div className="mb-5" style={{ opacity: 0.35 }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" style={{ color: '#B8935A' }}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <p className="text-[0.95rem] font-semibold tracking-widest uppercase" style={{ color: '#f7f3ee' }}>
                Shriji Photo Studio
              </p>
              <p className="text-xs tracking-widest uppercase mt-0.5" style={{ color: '#B8935A99' }}>
                Est. since 1997
              </p>
            </div>
          </div>

          {/* Right – Contact Form Card */}
          <div
            className="md:w-[56%] rounded-2xl p-8 shadow-sm"
            style={{ backgroundColor: '#fff9f4', border: '1px solid #e8ddd4' }}
          >
            {success ? (
              /* ── Success Card ── */
              <div className="flex flex-col items-center justify-center h-full gap-4 py-12">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#2c2420' }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7"
                    style={{ color: '#B8935A' }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold" style={{ color: '#0d0b08' }}>
                  Thank you!
                </h3>
                <p className="text-sm text-center max-w-xs" style={{ color: '#2c2420aa' }}>
                  We've received your message and will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setFormData(EMPTY_FORM);
                    dispatch({ type: CONTACT_RESET });
                    dispatch({ type: CLEAR_MESSAGE });
                  }}
                  className="mt-2 text-sm underline transition-colors"
                  style={{ color: '#B8935A' }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                {/* Error Banner (only shown on error, not success) */}
                {banner && banner.type === 'error' && (
                  <div
                    className="flex items-start gap-3 rounded-xl px-4 py-3 mb-5 text-sm"
                    style={{
                      backgroundColor: '#fff0f0',
                      border: '1px solid #f5a5a5',
                      color: '#b91c1c',
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span className="flex-1">{banner.msg}</span>
                    <button onClick={() => setBanner(null)} className="ml-auto shrink-0 opacity-50 hover:opacity-100 transition-opacity">
                      ✕
                    </button>
                  </div>
                )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" style={{ color: '#2c2420' }}>
                  Full Name<span style={{ color: '#B8935A' }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Your Full Name"
                  className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors duration-200"
                  {...inputProps("name")}
                />
                {fieldErrors.name && (
                  <p className="text-xs mt-0.5" style={{ color: '#c0392b' }}>{fieldErrors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" style={{ color: '#2c2420' }}>
                  Email<span style={{ color: '#B8935A' }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors duration-200"
                  {...inputProps("email")}
                />
                {fieldErrors.email && (
                  <p className="text-xs mt-0.5" style={{ color: '#c0392b' }}>{fieldErrors.email}</p>
                )}
              </div>

              {/* Phone with Country Code Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" style={{ color: '#2c2420' }}>
                  Contact Number<span style={{ color: '#B8935A' }}>*</span>
                </label>
                <div
                  className="flex rounded-xl transition-colors duration-200 relative"
                  style={{
                    border: `1px solid ${fieldErrors.number ? '#c0392b' : '#d5c9bc'}`,
                    backgroundColor: '#f7f3ee',
                    overflow: 'visible',
                  }}
                >
                  {/* Country Code Dropdown Trigger */}
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="flex items-center gap-1 px-3 text-sm select-none whitespace-nowrap focus:outline-none"
                    style={{
                      borderRight: '1px solid #d5c9bc',
                      backgroundColor: '#ede8e0',
                      color: '#2c2420',
                      minWidth: '85px',
                      borderRadius: '0.75rem 0 0 0.75rem',
                    }}
                  >
                    <span>{selectedCountry.flag}</span>
                    <span className="ml-1">{selectedCountry.code}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-0.5" style={{ color: '#B8935A' }}
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div
                      className="absolute top-full left-0 mt-1 rounded-xl overflow-hidden shadow-lg z-50"
                      style={{ backgroundColor: '#fff9f4', border: '1px solid #d5c9bc', minWidth: '140px' }}
                    >
                      {COUNTRY_OPTIONS.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => handleCountrySelect(c.code)}
                          className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-left transition-colors duration-150"
                          style={{
                            color: '#0d0b08',
                            backgroundColor: formData.countryCode === c.code ? '#f0e8de' : 'transparent',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0e8de')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = formData.countryCode === c.code ? '#f0e8de' : 'transparent')}
                        >
                          <span>{c.flag}</span>
                          <span style={{ color: '#B8935A', fontWeight: 600 }}>{c.code}</span>
                          <span style={{ color: '#2c2420aa' }}>{c.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  <input
                    type="tel"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    placeholder={`Enter ${MAX_LENGTHS[formData.countryCode] || 10}-digit number`}
                    className="flex-1 px-4 py-3 text-sm focus:outline-none"
                    style={{ backgroundColor: 'transparent', color: '#0d0b08', borderRadius: '0 0.75rem 0.75rem 0' }}
                  />
                </div>
                {fieldErrors.number && (
                  <p className="text-xs mt-0.5" style={{ color: '#c0392b' }}>{fieldErrors.number}</p>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" style={{ color: '#2c2420' }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Enter Your Message"
                  className="w-full rounded-xl px-4 py-3 text-sm resize-none focus:outline-none transition-colors duration-200"
                  style={inputBase}
                  onFocus={(e) => (e.target.style.borderColor = '#B8935A')}
                  onBlur={(e) => (e.target.style.borderColor = '#d5c9bc')}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full text-[0.9rem] font-semibold tracking-wide rounded-xl py-3.5 mt-1 transition-all duration-200 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: loading ? '#a08060' : '#2c2420',
                  color: '#f7f3ee',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.backgroundColor = '#B8935A'; e.currentTarget.style.color = '#0d0b08'; } }}
                onMouseLeave={(e) => { if (!loading) { e.currentTarget.style.backgroundColor = '#2c2420'; e.currentTarget.style.color = '#f7f3ee'; } }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Sending...
                  </>
                ) : "Submit"}
              </button>
            </form>
              </>
            )}
          </div>
        </div>
      </section>

  )
}

export default ContactForm