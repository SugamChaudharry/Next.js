'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from '@/components/ui/moving-border'
import { Navbar } from '@/components';
import axios from 'axios';
import toast from 'react-hot-toast';
interface FormData {
  name: string;
  email: string;
  message: string;
}

function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const onSubmit = async (e:any) => {
    e.preventDefault();
    console.log("form data", formData);
    try {
      
      await axios.post("/api/users/contact", formData);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      toast.success("Message sent successfully");
      
    } catch (error: any) {
      console.log("error", error.message);

      toast.error(error.message);

    }
    
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  return (
    <div className="mt-40 flex flex-col justify-center items-center">
      <div className="relative w-full flex items-center justify-center " >
          <Navbar />
      </div>
      <form className="space-y-6 w-96" onSubmit={onSubmit} >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-100">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
            aria-label="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-100">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
            aria-label="Your email"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-100">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
            aria-label="Your message"
          ></textarea>
        </div>
        <div className='flex justify-center '>
        <Button
            borderRadius="1rem"
            containerClassName="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-teal-500"
            borderClassName=" bg-[radial-gradient(var(--cyan-700)_40%,transparent_60%)] "
            type="submit"
            >
            Send Message
          </Button>
        </div>
      </form>
      <BackgroundBeams />
    </div>
  )
}

export default ContactPage;
