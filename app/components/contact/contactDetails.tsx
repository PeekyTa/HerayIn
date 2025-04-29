import React from 'react';
import { Phone, Mail, Map, Facebook, Instagram, Twitter } from 'lucide-react';


const ContactDetails = () => {
  const contactItems: ContactItem[] = [
    {
      id: 'phone',
      icon: (
        <Phone className="w-8 h-8 bg-primary" />
      ),
      title: 'Téléphone',
      content: '+216 55 555 555',
    },
    {
      id: 'email',
      icon: (
        <Mail className="w-8 h-8 mt-1 bg-primary" />
      ),
      title: 'Email',
      content: 'contact@herafyin.com',
    },
    {
      id: 'address',
      icon: <Map className="w-8 h-8 text-primary" />,
      title: 'Adresse',
      content: '44 Av Mohamed V, Nabeul',
    },
  ];

  const socialIcons = [
    { id: 'facebook', icon: <Facebook className="w-9 h-8 bg-primary" /> },
    { id: 'instagram', icon: <Instagram className="w-9 h-8 bg-primary" /> },
    { id: 'twitter', icon: <Twitter className="w-8 h-8 bg-primary" /> },
  ];

  return (
    <div className="w-full flex flex-col items-end gap-4">
      {contactItems.map((item) => (
        <ContactCard key={item.id}>
          <div className="w-full flex flex-col items-center justify-center">
            <div className="flex items-center gap-2">
              {item.icon}
              <h3 className="text-2xl font-medium text-primary text-center">
                {item.title}
              </h3>
            </div>
            <p className="text-md text-primary text-center w-full">
              {item.content}
            </p>
          </div>
        </ContactCard>
      ))}

      <ContactCard className="shadow-md">
        <div className="w-full flex flex-col items-center gap-3">
          <h3 className="text-2xl font-medium text-primary text-center">
            Réseaux sociaux
          </h3>
          <div className="flex gap-4 ">
            {socialIcons.map((social) => (
              <div key={social.id}>{social.icon}</div>
            ))}
          </div>
        </div>
      </ContactCard>
    </div>
  );
};

interface ContactCardProps {
  children: React.ReactNode;
  className?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div
      className={`
        w-full h-25 p-2.5 
        bg-white rounded-xl 
        shadow-sm border border-outline 
        flex flex-col justify-center items-center
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default ContactDetails;

interface ContactItem {
    id: string;
    icon: React.ReactNode;
    title: string;
    content: string;
  }