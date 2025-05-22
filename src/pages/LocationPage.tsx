import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Location = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-aparecida-blue py-16 text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-serif text-center mb-6 text-aparecida-gold">
            Localização e Contato
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-center text-secondary-500">
            Saiba como chegar à nossa paróquia e entre em contato conosco.
          </p>
        </div>
      </section>

      {/* Map and Contact Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map */}
            <div className="h-[400px] lg:h-[500px] bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.3668086639445!2d-34.85277382423239!3d-7.198923170668463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7acc1f7b0d529a1%3A0x2e2038ee4afc9953!2sPar%C3%B3quia%20de%20Nossa%20Senhora%20da%20Concei%C3%A7%C3%A3o%20Aparecida!5e0!3m2!1spt-BR!2sbr!4v1747838668092!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Paróquia"
              ></iframe>
            </div>

            {/* Contact Information */}
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-serif mb-8 text-aparecida-blue gold-accent pb-2">
                Entre em Contato
              </h2>

              <div className="space-y-6">
                <ContactItem
                  icon={<MapPin className="h-6 w-6 text-aparecida-gold" />}
                  title="Endereço"
                  content={
                    <>
                      R. Mariangela Lucena Peixoto, 49 - Conj. Valentina
                      Figueredo I
                      <br />
                      João Pessoa - PB, 58063-300
                    </>
                  }
                />

                <ContactItem
                  icon={<Phone className="h-6 w-6 text-aparecida-gold" />}
                  title="Telefone"
                  content={<>(83) 3237-8521</>}
                />

                <ContactItem
                  icon={<Mail className="h-6 w-6 text-aparecida-gold" />}
                  title="E-mail"
                  content={<>paroquianscaparecida.val@gmail.com</>}
                />

                <ContactItem
                  icon={<Clock className="h-6 w-6 text-aparecida-gold" />}
                  title="Horário de Funcionamento da Secretaria"
                  content={
                    <>
                      Segunda a Sexta: 14h30 às 20h00
                      <br />
                      Sábado: 8h00 às 12h00
                    </>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ContactItem = ({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}) => {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 flex-shrink-0">{icon}</div>
      <div>
        <h3 className="text-lg font-medium text-aparecida-blue mb-1">
          {title}
        </h3>
        <div className="text-gray-600">{content}</div>
      </div>
    </div>
  );
};

export default Location;
