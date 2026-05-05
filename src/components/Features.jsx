import React from 'react';
import { ChefHat, ShieldCheck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    { 
      icon: ChefHat, 
      title: 'Cita Rasa Otentik', 
      desc: 'Resep turun-temurun dengan bumbu rempah pilihan yang meresap sempurna.',
      color: 'bg-orange-100 text-orange-600'
    },
    { 
      icon: ShieldCheck, 
      title: 'Higienis & Halal', 
      desc: 'Proses memasak yang bersih dan terjaga kualitas kehalalannya 100%.',
      color: 'bg-emerald-100 text-emerald-600'
    },
    { 
      icon: Clock, 
      title: 'Tepat Waktu', 
      desc: 'Komitmen pengiriman tepat waktu untuk menjaga kelancaran acara Anda.',
      color: 'bg-blue-100 text-blue-600'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-[#1C1A17] mb-4">Mengapa Memilih Kami?</h2>
        <div className="w-24 h-1.5 bg-orange-500 mx-auto rounded-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="p-8 bg-white rounded-[2.5rem] shadow-sm border border-orange-50 hover:shadow-xl transition-all"
          >
            <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
              <feature.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold mb-3">{feature.title}</h3>
            <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
