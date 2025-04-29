"use client";

import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative bg-white rounded-xl border border-opacity-35 
                        border-primary p-4 h-[75px]">
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full h-full pt-4 outline-none text-primary bg-transparent peer"
            placeholder=" "
          />
          <label className="absolute left-4 top-4 text-primary text-lg font-normal font-outfit 
                          transition-all duration-200 peer-placeholder-shown:text-xl 
                          peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-sm">
            Nom complet
          </label>
        </div>
        <div className="relative bg-white rounded-xl border border-opacity-35 
        border-primary p-4 h-[75px]">
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-full pt-4 outline-none text-primary bg-transparent peer"
            placeholder=" "
          />
          <label className="absolute left-4 top-4 text-primary text-lg font-normal font-outfit 
                          transition-all duration-200 peer-placeholder-shown:text-xl 
                          peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-sm">
            Email
          </label>
        </div>
        <div className="relative md:col-span-2 bg-white rounded-xl border border-opacity-35 
                        border-primary p-4 h-[75px]">
          <input
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            className="w-full h-full pt-4 outline-none text-primary bg-transparent peer"
            placeholder=" "
          />
          <label className="absolute left-4 top-4 text-primary text-lg font-normal font-outfit 
                          transition-all duration-200 peer-placeholder-shown:text-xl 
                          peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-sm">
            Sujet
          </label>
        </div>
        <div className="relative md:col-span-2 bg-white rounded-xl border border-opacity-35 
                        border-primary p-4 min-h-[200px]">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full h-40 pt-6 outline-none text-primary bg-transparent resize-none peer"
            placeholder=" "
          />
          <label className="absolute left-4 top-5 text-primary text-lg font-normal font-outfit 
                          transition-all duration-200 peer-placeholder-shown:text-xl 
                          peer-placeholder-shown:top-5 peer-focus:top-2 peer-focus:text-sm">
            Message
          </label>
        </div>
      </div>

      <div className="w-full flex justify-end mt-4">
        <button 
          type="submit" 
          className="w-[152px] h-[50px] bg-[#FE5733] rounded-xl flex items-center justify-center gap-2 
                    hover:bg-[#E04D2D] transition-colors"
        >
          <span className="text-white text-xl font-outfit capitalize">
            envoyer
          </span>
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>
    </form>
  );
};

export default ContactForm;